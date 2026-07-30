import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserData, fetchProductsBySchool } from '../api/mainpostservice';
import { useFocusEffect } from '@react-navigation/native';

export default function MainScreen({navigation}) {
    const [rentProducts, setRentProducts] = useState([]);
    const [saleProducts, setSaleProducts] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                try {
                    if (rentProducts.length === 0 && saleProducts.length === 0) {
                        setLoading(true);
                    }

                    const userData = await fetchUserData();

                    if (userData && userData.school) {
                        const { rentProducts, saleProducts } = await fetchProductsBySchool(userData.school);
                        setRentProducts(rentProducts ? [...rentProducts] : []);
                        setSaleProducts(saleProducts ? [...saleProducts] : []);
                    }
                } catch (error) {
                    console.error("데이터 로드 실패:", error);
                } finally {
                    setLoading(false);
                }
            };

            loadData();
        }, [rentProducts.length, saleProducts.length])
    );

    const renderItem = ({ item }) => {
        if (!item) return null;

        const hasImage = item.imageUrls && item.imageUrls.length > 0;
        const imageSource = hasImage
            ? { uri: item.imageUrls[0] } 
            : { uri: 'https://dummyimage.com/150x150/cccccc/ffffff.png&text=No+Image' };

        const isRent = item.type === 'RENT';
        const formattedPrice = `${item.price ? item.price.toLocaleString() : 0}원${isRent ? ' / 일' : ''}`;

        return (
            <TouchableOpacity 
                style={styles.itemContainer} 
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Detail", { item: item })}
            >
                <Image 
                    source={imageSource} 
                    style={styles.itemImage}
                    resizeMode="cover"
                />
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.itemTitle}>
                    {item.title || '제목 없음'}
                </Text>
                <Text style={styles.itemPrice}>
                    {formattedPrice}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <Ionicons name="search-outline" size={28} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Likelist")}>
                    <Ionicons name="heart-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>최신 대여 상품</Text>
            {loading ? (
                <ActivityIndicator size='small' color='#888' style={{marginVertical: 20}} />
            ) : (
                <FlatList
                    horizontal
                    data={rentProducts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
                    extraData={rentProducts}
                    showsHorizontalScrollIndicator={false}
                />
            )}

            <Text style={styles.sectionTitle}>최신 판매 상품</Text>
            {loading ? (
                <ActivityIndicator size='small' color='#888' style={{marginVertical: 20}} />
            ) : (
                <FlatList
                    horizontal
                    data={saleProducts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
                    extraData={saleProducts}
                    showsHorizontalScrollIndicator={false}
                />
            )}
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
        paddingBottom: 20
    },

    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop:20,
        marginBottom: 15,
    },

    itemContainer: {
        width: 150,
        marginHorizontal: 10,
        marginBottom: 20,
    },

    itemImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#f1f3f5'
    },

    itemTitle: {
        fontSize: 15,
        lineHeight: 20,
        height: 40,
        marginTop: 8,
        color: '#333'
    },

    itemPrice: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 4,
        color: '#000'
    },
});