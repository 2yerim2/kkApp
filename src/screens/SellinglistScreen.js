import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet'; // ActionSheet Hook
import { initialSellingProducts } from '../data/mockSellingData';

const Status = {
  SELLING: { text: '판매중', color: '#4dabf7' },
  RESERVED: { text: '예약중', color: '#51cf66' },
  SOLD_OUT: { text: '판매완료', color: '#867e96' }
};

export default function SellinglistScreen() {
  const [products, setProducts] = useState(initialSellingProducts);
  const {showActionSheetWithOptions} = useActionSheet();

  const deleteProduct = (productId) => {
    Alert.alert("상품 삭제", "정말 이 상품을 삭제하시겠습니까?",
      [
        {text: "취소", style: "cancel"},
        {text: "삭제", style: "destructive",
          onPress: () => {setProducts(prev => prev.filter(p => p.id !== productId));}}
      ]
    );
  };

  const changeStatus = (productId, newStatus) => {
    setProducts(prev => prev.map(p => p.id === productId ? {...p, status: newStatus} : p));
  };

  const optionMenu = (productId) => {
    const options = []
  }
}

const styles = StyleSheet.create({
});