import { Button, StyleSheet, Text, View, Alert, Animated, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react';
import AddCard from '../components/AddCard'
import Test from '../components/Test'
import LinearGradient from 'react-native-linear-gradient';
import CreditCardInputModal from '../components/CreditCardInputModal';
import CreditCard from '../components/CreditCard';


export default function Home() {

  return (


    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#0cb4ee', '#03030a','#0707b8' ]}
         style={styles.gradient}>
        {/* <AddCard /> */}
        {/* <Test /> */}
        <CreditCard />
        {/* <CreditCardInputModal /> */}

      </LinearGradient>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  gradient: {
    width: '100%',
    height: '100%',
  }
})

