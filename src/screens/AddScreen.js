import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator, Text, ScrollView } from 'react-native';
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

    const [type, setType] = useState(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [imageUri, setImageUri] = useState([]);
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
            allowsMultipleSelection: true,
            selectionLimit: 5,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            const selectedUri = result.assets.map((asset) => asset.uri);
            setImageUri((prev) => [...prev, ...selectedUri].slice(0,5));
        }
    };

    const removeImage = (indexToRemove) => {
        setImageUri((prev) => prev.filter((_, index) => index !== indexToRemove));
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
        if (!type) {
        Alert.alert('알림', '대여 또는 판매 카테고리를 선택해주세요.');
        return;
        }

        if (!title.trim()) {
            Alert.alert('알림', '제목을 입력해주세요.');
            return;
        }
        if (!price.trim()) {
            Alert.alert('알림', '가격을 입력해주세요.');
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
                type: type,
                title: title,
                price: Number(price.replace(/,/g,'')),
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.Title}>카테고리</Text>
                <View style={styles.typeContainer}>
                    <TouchableOpacity
                        style={[styles.typeButton, type === 'RENT' && styles. typeButtonSelected]}
                        onPress={() => setType('RENT')}
                    >
                        <Text style={[styles.typeText, type === 'RENT' && styles.typeTextSelected]}>대여</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.typeButton, type === 'SELL' && styles. typeButtonSelected]}
                        onPress={() => setType('SELL')}
                    >
                        <Text style={[styles.typeText, type === 'SELL' && styles.typeTextSelected]}>판매</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.Title}>게시물 제목</Text>
                <TextInput
                    style={styles.titleInput}
                    placeholder="제목을 입력하세요."
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.Title}>가격</Text>
                <View style={styles.priceInputContainer}>
                    <Text style={styles.wonsymbol}>{'\u20A9'}</Text>
                    <TextInput
                        style={styles.priceInput}
                        placeholder="가격을 입력하세요."
                        value={price}
                        onChangeText={(text) => {
                            const onlyNums = text.replace(/[^0-9]/g, '');
                            if (!onlyNums) {setPrice('');}
                            else {setPrice(Number(onlyNums).toLocaleString('ko-KR'));}
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <Text style={styles.Title}>게시물 내용</Text>
                <TextInput
                    style={styles.contentInput}
                    placeholder="내용을 입력하세요."
                    value={content}
                    onChangeText={setContent}
                    multiline
                />

                <Text style={styles.Title}>사진 첨부 (최대 5장)</Text>
                <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                    <Text style={styles.imagePickerText}>사진 선택</Text>
                </TouchableOpacity>

                {imageUri.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageListContainer}>
                        {imageUri.map((uri, index) => (
                            <View key={index} style={styles.imagePreviewWrapper}>
                                <Image source={{ uri }} style={styles.previewImage} />
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={() => removeImage(index)}
                                >
                                    <Text style={styles.removeImageText}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
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
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingTop: 30,
        paddingBottom: 100,
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
        marginTop: 20,
        fontSize: 17,
        marginBottom: 10,
        fontWeight: '500'
    },

    typeContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },

    typeButton: {
        flex: 1,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#f9f9f9'
    },

    typeButtonSelected: {
        backgroundColor: '#000',
        borderColor: '#000'
    },

    typeText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#666'
    },

    typeTextSelected: {
        color: '#fff'
    },

    titleInput: {
        marginTop: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        fontSize: 15,
        marginBottom: 10,
    },

    contentInput: {
        marginTop: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        fontSize: 15,
        minHeight: 120,
        marginBottom: 10,
        textAlignVertical: 'top',
    },

    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff'
    },

    wonsymbol: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginRight: 6
    },

    priceInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: '#000'
    },

    imagePickerButton: {
        marginTop: 3,
        marginBottom: 10,
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

    imageListContainer: {
        marginTop: 12,
        flexDirection: 'row'
    },

    imagePreviewWrapper: {
        position: 'relative',
        marginRight: 10
    },

    previewImage: {
        width: 90,
        height: 90,
        borderRadius: 8,
    },

    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
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