import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'

export default function Cards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.9:1337/api/auth/card/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        
        setCards(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
 
  return (
    <View style={{flex:1, backgroundColor:'green', }}>
      <Text>Cards:</Text>
      <View>
        {cards.map(card => (
          <View key={card.id}>
            <Text>{card.title}</Text>
            <Text>{card.description}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})