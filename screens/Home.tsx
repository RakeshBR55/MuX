import { Button, StyleSheet, Text, View, Alert, Animated, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react';
import AddCard from '../components/AddCard'
import Test from '../components/Test'
import LinearGradient from 'react-native-linear-gradient';


export default function Home() {

  return (


    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#eeaeca', '#090f79', ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={styles.gradient}>

        <Text style={{ color: 'black', }}>Home screen</Text>
        {/* <AddCard /> */}
        <Test />

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

