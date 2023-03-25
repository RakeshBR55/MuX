import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ImageBackground, ScrollView, Image } from 'react-native';
import { ImageComponent } from 'react-native/Libraries/Image/Image';

interface Card {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}


export default function test() {
    const [modalVisible, setModalVisible] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');



    const handleSubmit = () => {
        if (!cardNumber || !expiryDate || !cardName || !cvv) {
            Alert.alert('Please fill all fields');
        } else {
            Alert.alert('Card added successfully');
            setModalVisible(!modalVisible)
            const newCard: Card = { cardNumber, cardName, expiryDate, cvv };;
            setCards([...cards, newCard]);
            setCardName('');
            setCardNumber('');
            setExpiryDate('');
            setCvv('');

        }

    };
    return (

        <ScrollView><View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
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
                        <View style={styles.row}>
                            <Text style={styles.label}>CVV</Text>
                            <TextInput style={styles.input}
                                keyboardType='numeric'
                                value={cvv}
                                maxLength={3}
                                placeholder="123"
                                onChangeText={setCvv} />
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {

                                handleSubmit()
                            }}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View>

            </View>
            <View>
                {cards.map((card, index) => (
                    <View key={index} style={{ height: 230, backgroundColor: 'black', width: 400, borderRadius: 15, overflow: 'hidden' }}>
                        <ImageBackground source={require('../assets/credit-card.png')} style={{ width: '100%', height: '100%' }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }} className="top-10 mx-auto">{card.cardNumber}</Text>
                                <Text style={{ color: 'white', fontSize: 15, }} className='top-10 '>{card.cardName}</Text>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='top-10'>{card.expiryDate}</Text>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='left-60'>{card.cvv}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                ))}

                <Pressable

                    className="mx-auto bg- "
                    onPress={() => setModalVisible(true)}>

                    <View style={{ height: 230, backgroundColor: 'black', width: 400, borderRadius: 15, overflow: 'hidden' }} className="m-4">
                        <ImageBackground source={require('../assets/credit-card.png')} style={{ width: '100%', height: '100%' }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }} className=" mx-auto">Add card</Text>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }} className="top-4 mx-auto">---- ---- ---- ----</Text>
                                <Text style={{ color: 'white', fontSize: 15, }} className='top-10 '>----------  ----</Text>
                                <Image source={require('../assets/addCard.png')} className="mx-auto w-24 h-24"></Image>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='bottom-1'>--/--</Text>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='left-72 bottom-8'>---</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <Text style={styles.textStyle}>Add card</Text>

                </Pressable>




            </View>


        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
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



    },
});
