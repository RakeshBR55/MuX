import {Button, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import MerchantPaymentSlip from './MerchantPaymentSlip'
import UserProfile from './UserProfile'
import MerchantPaymentStatus from './MerchantPaymentStatus'


export default function Profile() {
  return (
    <View style={{backgroundColor:'green', flex:1, }}>
      
      <UserProfile />
      {/* <MerchantPaymentSlip /> */}
      {/* <MerchantPaymentStatus /> */}
    </View>
  )
}

const styles = StyleSheet.create({})