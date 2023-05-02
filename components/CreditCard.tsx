import { StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import WelcomeScreen from './WelcomeScreen'
import PrimaryCard from './PrimaryCard'
// import useFetch from "./useFetch";
import AddCard from './AddCard'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function CreditCard() {
    const [cards, setCards] = useState([]);

    const token = AsyncStorage.getItem("token")

    useEffect(() => {
        fetch(`http://192.168.1.9:1337/api/auth/card/PrimaryCard/${token}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCards(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const { height, width } = useWindowDimensions();


    return (
        <ScrollView>
            <SafeAreaView style={styles.centeredView}>
                <WelcomeScreen />
                {cards.map((card) => (
                    <View key={card.id} style={{ backgroundColor: 'black', width: width * 0.95, borderRadius: 15, height: height * 0.27, overflow: 'hidden', }} className="mx-auto m-4">
                        <ImageBackground source={require('../assets/credit-card.png')} style={{ width: '100%', height: '100%' }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }} className="top-10 mx-auto">{card.cardNumber}</Text>
                                <Text style={{ color: 'white', fontSize: 15, }} className='top-10 '>{card.cardName}</Text>
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