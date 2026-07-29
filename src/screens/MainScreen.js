import React ,{ useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserData, fetchProductsBySchool } from '../api/mainpostservice';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from "react-native";

const renderItem = ({item}) => (
<View style={{ width:150, height:250, marginRight:10, marginLeft:10 }}>
    <Image source={{uri: item.imageUrl}} style={{ width:150, height:150, borderRadius:6 }} />
    <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize:16, lineHeight:20, height:38, marginTop:8 }}>{item.title}</Text>
    <Text style={{ fontSize:20, fontWeight:'600' }}>{item.price.toLocaleString()}원</Text>
</View>);

const Categories = [
    {name: '서적', icon: "book-outline"},
    {name: '전공 물품', icon: "construct-outline"},
    {name: '기타', icon: "sparkles-outline"},
];

export default function MainScreen({navigation}) {
    const [rentProducts, setRentProducts] = useState([]);
    const [saleProducts, setSaleProducts] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    
    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                try {
                    const userData = await fetchUserData();
                    if (!userData) return;
                    
                    setUserInfo(userData);

                    if (userData.school) {
                        const { rentProducts, saleProducts } = await fetchProductsBySchool(userData.school);
                        setRentProducts(rentProducts);
                        setSaleProducts(saleProducts);
                    }
                } catch (error) {
                    console.error("데이터 로드 실패:", error);
                }
            };

            loadData();
        }, [])
    );

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
            data={rentProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />

            <Text style={styles.sectionTitle}>최신 판매 상품</Text>
            <FlatList
            horizontal
            data={saleProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />

            <Button
            title="검색"
            onPress={() =>
            navigation.navigate("검색")
            }
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
        justifyContent: 'center',
        gap: 40,
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