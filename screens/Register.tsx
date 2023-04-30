

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Login from './Login'


const Register = () => {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setcontact] = useState('');

    const navigation = useNavigation()

    const navigate = useNavigation();
    async function handleRegister(event) {
      event.preventDefault();
      const response = await fetch("http://192.168.1.9:1337/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          contact
        }),
      });
  
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        Alert.alert("User successfully registered");
        navigation.navigate("Login");
      } else {
        Alert.alert("user already exists");
        navigation.navigate("Login");
      }
    }




    return (


        <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Full Name"
                autoCapitalize="none"
                value={name}
                onChangeText={setname}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor='black'
                placeholder="Contact Details"
                keyboardType='numeric'
                autoCapitalize="none"
                value={contact}
                onChangeText={setcontact}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text style={{width:200, textAlign:'center', marginBottom:10}}>
                Already have an account?
            </Text>
            <TouchableOpacity style={{width:100, height:40,backgroundColor: '#FFA500',borderRadius:10, alignItems:'center', justifyContent:'center', }} onPress={() => {
                navigation.navigate('Login')

            }}>
                <Text style={{textAlign:'center', width:50, color:'#000' }}>Login</Text>
            </TouchableOpacity>
        </LinearGradient>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',

        alignItems: 'center',
        justifyContent: 'center',
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

export default Register;