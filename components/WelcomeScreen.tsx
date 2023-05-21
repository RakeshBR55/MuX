import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/card.jpg')}
        style={styles.background}
      >
        <Text style={styles.logo}>MuX</Text>
        <Text style={styles.welcomeText}>Welcome to MuX</Text>
        <Text style={styles.introText}>
          Simplify your payments by using our all-in-one credit card.
        </Text>
      </ImageBackground>
      <View style={styles.bottomMenu}>
        {/* add menu options */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 400
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  introText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
});

export default WelcomeScreen;