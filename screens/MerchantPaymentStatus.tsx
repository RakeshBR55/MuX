import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MerchantHomePage from './MerchantHomePage';


const PaymentSuccessfulScreen = () => {
    const navigation = useNavigation();
    const { payeeName, paymentId, amountReceived } = {
        payeeName: 'John Doe',
        paymentId: "#123232323",
        amountReceived: 100,
    }
    const onDonePress = () => {
        console.log('Done Pressed');
        navigation.navigate('MerchantHomePage');




    }



    return (
        <View style={styles.container}>
            <Text style={styles.paymentReceived}>Payment Received</Text>
            <Image source={require('../assets/checkMark.png')}>
            </Image>
            <Text style={styles.payeeName}>{payeeName}</Text>
            <Text style={styles.paymentId}>Payment ID: {paymentId}</Text>
            <Text style={styles.amountReceived}>Amount Received: {amountReceived}</Text>
            <TouchableOpacity style={styles.doneButton} onPress={onDonePress}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9',
        paddingHorizontal: 30,
    },
    paymentReceived: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

    payeeName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    paymentId: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
        width: 100
    },
    amountReceived: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    doneButton: {
        backgroundColor: '#007aff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    doneButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PaymentSuccessfulScreen;

