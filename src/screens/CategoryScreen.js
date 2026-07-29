import React from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function CategoryScreen() {
    const categories = [
        {id: 'books', title: '서적', icon: "book-outline", sub: ['공학/자연', '미술/건축', '음악/체육', '의학/보건', '인문/상경', '사범/교육', '기타']},
        {id: 'major', title: '전공 물품', icon: "construct-outline", sub: ['공학/자연', '미술/건축', '음악/체육', '의학/보건', '인문/상경', '사범/교육', '기타']},
        {id: 'etc', title: '기타', icon: "sparkles-outline", sub: ['생활용품', '의류', '굿즈', '기타']},
    ];

    return (
        <ScrollView style={styles.container}>
            {categories.map((maincat) => (
                <View key={maincat.id} style={styles.section}>
                    <View style={styles.titlecontainer}>
                        <Ionicons name={maincat.icon} size={30} />
                        <Text style={styles.title}>{maincat.title}</Text>
                    </View>
                    <View style={styles.subbox}>
                        {maincat.sub.map((subcat) => {
                            return (
                                <TouchableOpacity key={subcat} style={styles.subbutton}>
                                    <Text style={styles.subtitle}>{subcat}</Text>
                                    <Ionicons name="chevron-forward" size={16} color="#c7c7cc" />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            ))}
            <View style={{ height: 40 }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 60
    },

    section: {
        marginTop: 25
    },

    titlecontainer: {
        flexDirection: 'row',
        gap: 4
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        paddingLeft: 5
    },

    subbox: {
        borderTopWidth: 1,
        borderTopColor: 'black',
        backgroundColor: '#f2f2f7'
    },

    subbutton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 17,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#adadad'
    },

    subtitle: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '480'
    }
})