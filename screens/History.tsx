import { Button, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import Register from './Register'

export default function History() {
  return (
    <View style={{backgroundColor:'black', flex:1, alignContent:'center', justifyContent:'center' }}>
      <Text>History screen</Text>
      <Register />
    </View>
  )
}

const styles = StyleSheet.create({})