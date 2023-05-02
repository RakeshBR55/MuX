import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authContext } from "../components/authContext";
import Register from './Register'
import Tabs from '../navigation/Tabs'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setDecodedToken } = useContext(authContext);
    const navigation = useNavigation();
    const baseUrl = process.env.BASE_URL;
    console.log(baseUrl)
    async function handleLogin(event) {
        event.preventDefault();
        const response = await fetch(`http://192.168.1.10:1337/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
            await AsyncStorage.setItem("token", data.auth_token);
            setDecodedToken(data.token);

            Alert.alert("Login successfull");
            navigation.navigate("Tabs");
        } else {
            Alert.alert("please recheck your username and password or signup first");
        }
    }

    return (
        <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.container}>

            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={{ width: 200 }}>
                Haven't created an account yet?
            </Text>
            <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: '#FFA500', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                navigation.navigate('Register')

            }}>
                <Text style={{ textAlign: 'center', width: 60, color: '#000' }}>Register</Text>
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

export default Login;