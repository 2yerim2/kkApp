import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { dummyRentProducts, dummySaleProducts } from '../data/dummyData';

const renderItem = ({item}) => (
<View style={{ width:150, height:250, marginRight:10, marginLeft:10 }}>
    <Image source={{uri: item.imageUrl}} style={{ width:150, height:150, borderRadius:6 }} />
    <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize:16, lineHeight:20, height:38, marginTop:8 }}>{item.title}</Text>
    <Text style={{ fontSize:20, fontWeight:'600' }}>{item.price.toLocaleString()}원</Text>
</View>);

const Categories = [
    {name: '전체', icon: "grid"},
    {name: '서적', icon: "book-outline"},
    {name: '전공 물품', icon: "construct-outline"},
    {name: '생활용품', icon: "basket-outline"},
    {name: '굿즈/의류', icon: "sparkles-outline"},
];

export default function MainScreen() {
    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <Ionicons name="search-outline" size={28} color="black" />
                <Ionicons name="notifications-outline" size={28} color="black" />
                <Ionicons name="heart-outline" size={28} color="black" />
            </View>

            <View style={styles.categories}>
                {Categories.map((item) => {
                    return (
                        <TouchableOpacity key={item.name} style={styles.categoriesButton}>
                            <Ionicons name={item.icon} size={30} color="black" />
                            <Text style={{ fontSize:13, fontWeight:'600' }}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>

            <Text style={styles.sectionTitle}>최신 대여 상품</Text>
            <FlatList
            horizontal
            data={dummyRentProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />

            <Text style={styles.sectionTitle}>최신 판매 상품</Text>
            <FlatList
            horizontal
            data={dummySaleProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        columnGap: 10,
        paddingTop:75,
        paddingRight: 20,
        paddingBottom: 70
    },

    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop:20,
        marginBottom: 15,
    },

    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 50
    },

    categoriesButton: {
        width: 60,
        height: 60,
        backgroundColor: '#f1f3f5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 3
    }
});