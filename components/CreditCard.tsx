import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import WelcomeScreen from './WelcomeScreen'
import PrimaryCard from './PrimaryCard'
import SecondaryCard from './SecondaryCard'


export default function CreditCard() {
    

    return (
        <ScrollView>
            <SafeAreaView style={styles.centeredView}>
                <WelcomeScreen />
                <PrimaryCard />
                <SecondaryCard />
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})