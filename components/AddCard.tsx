import { StyleSheet, Alert, TextInput, Image, Pressable, Text, View, useWindowDimensions, ImageBackground, Switch, Modal, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../envs'

export default function AddCard() {
    const [modalVisible, setModalVisible] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [token, setToken] = useState("");

    const getToken = async () => {
        const auth_token = await AsyncStorage.getItem("token");
        setToken(auth_token)
    }

    const handleSubmit = async () => {

        getToken()
        const card = JSON.stringify({
            cardNumber: cardNumber,
            cardHolder: cardName,
            expiryDate: expiryDate,

        });
        const response = await fetch(`${BASE_URL}card/add`, {
            method: "POST",
            credentials: "include",
            headers: {
                'x-auth-token': token,
                "Content-Type": "application/json",
            },
            body: card,
        });

        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
            Alert.alert(" card added successfully");
            setModalVisible(!modalVisible)
            console.log(card)
            setCardName('');
            setCardNumber('');
            setExpiryDate('');

        } else {
            Alert.alert("please recheck card details");
        }


    };


    const { height, width } = useWindowDimensions();

    return (
        <ScrollView>
            <SafeAreaView>
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
                                <Text style={styles.label}>Card Number</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cardNumber}
                                    keyboardType="numeric"
                                    maxLength={16}
                                    textContentType='creditCardNumber'
                                    onChangeText={setCardNumber}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Cardholder Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cardName}
                                    onChangeText={setCardName}
                                    placeholder="John Doe"
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Expiry Date</Text>
                                <TextInput
                                    style={styles.input}
                                    value={expiryDate}
                                    keyboardType="numeric"
                                    maxLength={4}
                                    placeholder="MM/YY"
                                    onChangeText={setExpiryDate}
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
                                    onPress={() => { handleSubmit() }}>
                                    <Text style={styles.textStyle}>Submit</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Pressable

                    className="mx-auto bg- "
                    onPress={() => setModalVisible(true)}>

                    <View style={{ height: height * 0.27, width: width * 0.96, backgroundColor: 'black', borderRadius: 15, overflow: 'hidden', margin: 4, marginBottom: 100 }} className="m-4">
                        <ImageBackground source={require('../assets/credit-card.png')} style={{ width: '100%', height: '100%' }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }} className=" mx-auto">Add card</Text>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }} className="top-4 mx-auto">---- ---- ---- ----</Text>
                                <Text style={{ color: 'white', fontSize: 15, }} className='top-10 '>----------  ----</Text>
                                <Image source={require('../assets/addCard.png')} className="mx-auto w-24 h-24"></Image>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='bottom-1'>--/--</Text>

                            </View>
                        </ImageBackground>
                    </View>
                </Pressable>


            </SafeAreaView >
        </ScrollView>
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
