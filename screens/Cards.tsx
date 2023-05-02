
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, useWindowDimensions, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Cards() {
  const [cards, setCards] = useState([]);
  const [err, setErr] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  //Fetching the card details
  const fetchCards = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://192.168.1.10:1337/api/card/`, {
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



  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }

    >
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
              ))}
            </View>
        }
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})