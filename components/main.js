import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';





const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dateRange = [15, 16, 17, 18, 19, 20, 21];
const activities = [1, 2, 3];

export default function GymScanScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/LogoGymscan.png')} style={styles.logoImage} />
            <Text style={styles.logo}>GymScan</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>{'<'}</Text>
          <Text style={styles.dateLabel}>Monday, 15</Text>
          <Text style={styles.dateLabel}>{'>'}</Text>
        </View>

        <View style={styles.dateSelector}>
          {dateRange.map((day, idx) => (
            <TouchableOpacity key={idx} style={day === 15 ? styles.activeDate : styles.dateButton}>
              <Text style={styles.dayText}>{days[idx]}</Text>
              <Text style={styles.dayNumber}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.weeklyBox}>
          <Text style={styles.weeklyTitle}>Weekly Completion</Text>
          <View style={styles.weeklyCircles}>
            {days.map((label, idx) => (
              <View key={idx} style={styles.weeklyItem}>
                <View style={styles.circle} />
                <Text style={styles.weeklyDay}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>Мотиваційні цитати</Text>
        </View>

        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>Today`s activity</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {activities.map((num) => (
            <View key={num} style={styles.exerciseContainer}>
              <Text style={styles.exerciseNumber}>{num}</Text>
              <View style={styles.exerciseCard}>
                <Text style={styles.exerciseTitle}>Назва вправи</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.link}>категорія</Text>
                  <Text style={styles.link}>м'язи</Text>
                </View>
                <View style={styles.tagRow}>
                  <Text style={styles.tag}>Кількість повторів</Text>
                  <Text style={styles.tag}>Назва тренажера</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
              <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Main')}>
                <Ionicons name="home-outline" size={24} color="#450CE2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Catalog')}>
                <MaterialCommunityIcons name="dumbbell" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scan')}>
                <Ionicons name="scan" size={28} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem}>
                <MaterialCommunityIcons name="arm-flex" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem}>
                <Ionicons name="person-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 45,
    height: 30,
    marginRight: 8,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  dateContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
},

  datePic:{
    width: 15,
    height: 15,
  },

  dateLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  dateButton: {
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5400FD',
    width: 44,
    alignItems: 'center',
  },
  activeDate: {
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5400FD',
    backgroundColor: '#DFCBFF',
    width: 44,
    alignItems: 'center',
  },
  weeklyBox: {
    backgroundColor: '#35318B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  weeklyTitle: {
    color: '#D59C0D',
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 14,
  },
  weeklyCircles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weeklyItem: {
    alignItems: 'center',
  },
  weeklyDay: {
    color: '#D59C0D',
    fontSize: 13,
    marginTop: 4,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  quoteBox: {
    borderWidth: 1,
    borderColor: '#f3a500',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  quoteText: {
    color: '#4d2c91',
    fontSize: 14,
    fontWeight: '500',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#8d85c2',
    borderRadius: 20,
    padding: 6,
  },
  activityList: {
    gap: 12,
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  exerciseNumber: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  exerciseCard: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#1a1a4d',
    borderRadius: 12,
    padding: 10,
  },
  exerciseTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  link: {
    color: '#4d2c91',
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
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

