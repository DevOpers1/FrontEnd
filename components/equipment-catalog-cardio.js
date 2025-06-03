import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, SafeAreaView,
  ScrollView, StatusBar, TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App({ navigation }) {
  const [cardioTrainers, setCardioTrainers] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.6:8000/api/trainers/')
      .then(res => res.json())
      .then(data => {
        console.log('API data:', data); // <- Додай це
        const cardioOnly = data.filter(trainer => trainer.type === 'Кардіотренажер');
        setCardioTrainers(cardioOnly);
      })
      .catch(error => console.error('Error fetching trainers:', error));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title} onPress={() => navigation.goBack()}>{'<'}</Text>
        <Text style={styles.title}>Каталог тренажерів</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {cardioTrainers.map((trainer, index) => (
          <TouchableOpacity key={index} style={styles.card}
            onPress={() => navigation.navigate('Cardio1', { t_id: trainer.trainer_id })}>
            <Image
              source={{ uri: trainer.images }}  
              style={styles.cardImage}
              resizeMode="contain"
            />
            <Text style={styles.cardText}>{trainer.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Main')}>
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Catalog')}>
          <MaterialCommunityIcons name="dumbbell" size={24} color="#450CE2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scan')}>
          <Ionicons name="scan" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PlanGeneral')}>
          <MaterialCommunityIcons name="calendar-text" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const SIDE_PADDING = 20;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#35318B',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  titlePic: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  container: {
    paddingHorizontal: SIDE_PADDING,
    paddingBottom: 100,
  },
  card: {
    marginTop: 25,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // тільки для Android
  },
  cardImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
  },
  scanButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 30,
    marginTop: -20,
  },
});
