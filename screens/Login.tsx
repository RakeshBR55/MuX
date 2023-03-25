import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const data = {
            email,
            password,
        };
        if (!email || !password) {
            Alert.alert("Please fill in all the fields")

        }
        else {
            const mydata = JSON.stringify(data)
            Alert.alert(mydata, "login successful")
        }
    };

    return (
        <LinearGradient colors={['#2F3136', '#1A202C', '#0E1014', '#2A2D34', '#3B4048', '#4F5563']} style={styles.container}>
        
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
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