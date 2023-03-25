import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs'

export default function App() {
  return (
    
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    

  );
}

const styles = StyleSheet.create({});
