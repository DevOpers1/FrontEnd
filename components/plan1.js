import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WarmUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Верхня частина зображення з кнопкою назад */}
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://i.imgur.com/NxF7V1J.png' }}
          style={styles.headerImage}
        />
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Розминка</Text>
          <Text style={styles.text}>
            Ця програма підходить кожному, адже спрямована на розігрів тіла перед тренуванням.
          </Text>
          <Text style={styles.note}>
            <Text style={styles.noteHighlight}>Примітка:</Text> рекомендовано виконувати цей план перед кожним тренуванням.
          </Text>
          <Text style={styles.goal}>
            <Text style={styles.goalBold}>Ціль:</Text> розігрів перед тренуванням для меншого ризику отримання травм.
          </Text>

          <Text style={styles.sectionTitle}>Комплекс вправ</Text>

          {/* Карточка: Ходьба */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Cardio1')}>
            <Image  style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Ходьба</Text>
              <Text style={styles.cardSubtitle}>
                <Text style={styles.bold}>К-сть повторів:</Text> 20–30 хв
              </Text>
            </View>
          </TouchableOpacity>

          {/* Карточка: Кардіо */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Cardio1')}>
            <Image  style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Кардіо</Text>
              <Text style={styles.cardSubtitle}>
                <Text style={styles.bold}>К-сть повторів:</Text> інтервального темпу (1 хв повільно, 1 хв швидко)
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.trainingNote}>
            <Text style={styles.bold}>Графік тренувань:</Text> рекомендується виконувати план перед кожним тренуванням.
          </Text>
        </View>
      </ScrollView>

      {/* Нижнє меню */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
          <MaterialCommunityIcons name="dumbbell" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scan')}>
          <Ionicons name="scan" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PlanGeneral')}>
          <MaterialCommunityIcons name="calendar-text" size={24} color="#450CE2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 16,
    zIndex: 10,
  },
  backButtonText:{
    fontSize: 20,
  },
  headerImage: {
    width: '100%',
    height: 180,
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#392783',
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  noteHighlight: {
    color: '#450CE2',
    fontWeight: 'bold',
  },
  goal: {
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
  },
  goalBold: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // для Android
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 12,
    resizeMode: 'contain',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#392783',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  trainingNote: {
    marginTop: 12,
    fontSize: 14,
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
  scanButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 30,
    marginTop: -20,
  },
});