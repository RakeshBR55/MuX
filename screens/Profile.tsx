import {Button, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import MerchantPaymentSlip from './MerchantPaymentSlip'
import UserProfile from './UserProfile'
import MerchantPaymentStatus from './MerchantPaymentStatus'
import Login from './Login'
import Register from './Register'
import MerchantForm from './MerchantForm'
import PrimaryCard from '../components/PrimaryCard'


export default function Profile() {
  return (
    <View style={{backgroundColor:'black', flex:1, }}>
      <UserProfile />
      {/* <MerchantPaymentSlip /> */}
      {/* <MerchantPaymentStatus /> */}
      {/* <Login /> */}
      {/* <MerchantForm /> */}
      {/* <PrimaryCard /> */}
    </View>
  )
}

const styles = StyleSheet.create({})