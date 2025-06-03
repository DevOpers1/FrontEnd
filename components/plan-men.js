import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Масив категорій (за потреби можна зробити динамічним)
const categories = ['Загальний', 'Для жінок', 'Для чоловіків'];

const WorkoutPlansScreen = ({ navigation }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // **ТУТ виправлено URL** (без подвійного http://)
  const API_URL = 'http://192.168.1.6:8000/api/plans/';

  useEffect(() => {
    // Під час монтування робимо запит
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // data — масив планів з полями: plan_id, name, description, goal, training_frequency, notes, images
        // Фільтруємо лише ті, що мають plan_id 1, 2 або 3
        const filtered = data.filter((plan) =>
          [4].includes(plan.plan_id)
        );
        setPlans(filtered);
      })
      .catch((error) => {
        console.error('Error fetching plans:', error);
        Alert.alert('Помилка', 'Не вдалося завантажити плани. Спробуйте пізніше.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Плани тренувань</Text>

          {/* Секція категорій (приклад незмінний) */}
          <View style={styles.categories}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigation.navigate('PlanGeneral')}
            >
              <Text style={styles.categoryText}>Загальний</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigation.navigate('PlanWoman')}
            >
              <Text style={styles.categoryText}>Для жінок</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.categoryButton,  styles.activeCategory]}
              onPress={() => navigation.navigate('PlanMan')}
            >
              <Text style={[styles.categoryText, styles.activeCategoryText]}>Для чоловіків</Text>
            </TouchableOpacity>
          </View>

          {/* Якщо дані ще завантажуються */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#35318B" />
            </View>
          )}

          {/* Після завантаження — список карток планів */}
          {!loading && plans.length === 0 && (
            <View style={styles.loadingContainer}>
              <Text>Плани не знайдено.</Text>
            </View>
          )}

          {!loading && plans.length > 0 && (
            <View style={styles.cards}>
              {plans.map((plan) => (
                <TouchableOpacity
                  key={plan.plan_id}
                  onPress={() => navigation.navigate('Plan1', { planId: plan.plan_id })}
                >
                  <ImageBackground
                    source={{ uri: plan.images }}
                    style={styles.card}
                    imageStyle={styles.cardImage}
                  >
                    <View style={styles.overlay}>
                      <Text style={styles.cardTitle}>{plan.name}</Text>

                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Нижня навігація */}
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
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PlanGeneral')}>
          <MaterialCommunityIcons name="calendar-text" size={24} color="#450CE2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutPlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
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
  loadingContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  cards: {
    marginTop: 24,
    gap: 16,
  },
  card: {
    backgroundColor: 'black',
    height: 200,
    borderRadius: 20,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  cardImage: {
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: 6,
  },
  cardInfo: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
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
