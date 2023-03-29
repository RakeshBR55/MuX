import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MerchantPaymentStatus from './MerchantPaymentStatus';

interface Item {
  name: string;
  cost: number;
}

const ITEM_LIST: Item[] = [
  { name: 'Item 1', cost: 10 },
  { name: 'Item 2', cost: 20 },
  { name: 'Item 3', cost: 30 },
  { name: 'Item 4', cost: 40 },
];

const MerchantPaymentSlip = () => {
    const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const totalAmount = selectedItems.reduce((acc, item) => acc + item.cost, 0);

  const handleItemPress = (item: Item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleInitiatePayment = () => {
    // TODO: implement payment initiation logic
    navigation.navigate('MerchantPaymentStatus');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Order Summary</Text>
      </View>
      <View style={styles.itemListContainer}>
        {ITEM_LIST.map((item) => (
          <TouchableWithoutFeedback key={item.name} onPress={() => handleItemPress(item)}>
            <View style={[styles.itemContainer, selectedItems.includes(item) && styles.selectedItemContainer]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCost}>${item.cost}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmount}>Total Amount: ${totalAmount}</Text>
      </View>
      <TouchableOpacity style={styles.initiatePaymentButton} onPress={handleInitiatePayment}>
        <Text style={styles.initiatePaymentButtonText}>Initiate Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemListContainer: {
    marginBottom: 32,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedItemContainer: {
    backgroundColor: '#007aff',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalAmountContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  initiatePaymentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 16,
  },
  initiatePaymentButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    },
});


export default MerchantPaymentSlip;