import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MerchantPaymentSlip from './MerchantPaymentSlip';
import BluetoothScreen from './BluetoothScreen';
import Bttest from './Bttest';

const MerchantHomePage = () => {
    const navigation = useNavigation();

    const handleInitiatePayment = () => {
        navigation.navigate('MerchantPaymentSlip');
    }

    return (
        <LinearGradient colors={['#000000', '#1E1F28']} style={styles.container}>
            <View>
                <Text style={styles.title}>Merchant Home Page</Text>
                <Text style={styles.subtitle}>Start Here To Make Payment</Text>
            </View>

            <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.8}
                onPress={handleInitiatePayment}
            >
                <Text style={styles.buttonText}>INITIATE PAYMENT</Text>
            </TouchableOpacity>
            {/* <BluetoothScreen /> */}
            {/* <Bttest /> */}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },

    title: {
        fontSize: 25,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 18

    },

    subtitle: {
        marginTop: 8,
        fontSize: 18,
        color: '#FFF',
        justifyContent: 'center',
        textAlign: 'center'
    },

    buttonContainer: {
        backgroundColor: '#9575CD',
        paddingVertical: 16,
        borderRadius: 4
    },

    buttonText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center'
    }
})

export default MerchantHomePage;
