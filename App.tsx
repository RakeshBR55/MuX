import Tabs from './navigation/Tabs'
import MerchantForm from './screens/MerchantForm'
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'
import Login from './screens/Login';
import Register from './screens/Register';
import MerchantHomePage from './screens/MerchantHomePage';
import MerchantPaymentSlip from './screens/MerchantPaymentSlip';
import MerchantPaymentStatus from './screens/MerchantPaymentStatus';

const Stack = createStackNavigator();

export default function App() {
  const { height, width, scale, fontScale } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="MerchantForm" component={MerchantForm} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="MerchantHomePage" component={MerchantHomePage} />
          <Stack.Screen name="MerchantPaymentSlip" component={MerchantPaymentSlip} />
          <Stack.Screen name="MerchantPaymentStatus" component={MerchantPaymentStatus} />
          
          <Stack.Screen name="NotFound" component={NotFoundScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

function NotFoundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Error: Page Not Found</Text>
    </View>
  )
}

const styles = StyleSheet.create({});
