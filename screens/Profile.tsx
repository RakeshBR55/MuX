import {Button, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import PrimaryCard from '../components/PrimaryCard'
import Login from './Login'

export default function Profile() {
  return (
    <View style={{backgroundColor:'green', flex:1, }}>
      
      <Login />
    </View>
  )
}

const styles = StyleSheet.create({})