import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, lazy } from 'react';
import { View, Text, StyleSheet, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';


export default function History() {
  const [payments, setPayments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [err, setErr] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://192.168.1.10:1337/api/transaction/user', {
        headers: {
          'x-auth-token': token
        }
      })
      const data = await response.json()
      setPayments(data)
      console.log(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setErr(error)
    }
  }

  useEffect(() => {
    AsyncStorage.getItem("token").then(t => setToken(t)).catch(err => console.log(err))
    if (token != "") fetchTransactions()
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTransactions()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };


  const handleTransaction = async () => {
    return
  }
  return (
    <LinearGradient colors={['#0cb4ee', '#03030a', '#0707b8']} style={{ backgroundColor: '#383838', flex: 1, }}>
      <Text className='text-3xl font-bold p-10 bg-black ' style={{ backgroundColor: '#383838', textAlign: 'center', }}>
        Pending payments
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {
          loading ? <View>
            <Text>
              Loading ....
            </Text>
          </View> :
            (
              payments.map((item, index) => (
                <TouchableOpacity key={index} onPress={handleTransaction(item.id)}>
                  <View style={styles.transaction} >
                    <Image source={require('../assets/credit-card.png')} style={styles.avatar} />
                    <View style={styles.details}>
                      <Text style={styles.name}>{item['merchantId']['businessName']}</Text>
                      <View style={styles.datetime} className='flex flex-row space-x-5'>
                        <Text>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Text>
                        <Text>
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </Text>

                      </View>
                    </View>
                    <Text style={[styles.amount, styles.positive]}>
                      {
                        item['status'] == 'PENDING' ? "Pay" : 'Successful'
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )
        }
      </ScrollView>
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
