import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, lazy } from 'react';
import { View, Text, StyleSheet, FlatList, Image, RefreshControl, TouchableOpacity, Button, Modal, TextInput, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MerchantPaymentStatus from './MerchantPaymentStatus'


export default function History() {
  const [payments, setPayments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [err, setErr] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  
  const [paymentId, setPaymentId] = useState("");
  const navigation = useNavigation()

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

  const handlePayment = async () => {
    try {
      const response = await fetch('http://192.168.1.10:1337/api/payment/intent', {
        headers: {
          'x-auth-token': token
        }
      })
      const data = await response.json()
      console.log(data)
      if(data.status == "ok") {
        navigation.navigate("MerchantPaymentStatus")
      }
      


    }
    catch (error) {
      console.log(error)
    }
  }


  const handleTransaction = (id) => {
    setModalVisible(true)
     setPaymentId(id)
     console.log(paymentId)
  }
  return (
    
    <LinearGradient colors={['#0cb4ee', '#03030a', '#0707b8']} style={{ backgroundColor: '#383838', flex: 1, }}>
      <Text className='text-3xl font-bold p-10 ' style={{ textAlign: 'center', }}>
        Pending payments
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Amount</Text>
                                <TextInput
                                    style={styles.input}
                                    value={amount}
                                    keyboardType="numeric"
                                    placeholder='₹'
                                    placeholderTextColor={'gray'}
                                    onChangeText={setAmount}
                                />
                               
                                
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>CVV</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cvv}
                                    keyboardType='numeric'
                                    onChangeText={setCvv}
                                    maxLength={3}
                                    placeholderTextColor={'gray'}
                                    placeholder="234"
                                />
                            </View>
                            

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {handlePayment()}}>
                                    <Text style={styles.textStyle}>PAY</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
        {
          loading ? <View>
            <Text>
              Loading ....
            </Text>
          </View> :
            (
              payments.map((item, index) => (

                <View style={styles.transaction} key={index} >
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
                  <View style={{right:10, width:40}}>
                  <Button title='pay' onPress={() => handleTransaction(item._id)}></Button>
                  </View>

                  
                </View>

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
button: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
},
buttonOpen: {
    backgroundColor: 'black',
},
buttonClose: {
    backgroundColor: '#2196F3',
},
textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
},
modalText: {
    marginBottom: 15,
    textAlign: 'center',
},
card: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
},
label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 10,
},
input: {
    flex: 1,
    height: 40,
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: '#333',
},
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
}
});
