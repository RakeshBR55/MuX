import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MerchantForm from './MerchantForm';
import MerchantHomePage from "./MerchantHomePage"


export default function UserProfile() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        width: 150,
        textAlign: 'center', alignItems:'center',   }}>
                Profile
            </Text>
            
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80' }} // replace with user's profile image
                    style={styles.avatar}
                />
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.email}>johndoe@example.com</Text>
                <Text style={styles.phone}>+1 (123) 456-7890</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate('MerchantForm')
                }}>
                    <Text style={styles.buttonText}>Register as Merchant</Text>
                </TouchableOpacity>
            </View>
        </View >



        // <View style={styles.container}>
        //     <Image
        //         source={{ uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80' }}
        //         style={styles.profilePicture}

        //     />
        //     <Text style={styles.name}>John Doe</Text>
        //     <Text style={styles.email}>john.doe@example.com</Text>
        //     <Text style={styles.phoneNumber}>+1 123 456 7890</Text>
        //     <Button
        //         title="Go to Merchant Form"
        //         onPress={() => {
        //             navigation.navigate('MerchantHomePage');
        //         }}
        //     ></Button>
        // </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingBottom: 40,
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        width: 150,
        textAlign: 'center'
    },
    email: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        width: 200,
        textAlign: 'center'
    },
    phone: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
        width: 200,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#FF5733',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

