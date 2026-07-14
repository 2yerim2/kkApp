import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function MypageScreen({navigation}) {
    const isLoggedIn=false;

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
        <View>
            <Text>로그인 완료</Text>
        </View>
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
    }
})