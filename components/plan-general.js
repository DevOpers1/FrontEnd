import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const categories = ['Загальний', 'Для жінок', 'Для чоловіків'];

const workouts = [
  { title: 'Розминка'},
  { title: 'Руки та Спина'},
  { title: 'Ноги та Ягодиці'},
];

const WorkoutPlansScreen = ({ navigation }) => (

<View style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={{ flex: 1 }}>   
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Плани тренувань</Text>

        <View style={styles.categories}>
            <TouchableOpacity style={[styles.categoryButton, styles.activeCategory]} onPress={() => navigation.navigate('PlanGeneral')}>
                <Text style={[styles.categoryText, styles.activeCategoryText]}>Загальний</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('PlanWoman')}>
                <Text style={styles.categoryText}>Для жінок</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('PlanMan')}>
                <Text style={styles.categoryText}>Для чоловіків</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.cards}>
            <TouchableOpacity onPress={() => navigation.navigate('Plan1')}>
                <ImageBackground  style={styles.card} imageStyle={styles.cardImage}>
                    <View style={styles.overlay}>
                        <Text style={styles.cardText}>Розминка</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity>
                <ImageBackground  style={styles.card} imageStyle={styles.cardImage}>
                    <View style={styles.overlay}>
                        <Text style={styles.cardText}>Руки та Спина</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity styles={styles.background}>
                <ImageBackground  style={styles.card} imageStyle={styles.cardImage}>
                    <View style={styles.overlay}>
                        <Text style={styles.cardText}>Сідниці та ноги</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </View>
    <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Main')}>
        <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Catalog')}>
        <MaterialCommunityIcons name="dumbbell" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scan')}>
        <Ionicons name="scan" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
        <MaterialCommunityIcons name="calendar-text" size={24} color="#450CE2" onPress={() => navigation.navigate('PlanGeneral')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
    </View> 
</View>

    
);

export default WorkoutPlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  background: {
    backgroundColor: '#dsa4d3',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#35318B',
  },
  categories: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#35318B',
    backgroundColor: 'white',
  },
  activeCategory: {
    backgroundColor: '#35318B',
  },
  categoryText: {
    color: 'black',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: 'white',
  },
  cards: {
    marginTop: 24,
    gap: 16,
  },
  card: {
    backgroundColor: 'black',
    height: 180,
    borderRadius: 40,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  cardImage: {
    borderRadius: 40,
  },
  overlay: {
    padding: 16,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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
