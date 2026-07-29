import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getUserProfile } from '../api/signinfoservice';

export default function MypageScreen({navigation}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [nickname, setNickname] = useState('');

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setIsLoggedIn(true);
                setUser(currentUser);

                const userData = await getUserProfile(currentUser.uid);
                if (userData && userData.nickname) {
                    setNickname(userData.nickname);
                } else if (currentUser.displayName) {
                    setNickname(currentUser.displayName);
                }else {
                    setNickname('이름 없음');
                }

            } else {
                setIsLoggedIn(false);
                setUser(null);
                setNickname('');
            }
        });

        return () => unsubscribe();
    }, []);

    const profileImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400';

    const likecount=0;
    const sellingcount=0;

    const handleLogout = () => {
        Alert.alert(
            "로그아웃",
            "정말 로그아웃 하시겠습니까?",
            [
                {text: "취소", style: "cancel"},
                {text: "확인", onPress: async () => {
                    try {await signOut(auth);}
                    catch (error) {Alert.alert("로그아웃 에러", error.message);}
                }}
            ]
        );
    };

    if (!isLoggedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.ment}>
                    안전한 대여·판매를 위해{"\n"} 로그인이 필요해요! 
                </Text>
                
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                    <Text style={styles.logintext}>로그인/회원가입</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.mpcontainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileSection}>
                    <View style={styles.topRow}>
                        <Image
                            source={{uri: profileImg}}
                            style={styles.profileImage}
                        />
                        <Text style={styles.nickname}>{nickname} 님</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.infobutton}
                        onPress={() => navigation.navigate('EditProfile')}
                        activeOpacity={0.7}
                    >
                        <Text style={{fontSize: 15, color: '#555', marginRight: 2, fontWeight: '500'}}>내 정보 수정</Text>
                        <Ionicons name="chevron-forward" size={12} color="#666" />
                    </TouchableOpacity>
                </View>

                <View style={styles.cardcontainer}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Likelist')}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="heart-outline" size={30} color="#FF4B4B" />
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#495057', marginTop: 10,}}>찜한 상품</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#111', marginTop: 6,}}>0</Text>
                    </TouchableOpacity>
                    <View style={styles.divideline} />
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Sellinglist')}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="cube-outline" size={30} color="#34C759" />
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#495057', marginTop: 10,}}>판매 중인 상품</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#111', marginTop: 6,}}>0</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.logoutcontainer}>
                    <TouchableOpacity onPress={handleLogout} activeOpacity={0.6}>
                        <Text style={styles.logout}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        paddingTop: 150 
    },

    ment: {
        fontSize: 33, 
        color: 'black', 
        fontWeight: '600', 
        marginBottom: 60, 
        textAlign: 'center', 
        lineHeight: 50, 
        letterSpacing: 1 
    },

    button: {
        backgroundColor: '#000', 
        paddingVertical: 20, 
        paddingHorizontal: 100, 
        borderRadius: 8
    },

    logintext: {
        color: '#fff', 
        fontSize: 20, 
        fontWeight: '500'
    },

    mpcontainer: {
        flex: 1,
        backgroundColor: '#fff'
    },

    profileSection: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F1F3F5',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
    },

    topRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E9ECEF'
    },

    nickname: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#111',
        marginLeft: 18
    },

    infobutton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F3F5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginLeft: 76,
        marginTop: -5,
    },

    cardcontainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 40,
        paddingVertical: 28,
        backgroundColor: '#F8F9FA',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    divideline: {
        width: 1,
        height: '60%',
        backgroundColor: '#E9ECEF'
    },

    logoutcontainer: {
        marginTop: 40,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    logout: {
        fontSize: 14,
        color: '#888888',
        textDecorationLine: 'underline',
        fontWeight: '400',
        paddingVertical: 8
    }
})