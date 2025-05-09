import React from 'react';
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
import { Svg, Path } from 'react-native-svg';


const ArrowIcon = ({ style }) => (
    <Svg style={style} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
        fill="white"
      />
    </Svg>
  );
  

export default function App({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Заголовок з іконкою назад */}
      <View style={styles.header}>
        <Text style={styles.title} onPress={() => navigation.goBack()}>{'<'}</Text>

        <Text style={styles.title}>Каталог тренажерів</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Power1')}>
          <Image
            source={{ uri: 'https://i.imgur.com/NxF7V1J.png' }}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Тренажер сміта</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Image
            source={{ uri: 'https://i.imgur.com/EQwD8j7.png' }}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Жим ногами</Text>
        </View>

        <View style={styles.card}>
          <Image
            source={{ uri: 'https://i.imgur.com/NxF7V1J.png' }}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Тяга верхнього блоку</Text>
        </View>

        <View style={styles.card}>
          <Image
            source={{ uri: 'https://i.imgur.com/NxF7V1J.png' }}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Гіперкстанзія</Text>
        </View>

        <View style={styles.card}>
          <Image
            source={{ uri: 'https://i.imgur.com/NxF7V1J.png' }}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Трицепс-бруси</Text>
        </View>

        <View style={styles.card}>
          <Image
            source={{ uri: 'https://i.imgur.com/NxF7V1J.png' }}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Гравітрон</Text>
        </View>

        
      </ScrollView>

      {/* Нижнє меню */}
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
              <TouchableOpacity style={styles.navItem}>
                <MaterialCommunityIcons name="calendar-text" size={24} color="#000" onPress={() => navigation.navigate('PlanGeneral')}/>
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
    shadowOffset: { width: 4, height: 4 },
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
    maxWidth: 180,
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
