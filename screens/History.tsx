import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Transaction {
  name: string;
  date: string;
  time: string;
  amount: number;
}

const transactions: Transaction[] = [
  {
    name: 'John Doe',
    date: '2021-08-01',
    time: '10:30 AM',
    amount: -50,
  },
  {
    name: 'Jane Smith',
    date: '2021-08-02',
    time: '2:45 PM',
    amount: 100,
  },
  {
    name: 'Bob Johnson',
    date: '2021-07-31',
    time: '11:20 AM',
    amount: -25,
  },
];

export default function History() {
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transaction}>
      <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.datetime}>{`${item.date} ${item.time}`}</Text>
      </View>
      <Text style={[styles.amount, item.amount >= 0 ? styles.positive : styles.negative]}>
        {item.amount >= 0 ? `+${item.amount}` : `${item.amount}`}
      </Text>
    </View>
  );

  return (
    <LinearGradient colors={['#0cb4ee', '#03030a','#0707b8' ]}  style={{backgroundColor:'#383838', flex:1, }}>

      <Text className='text-3xl font-bold p-10 bg-black ' style={{backgroundColor:'#383838', textAlign:'center', }}>
        Transaction History
      </Text>
       <FlatList
      data={transactions}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}/>
      
      

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
    height:80,
    borderColor:'white',
    borderWidth:1,
    
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginLeft:10
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
