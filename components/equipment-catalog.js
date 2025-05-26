import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App({ navigation }) {
  const [cardioImage, setCardioImage] = useState(null);
  const [powerImage, setPowerImage] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/trainers/')
      .then(res => res.json())
      .then(data => {
        const cardio = data.filter(t => t.type === 'Кардіотренажер');
        const power = data.filter(t => t.type === 'Силовий тренажер');

        if (cardio.length > 0) {
          const randomCardio = cardio[Math.floor(Math.random() * cardio.length)];
          setCardioImage(randomCardio.images);
        }

        if (power.length > 0) {
          const randomPower = power[Math.floor(Math.random() * power.length)];
          setPowerImage(randomPower.images);
        }
      })
      .catch(error => console.error('Error fetching trainers:', error));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Каталог тренажерів</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Кардіотренажери */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CatalogCardio')}>
          <Image
            source={{ uri: cardioImage }}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Кардіотренажери</Text>
        </TouchableOpacity>

        {/* Силові тренажери */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CatalogPower')}>
          <Image
            source={{ uri: powerImage }}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Силові тренажери</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginLeft: 10,
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
    elevation: 4,
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
  scanButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 30,
    marginTop: -20,
  },
});
