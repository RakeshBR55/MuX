import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default function History() {
  const [cards, setCards] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCards = () => {
    fetch('http://192.168.1.9:1337/api/auth/card/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCards(data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCards();
  };

  const handleTransaction = (id) => () => {
    
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={handleTransaction(item.id)}>
      <View style={styles.transaction} >
        <Image source={require('../assets/credit-card.png')} style={styles.avatar} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.id}</Text>
          <Text style={styles.datetime}>
            {`${new Date(item.createdAt).toLocaleDateString()}
            ${new Date(item.createdAt).toLocaleTimeString()}`}
          </Text>
        </View>
        <Text style={[styles.amount, styles.positive]}>
          PAY
        </Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <LinearGradient colors={['#0cb4ee', '#03030a', '#0707b8']} style={{ backgroundColor: '#383838', flex: 1, }}>

      <Text className='text-3xl font-bold p-10 bg-black ' style={{ backgroundColor: '#383838', textAlign: 'center', }}>
        Pending payments
      </Text>

      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.container} />




    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    backgroundColor: '#383838',


  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 25,
    backgroundColor: '#000',
    height: 80,
    borderColor: 'white',
    borderWidth: 1,

  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datetime: {
    color: '#888',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 10,
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#f44336',
  },
});
