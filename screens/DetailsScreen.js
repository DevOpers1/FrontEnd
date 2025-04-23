// screens/DetailsScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailsScreen({ navigation }) {
  return (
    <View>
      <Text>Сторінка з деталями</Text>
      <Button title="Назад" onPress={() => navigation.goBack()} />
    </View>
  );
}
