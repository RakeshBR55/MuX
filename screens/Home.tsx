import { Button, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import AddCard from '../components/AddCard'
import Test from '../components/Test'
import { LinearGradient } from 'react-native-linear-gradient';

export default function Home() {
  return (
    <LinearGradient colors={['#f8f9fa', '#e2e3e7']} style={{ backgroundColor: 'white', flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'black' }}>Home screen</Text>
      {/* <AddCard /> */}
      <Test />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({})