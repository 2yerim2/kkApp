import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Linking, Alert, Platform, message } from 'react-native';

function DetailScreen({ route }) {
    const { item } = route.params;

    const sendMessage = () => {
        if(!item.phonenum) {
            alert('작성자의 전화번호가 등록되어있지 않습니다.');
            return;
        }

        const defaultMessage = `안녕하세요! ${item.title} 게시물 보고 연락드렸습니다. 거래 가능한가요?`;

        const separator = Platform.OS === 'ios' ? '&' : '?';
        const url = `sms:${item.phonenum}${separator}body=${encodeURIComponent(defaultMessage)}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    Alert.alert('오류', '문자 앱을 열 수 없습니다.');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('문자 열기 에러:', err));
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {item.imageUrl ? (
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                ) : (
                    <View style={styles.noImage}>
                        <Text style={styles.noImageText}>이미지가 없습니다.</Text>
                    </View>
                )}

                <View style={styles.contentContainer}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.type === 'RENT' ? '대여' : '판매'}</Text>
                    </View>

                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price?.toLocaleString()}원</Text>

                    <View style={styles.divider} />

                    <Text style={styles.subInfo}>학교: {item.school || '정보 없음'}</Text>
                    <Text style={styles.subInfo}>작성자: {item.nickname || '익명'}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.contentText}>{item.content}</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.chatButton} onPress={sendMessage}>
                    <Text style={styles.chatButtonText}>문자거래</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    noImage: {
        width: '100%',
        height: 300,
        backgroundColor: '#f1f3f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImageText: {
        color: '#888',
        fontSize: 16,
    },
    contentContainer: {
        padding: 20,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f3f5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        marginBottom: 10,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#111',
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 15,
    },
    subInfo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    contentText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginBottom: 40,
    },
    chatButton: {
        backgroundColor: '#000',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DetailScreen;