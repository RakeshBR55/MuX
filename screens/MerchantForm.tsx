import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MerchantHomePage from './MerchantHomePage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MerchantForm = () => {
    const [name, setName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [stripePublishableKey, setStripePublishableKey] = useState('');
    const [stripeSecretKey, setStripeSecretKey] = useState('');

    const navigation = useNavigation()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const RegDetails = JSON.stringify({
            stripePublishableKey,
            stripeSecretKey,
            businessName,
            address,
        });
        
        const response = await fetch("http://192.168.1.9:1337/api/auth/RegisterMerchant", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: RegDetails
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "ok") {
            await AsyncStorage.setItem("Merchant", "ok");

            Alert.alert("Merchant regstration successfull");
            navigation.navigate("MerchantHomePage");
        } else {
            Alert.alert("please recheck the details and try again");
        }

    };

    return (
        <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.container}>

            <Text style={styles.title}>Merchant Form</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor='black'
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Business/Store Name"
                value={businessName}
                onChangeText={setBusinessName}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Stripe Publishable Key"
                value={stripePublishableKey}
                onChangeText={setStripePublishableKey}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Stripe Secret Key"
                secureTextEntry
                value={stripeSecretKey}
                onChangeText={setStripeSecretKey}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        color: '#FFA500',
        padding: 4,
        marginBottom: 20,
        width: 150,
        textAlign: 'center',
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#FFA800',
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: '#2F3131',
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#FFA500',
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#2F3136',
        width: 130,
        textAlign: 'center',
    },
});

export default MerchantForm;