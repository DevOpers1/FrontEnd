// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Головна сторінка</Text>
      <Button
        title="Перейти на Деталі"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
