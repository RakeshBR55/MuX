import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    ImageBackground,
    Dimensions,
    Image,
    ScrollView,
    useWindowDimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = useWindowDimensions();

const CreditCardInputModal = () => {
    const [primaryCardNumber, setPrimaryCardNumber] = useState('');
    const [primaryCardName, setPrimaryCardName] = useState('');
    const [primaryCardExpiry, setPrimaryCardExpiry] = useState('');
    const [primaryCardCVV, setPrimaryCardCVV] = useState('');
    const [secondaryCardNumber, setSecondaryCardNumber] = useState('');
    const [secondaryCardName, setSecondaryCardName] = useState('');
    const [secondaryCardExpiry, setSecondaryCardExpiry] = useState('');
    const [secondaryCardCVV, setSecondaryCardCVV] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModal1Visible, setIsModal1Visible] = useState(false);
    const [primaryCardSubmitted, setPrimaryCardSubmitted] = useState(false);
    const [secondaryCardSubmitted, setSecondaryCardSubmitted] = useState(false);

    const Primarycard = () => {

        // const primaryCardDetailsString = AsyncStorage.getItem('primaryCardDetails');
        // const primaryCardDetails = JSON.parse(primaryCardDetailsString);
        // setPrimaryCardNumber(primaryCardDetails.cardNumber);
        // setPrimaryCardName(primaryCardDetails.cardName);
        // setPrimaryCardExpiry(primaryCardDetails.cardExpiry);
        // setPrimaryCardCVV(primaryCardDetails.cardCVV);



        return (
            <View style={{ backgroundColor: 'black', width: width * 0.95, borderRadius: 15, height: height * 0.27, overflow: 'hidden', }} className="mx-auto m-4">
                <ImageBackground source={require('../assets/credit-card.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }} className="top-10 mx-auto">{primaryCardDetails.cardNumber}</Text>
                        <Text style={{ color: 'white', fontSize: 15, }} className='top-10 '>{primaryCardDetails.cardName}</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='top-10'>{primaryCardDetails.cardExpiry}</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='left-60'>{primaryCardDetails.cardCVV}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    };
    const Secondarycard = () => {
        return (
            <View style={{ backgroundColor: 'black', width: width * 0.95, borderRadius: 15, height: height * 0.27, overflow: 'hidden', }} className="mx-auto m-4">
                <ImageBackground source={require('../assets/credit-card.png')} style={{ width: '100%', height: '100%' }}>
                    {/* <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 20 }}>
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }} className="top-10 mx-auto">{primaryCardDetails.cardNumber}</Text>
                        <Text style={{ color: 'white', fontSize: 15, }} className='top-10 '>{primaryCardDetails.cardName}</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='top-10'>{primaryCardDetails.cardExpiry}</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} className='left-60'>{primaryCardDetails.cardCVV}</Text>
                    </View> */}
                </ImageBackground>
            </View>
        );
    };

    const handlePrimaryCardSubmit = async () => {
        // TODO: send primary card details to backend/API
        const primaryCardDetails = {
            cardNumber: primaryCardNumber,
            cardName: primaryCardName,
            cardExpiry: primaryCardExpiry,
            cardCVV: primaryCardCVV,
        };
        try {
            if (!primaryCardNumber || !primaryCardCVV || !primaryCardExpiry || !primaryCardName) {
                Alert.alert('Please fill all the fields');
            }
            else {
                setPrimaryCardSubmitted(true);
                setIsModalVisible(false);
                await AsyncStorage.setItem('primaryCardDetails', JSON.stringify(primaryCardDetails));


            }

        } catch (e) {
            console.log(e);
        }

    };

    const handleSecondaryCardSubmit = () => {
        // TODO: send secondary card details to backend/API
        setSecondaryCardSubmitted(true);
        setIsModal1Visible(false);
    };

    return (
        <View style={styles.container}>
            {/* {primaryCardSubmitted ? (<Primarycard />) : (<TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Text style={styles.cardType}>Primary Card</Text>
            </TouchableOpacity>)} */}


            <Modal visible={isModalVisible} animationType="slide">
                <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <TextInput
                        value={primaryCardNumber}
                        onChangeText={setPrimaryCardNumber}
                        placeholder="Primary card number"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <TextInput
                        value={primaryCardName}
                        onChangeText={setPrimaryCardName}
                        placeholder="Primary card name"
                        style={styles.textInput}
                    />
                    <TextInput
                        value={primaryCardExpiry}
                        onChangeText={setPrimaryCardExpiry}
                        placeholder="Primary card expiry"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <TextInput
                        value={primaryCardCVV}
                        onChangeText={setPrimaryCardCVV}
                        placeholder="Primary card CVV"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <TouchableOpacity onPress={handlePrimaryCardSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit Primary Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>


            {/* {secondaryCardSubmitted ? (<Secondarycard />) : <TouchableOpacity onPress={() => setIsModal1Visible(true)}>
                <Text style={styles.cardType}>Secondary Card</Text>
            </TouchableOpacity>} */}

            <Modal visible={isModal1Visible} animationType="slide">
                <TouchableWithoutFeedback onPress={() => setIsModal1Visible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <TextInput
                        value={secondaryCardNumber}
                        onChangeText={setSecondaryCardNumber}
                        placeholder="Secondary card number"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <TextInput
                        value={secondaryCardName}
                        onChangeText={setSecondaryCardName}
                        placeholder="secondary card name"
                        style={styles.textInput}
                    />
                    <TextInput
                        value={secondaryCardExpiry}
                        onChangeText={setSecondaryCardExpiry}
                        placeholder="Secondary card expiry"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <TextInput
                        value={secondaryCardCVV}
                        onChangeText={setSecondaryCardCVV}
                        placeholder="Secondary card CVV"
                        keyboardType="numeric"
                        style={styles.textInput}
                    />
                    <TouchableOpacity onPress={handleSecondaryCardSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit Secondary Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsModal1Visible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardType: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cardContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 20,
        margin: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        margin: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default CreditCardInputModal;
