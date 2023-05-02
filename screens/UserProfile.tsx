import React, { Component, lazy, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity ,RefreshControl ,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MerchantForm from './MerchantForm';
import MerchantHomePage from "./MerchantHomePage"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function UserProfile() {
    const navigation = useNavigation();

    const [token, setToken] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    
    // Fetching the user 
    const fetchUser = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://192.168.1.10:1337/api/auth/user', {
                headers: {
                    'x-auth-token': token
                }
            })
            const user = await response.json()
            setData(user)
            console.log(user)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        AsyncStorage.getItem("token").then(t => setToken(t)).catch(err => console.log(err))
        if (token) fetchUser()
    }, [])


    const onRefresh = () => {
        setRefreshing(true);
        fetchUser()
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      };
    return (
        loading ? <View>
            <Text>
                Loading
            </Text>
        </View> :
            (<ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
            >
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center', alignItems: 'center',
                }}>
                    Profile
                </Text>

                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80' }} // replace with user's profile image
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{data.name}</Text>
                    <Text style={styles.email}>{data.email}</Text>
                    <Text style={styles.phone}>+91 {data.contact}</Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('MerchantForm')
                    }}>
                        <Text style={styles.buttonText}>Register as Merchant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('MerchantHomePage')
                    }}>
                        <Text style={styles.buttonText}>Merchant home</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >)



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

