import React from "react";
import { StyleSheet, TouchableOpacity, TextInput, View, Text } from "react-native";

export default function LoginScreen({navigation}) {
    return (
        <View style={styles.container}>
            <TextInput placeholder="아이디" style={styles.input} />
            <TextInput placeholder="비밀번호" secureTextEntry={true} style={styles.input} />
            <TouchableOpacity style={styles.loginButton}>
                <Text style={{fontSize: 20, color: '#fff'}}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text style={{fontSize: 16, color: 'gray'}}>회원가입</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 60
    },

    input: {
        height: 56,
        fontSize: 18,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 20
    },

    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        height: 50,
        borderRadius: 12,
    },

    signupButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
})