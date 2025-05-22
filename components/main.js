import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import uk from 'date-fns/locale/uk'; // українська локалізація

const activities = [
  {
    name: 'Груди + Трицепс',
    trainings: ['Жим лежачи', 'Французький жим', 'Віджимання на брусах'],
  },
  {
    name: 'das',
    trainings: ['asd'],
  },
];
const today = new Date();
const start = startOfWeek(today, { weekStartsOn: 1 }); // понеділок

const weekDates = Array.from({ length: 7 }, (_, i) => addDays(start, i));

export default function GymScanScreen({ navigation }) {
  const quotes = [
    "Ти не станеш сильнішим, сидячи на дивані.",
    "Біль — це тимчасово. Слава — назавжди.",
    "Кожне повторення — крок до нової версії тебе.",
    "Ти не змагаєшся з іншими. Ти змагаєшся з учорашнім собою.",
    "Втома — це не кінець. Це початок результату.",
    "Якщо не зараз — то коли?",
    "Твій мозок здається раніше, ніж твоє тіло. Не слухай його.",
    "Кожна дія — це шанс на перемогу.",
    "Твоє майбутнє — це вибір, який ти робиш сьогодні.",
    "Рельєф не дають дарма — його виборюють.",
    "Коли всі здаються — ти тільки починаєш."
  ];

  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/LogoGymscan.png')} style={styles.logoImage} />
            <Text style={styles.logo}>GymScan</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>
            {format(today, 'EEEE, d', { locale: uk })}
          </Text>
        </View>

        <View style={styles.dateSelector}>
          {weekDates.map((date, idx) => {
            const isToday = isSameDay(date, today);
            return (
              <TouchableOpacity
                key={idx}
                style={isToday ? styles.activeDate : styles.dateButton}
              >
                <Text style={styles.dayText}>{format(date, 'EEE', { locale: uk })}</Text>
                <Text style={styles.dayNumber}>{format(date, 'd')}</Text>
              </TouchableOpacity>
            );
          })}
        </View>



        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>{quote || "Натхнення в дорозі..."}</Text>
        </View>


        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>Планер тренувань</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MainPlanAdd')}>
            <Ionicons name="add"  color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {activities.map((activity, idx) => (
            <View key={idx} style={styles.exerciseContainer}>
              <View style={styles.exerciseCard}>
                <View style={styles.exerciseTitleBox}>
                  <Text style={styles.exerciseTitleText}>{activity.name}</Text>
                </View>
               <View style={styles.trainingRow}>
                {activity.trainings.map((training, tIdx) => (
                  <Text key ={tIdx} style={styles.trainingText}>{tIdx + 1}. {training}</Text>
                ))}
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
          <MaterialCommunityIcons name="calendar-text" size={24} color="#000" onPress={() => navigation.navigate('PlanGeneral')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    fontSize: 9,
    textAlign: 'center',
    color: '#585555',
  },
  dayNumber: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#585555',
  },
  dateButton: {
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5400FD',
    height: 44,
    width: 40,
    alignItems: 'center',
  },
  activeDate: {
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5400FD',
    backgroundColor: '#DFCBFF',
    height: 44,
    width: 40,
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
    borderColor: '#FDFDFD',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  quoteText: {
    color: '#35318B',
    fontSize: 16,
    fontWeight: '500',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
  addButton: {
    width: 25,
    height: 25,
    backgroundColor: '#35318B',
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
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#FDFDFD',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  exerciseTitleBox: {
    alignItems: 'center',
    marginBottom: 6,
  },
  exerciseTitleText: {
    fontSize: 16,
    fontWeight:600,
    color: '#000',
  },
  trainingRow:{
    alignItems: 'flex-start',
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

