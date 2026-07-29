import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initialWishlist } from '../data/mockData';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function LikelistScreen() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const navigation = useNavigation();

  const likedCount = wishlist.filter((item) => item.isLiked).length;

  const cardPress = (productId) => {
    navigation.navigate('Detail', {productId});
  };

  const removeLike = (productId) => {
    setWishlist((prev) => prev.map((item) => item.id === productId ? {...item, isLiked: !item.isLiked} : item ));
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => cardPress(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.sellerText}>{item.sellerName} · {item.createdAt}</Text>
        <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.priceText}>{item.price.toLocaleString()}원</Text>
      </View>
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => removeLike(item.id)}
        hitSlop={{top:10, bottom:10, left:10, right:10}}
      >
        <Ionicons
          name={item.isLiked ? 'heart' : 'heart-outline'}
          size={24}
          color={item.isLiked ? '#ff4757' : '#aaa'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>찜한 상품 <Text style={styles.countText}>{likedCount}</Text></Text>
      </View>

      {wishlist.length === 0? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>아직 찜한 상품이 없어요.{'\n'}마음에 드는 상품에 하트를 눌러보세요!</Text>
        </View>
      ):(
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },

  countText: {
    color: '#ff4757'
  },

  listContent: {
    padding: 16
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  image: {
    width: 74,
    height: 74,
    borderRadius: 8,
    backgroundColor: '#eee'
  },

  infoContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8
  },

  sellerText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2
  },

  titleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4
  },

  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111'
  },

  likeButton: {
    padding: 6
  },

  heartIcon: {
    fontSize: 20
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  emptyText: {
    fontSize: 25,
    textAlign: 'center',
    lineHeight: 40,
    color: '#666',
    fontWeight: 'bold'
  }
})