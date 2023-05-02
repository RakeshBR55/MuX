import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();


import { NavigationContainer } from '@react-navigation/native';
import History from '../screens/History'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Cards from '../screens/Cards';




export default function Tabs() {
  

  return (
    <Tab.Navigator
      labeled={false}
      initialRouteName="Home"
      activeColor="#e32f45"
      inactiveColor="#3e2465"
      barStyle={{
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        height: 80,
        borderRadius: 20,
        position: 'absolute',
        shadowColor: '#7F5DF0',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.5,
        elevation: 5,


      }}

    >
      <Tab.Screen options={{

        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', }}>
            <Image
              source={require('../assets/profile.png')}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                top: 5,
                tintColor: focused ? '#e32f45' : '#748c94'
              }}
            />
            <Text className="font-bold" style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, width: 40, left: 4, top: 3 }}>Profile</Text>
            
          </View>
        )
      }} name="Profile" component={Profile} />


      <Tab.Screen options={{

        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <Image
              source={require('../assets/home.png')}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,

                tintColor: focused ? '#e32f45' : '#748c94'

              }}
            />
            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, width: 40, left: 4, top: 3 }}>Home</Text>
          </View>
        )
      }} name="Home" component={Home} />

      <Tab.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <Image
              source={require('../assets/cards.png')}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                overlayColor: focused ? '#e32f45' : '#748c94'
              }}
            />
            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, width: 40, left: 4, top: 3 }}>Cards</Text>
          </View>
        )
      }} name="History" component={Cards} />
      <Tab.Screen options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', }}>
            <Image
              source={require('../assets/cards.png')}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                overlayColor: focused ? '#e32f45' : '#748c94'
              }}
            />
            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, width: 40, left: 4, top: 3 }}>Payments</Text>
          </View>
        )
      }} name="Payments" component={History} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 5.5,
    elevation: 5,
    ShadowColor: 'black',
    overflow: 'hidden'

  },

})