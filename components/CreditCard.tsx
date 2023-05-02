import { StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import WelcomeScreen from './WelcomeScreen'
import PrimaryCard from './PrimaryCard'
// import useFetch from "./useFetch";
import AddCard from './AddCard'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default  function CreditCard () {
    const [cards, setCards] = useState([]);
    const [err, setErr] = useState("")
    const [token,setToken] = useState("")
    const getToken =async () => {
        const tok = await AsyncStorage.getItem("token")
        setToken(tok)

    }
    
    const fetchCards = async () => {
        try {
            getToken()
            const response = await fetch(`http://192.168.1.10:1337/api/card/`,{
                headers: {
                    'x-auth-token': token,
                    'Content-Type':'application/json'
                }
            }
        )
            let data = await response.json()
            console.log(data)
            data = data.filter( card => (
                card.status == 'PRIMARY'
            ))
            setCards(data) 
        } catch (error) {
            console.log(error)
            setErr(error)
        }
    }

    useEffect(() => {
        fetchCards()
    }, []);


    const { height, width } = useWindowDimensions();


    return (
        <ScrollView>
            <SafeAreaView style={styles.centeredView}>
                <WelcomeScreen />
                {cards.length > 0 && cards.map((card,index) => (
                    <View key={index} style={{ backgroundColor: 'black', width: width * 0.95, borderRadius: 15, height: height * 0.27, overflow: 'hidden', }} className="mx-auto m-4">
                        <ImageBackground source={require('../assets/credit-card.png')} style={{ width: '100%', height: '100%' }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }} className="top-10 mx-auto">{card.cardNumber}</Text>
                                <Text style={{ color: 'white', fontSize: 15, }} className='top-10 '>{card.cardHolder}</Text>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='top-10'>{card.expiryDate}</Text>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='left-60'>{card.cvv}</Text>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='left-60'>{index}</Text>

                            </View>
                        </ImageBackground>
                    </View>
                ))}

                <AddCard />
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