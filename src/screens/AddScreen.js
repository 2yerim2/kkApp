import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../api/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';

export default function AddScreen() {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (initializing) setInitializing(false);
        });
        return unsubscribe;
    }, []);

    const pickImage = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('권한 필요', '사진에 접근하려면 갤러리 접근 권한이 필요합니다.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const uploadImageToStorage = async (uri) => {
        if (!uri) return null;

        const response = await fetch(uri);
        const blob = await response.blob();

        const filename = `posts/${user.uid}_${Date.now()}.jpg`;
        const storageRef = ref(storage, filename);

        await uploadBytes(storageRef, blob);

        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    };

    const Upload = async () => {
        if (!title.trim()) {
            Alert.alert('알림', '제목을 입력해주세요.');
            return;
        }
        if (!content.trim()) {
            Alert.alert('알림', '내용을 입력해주세요.');
            return;
        }

        setLoading(true);

        try {
            let imageUrl = null;
            if (imageUri) {
                imageUrl = await uploadImageToStorage(imageUri);
            }

            await addDoc(collection(db, 'posts'), {
                title: title,
                content: content,
                imageUrl: imageUrl,
                authorUid: user.uid,
                authorEmail: user.email,
                createdAt: serverTimestamp(),
            });

            Alert.alert('성공', '게시글이 등록되었습니다.');
            setTitle('');
            setContent('');
            setImageUri(null);
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('오류', '게시글 등록에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    if (initializing) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.center}>
                <Text style={styles.warningText}>로그인이 필요합니다.</Text>
                <Button title="로그인" onPress={() => navigation.navigate('Login')} />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.Title}>게시물 제목</Text>
            <TextInput
                style={styles.titleInput}
                placeholder="제목을 입력하세요."
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.Title}>게시물 내용</Text>
            <TextInput
                style={styles.contentInput}
                placeholder="내용을 입력하세요."
                value={content}
                onChangeText={setContent}
                multiline
            />

            <Text style={styles.Title}>사진 첨부</Text>
            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <Text style={styles.imagePickerText}>사진 선택</Text>
            </TouchableOpacity>

            {imageUri && (
                <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                    <TouchableOpacity 
                        style={styles.removeImageButton} 
                        onPress={() => setImageUri(null)}
                    >
                        <Text style={styles.removeImageText}>✕ 삭제</Text>
                    </TouchableOpacity>
                </View>
            )}

            {loading ? (
                <View style={styles.submitButton}>
                    <ActivityIndicator size="small" color="white" />
                </View>
            ) : (
                <TouchableOpacity style={styles.submitButton} onPress={Upload}>
                    <Text style={styles.submitButtonText}>게시물 등록</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingTop: 60,
        paddingBottom: 300,
        backgroundColor: '#fff'
    },

    center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
    },
    warningText: {
            marginBottom: 15,
            fontSize: 16,
            fontWeight: 'bold'
    },
    Title: {
            fontSize: 17,
            marginBottom: 10,
            fontWeight: '500'
    },
    titleInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        fontSize: 15,
        marginBottom: 10,
    },
    contentInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        fontSize: 15,
        minHeight: 120,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    imagePickerButton: {
        borderWidth: 1,
        borderColor: '#888',
        border: 'solid',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    imagePickerText: {
        color: '#555',
        fontWeight: '600',
    },
    imagePreviewContainer: {
        marginTop: 15,
        alignItems: 'center',
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    removeImageText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    submitButton: {
        height: 50,
        backgroundColor: 'black',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});