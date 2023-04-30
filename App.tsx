import Tabs from './navigation/Tabs'
import MerchantForm from './screens/MerchantForm'
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'
import Login from './screens/Login';
import Register from './screens/Register';
import MerchantHomePage from './screens/MerchantHomePage';
import MerchantPaymentSlip from './screens/MerchantPaymentSlip';
import MerchantPaymentStatus from './screens/MerchantPaymentStatus';
import { AuthState } from './components/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();



export default function App() {
  const { height, width, scale, fontScale } = useWindowDimensions();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token)
      setHasToken(!!token)
      console.log(hasToken)
    };
    getToken();
  }, []);

  if (hasToken) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AuthState>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>

              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen name="MerchantForm" component={MerchantForm} />

              <Stack.Screen name="MerchantHomePage" component={MerchantHomePage} />
              <Stack.Screen name="MerchantPaymentSlip" component={MerchantPaymentSlip} />
              <Stack.Screen name="MerchantPaymentStatus" component={MerchantPaymentStatus} />
              {/* <Stack.Screen name="NotFound" component={NotFoundScreen} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthState>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AuthState>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Tabs" component={Tabs} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthState>
      </SafeAreaView>
    )
  }



}
