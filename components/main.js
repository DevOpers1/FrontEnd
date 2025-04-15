import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dateRange = [15, 16, 17, 18, 19, 20, 21];
const activities = [1, 2, 3];

export default function GymScanScreen() {
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
            <svg style={styles.datePic} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#0F0F0F"></path> </g></svg>
            <Text style={styles.dateLabel}>Monday, 15</Text>
            <svg style={styles.datePic} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#0F0F0F"></path> </g></svg>
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
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#62CDFA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="dumbbell" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton}>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    elevation: 5,
  },
});