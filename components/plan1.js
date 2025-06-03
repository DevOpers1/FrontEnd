import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WarmUpScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { planId } = route.params || {}; // Якщо нічого не передали – буде undefined

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Без подвійного http://
  const API_URL = `http://192.168.1.6:8000/api/plans/${planId}/`;

  useEffect(() => {
    if (!planId) {
      Alert.alert('Помилка', 'Не передано planId');
      setLoading(false);
      return;
    }

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // data має вигляд:
        // {
        //   name, description, goal, training_frequency, notes, image, exercises: [ { exercise_name, number_of_repetitions }, … ]
        // }
        setPlan(data);
      })
      .catch((error) => {
        console.error('Error fetching plan detail:', error);
        Alert.alert('Помилка', 'Не вдалося завантажити деталі плану');
      })
      .finally(() => setLoading(false));
  }, [planId]);

  // Поки йде завантаження – показуємо індикатор
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#35318B" />
      </View>
    );
  }

  // Якщо після завантаження у нас нічого немає – повідомимо
  if (!plan) {
    return (
      <View style={styles.loadingContainer}>
        <Text>План не знайдено.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Верхня частина зображення з кнопкою назад */}
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Image
          source={{uri: plan.image}}
          style={styles.headerImage}
        />
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{plan.name}</Text>
          <Text style={styles.text}>{plan.description}</Text>

          {plan.notes ? (
            <Text style={styles.note}>
              <Text style={styles.noteHighlight}>Примітка: </Text>
              {plan.notes}
            </Text>
          ) : null}

          {plan.goal ? (
            <Text style={styles.goal}>
              <Text style={styles.goalBold}>Ціль: </Text>
              {plan.goal}
            </Text>
          ) : null}

          <Text style={styles.sectionTitle}>Комплекс вправ</Text>

          {/* Динамічне рендерення вправ */}
          {plan.exercises && plan.exercises.length > 0 ? (
            plan.exercises.map((item, index) => (
              <View key={index} style={styles.card}>
                {/* Якщо у вас є іконка або мініатюра для кожної вправи, сюди можна вставити <Image source={…} /> */}
                <TouchableOpacity style={styles.cardContent}  onPress={() => navigation.navigate('Cardio1', { t_id: item.exercise_id })}>
                  <Text style={styles.cardTitle}>{item.exercise_name}</Text>
                  <Text style={styles.cardSubtitle}>
                    <Text style={styles.bold}>К-сть повторів: </Text>
                    {item.number_of_repetitions}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Вправи не знайдено.</Text>
          )}

          <Text style={styles.trainingNote}>
            <Text style={styles.bold}>Графік тренувань: </Text>
            {plan.training_frequency} раз(и) на тиждень
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
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  backButtonText: {
    fontSize: 28,
    color: '#000',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
      fontSize: 18,
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
    fontSize: 18,
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
