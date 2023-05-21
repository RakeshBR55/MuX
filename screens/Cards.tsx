
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, useWindowDimensions, TouchableOpacity, RefreshControl, Modal, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from '../envs'

export default function Cards() {
  const [cards, setCards] = useState([]);
  const [err, setErr] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [primary, setPrimary] = useState("");

  //Fetching the card details
  const fetchCards = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}card/`, {
        headers: {
          'x-auth-token': token,
        }
      }
      )
      const data = await response.json()
      setCards(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setErr(error)
    }
  }

  useEffect(() => {
    AsyncStorage.getItem("token").then(t => setToken(t)).catch(err => console.log(err)) //Getting the auth token
    if (token) fetchCards()
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCards()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const { height, width } = useWindowDimensions();

  const handleCard = (primary) => {
    setPrimary(primary)
    console.log(primary)
    setModalVisible(true);
  }
  const handlePrimary = async () => {
    try {
      const payload = {
        cardNumber: primary

      }
      const response = await fetch(`${BASE_URL}card/primary`, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        },
        'method': 'PUT',
        body: JSON.stringify(payload)
      });
      const data = await response.json()
      console.log(data)
      if (data.status == 'success') {

        setModalVisible(false)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <LinearGradient colors={['#0cb4ee', '#03030a', '#0707b8']} style={{ backgroundColor: '#383838', flex: 1, }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {

            setModalVisible(!modalVisible);
          }}>
          <View style={styles.container}>
            <View style={styles.card}>



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
                  onPress={() => { handlePrimary() }}>
                  <Text style={styles.textStyle}>Primary</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => { handleDelete() }}>
                  <Text style={styles.textStyle}>delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Text className='text-black font-bold text-center my-5 text-3xl'>
          Your cards
        </Text>
        <SafeAreaView style={styles.centeredView} className='pb-24'>

          {
            loading ?
              <View>
                <Text className='text-black'>Loading.....</Text>
              </View> :
              <View>

                {cards.map((card, index) => (
                  <TouchableOpacity onPress={() => handleCard(card.cardNumber)}>
                    <View key={index} style={{ backgroundColor: 'black', width: width * 0.95, borderRadius: 15, height: height * 0.27, overflow: 'hidden', }} className="mx-auto m-4">
                      <ImageBackground source={require('../assets/credit-card.png')} style={{ width: '100%', height: '100%' }}>

                        <View className='flex flex-col p-5 space-y-5'>
                          <Text className='text-white font-bold text-2xl' >{card.cardNumber.substring(0, 4)} {card.cardNumber.substring(4, 8)} {card.cardNumber.substring(8, 12)} {card.cardNumber.substring(12, 16)}</Text>

                          <Text className='text-white font-bold text-xl'>Exp: {card.expiryDate.substring(0, 2)}/{
                            card.expiryDate.substring(2, 4)
                          }</Text>
                          <View className='flex flex-row justify-between pt-10'>
                            <Text className='text-white text-2xl,' style={{ width: 150, fontSize: 25 }} >{card.cardHolder}</Text>
                            <Text style={{ width: 100 }} >{card.status}</Text>
                          </View>

                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
          }
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
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
  container: {
    padding: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'


  },
})