import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, SafeAreaView, SafeAreaViewBase } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function MypageScreen({navigation}) {
    const isLoggedIn=true;

    const nickname = '경희대';
    const profileImg = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400';

    if (isLoggedIn) {
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
            <TouchableOpacity
                style={styles.profileSection}
                onPress={() => navigation.navigate('EditProfile')}
                activeOpacity={0.7}
            >
                <View style={styles.profileLeft}>
                    <Image
                        source={{uri: profileImg}}
                        style={styles.profileImage}
                    />
                    <Text style={styles.nickname}>{nickname}</Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#999" />
            </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5'
    },

    profileLeft: {
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
        marginLeft: 14
    },
})