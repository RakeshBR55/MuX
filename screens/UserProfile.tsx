import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MerchantForm from './MerchantForm';
import MerchantHomePage from "./MerchantHomePage"


export default function UserProfile() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80' }}
                style={styles.profilePicture}

            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
            <Text style={styles.phoneNumber}>+1 123 456 7890</Text>
            <Button
                title="Go to Merchant Form"
                onPress={() => {
                    navigation.navigate('MerchantHomePage');
                }}
            ></Button>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        width: 200,
        textAlign: 'center'
    },
    phoneNumber: {
        fontSize: 16,
        width: 200,
        textAlign: 'center'
    },
});

