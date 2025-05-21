import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import uk from 'date-fns/locale/uk';

const today = new Date();
const start = startOfWeek(today, { weekStartsOn: 1 });
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
  const [planName, setPlanName] = useState('');
  const [exercises, setExercises] = useState(['']);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  const addExercise = () => {
    setExercises([...exercises, '']);
  };

  const removeExercise = () => {
    if (exercises.length > 0) {
      setExercises(exercises.slice(0, -1));
    }
  };

  const handleExerciseChange = (text, index) => {
    const updated = [...exercises];
    updated[index] = text;
    setExercises(updated);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#35318B' }}>
      <View style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.backBtn} onPress={() => navigation.goBack()}>{'<'}</Text>

        <Text style={styles.dayHeader}>Monday, {format(today, 'd')}</Text>

        <View style={styles.dateSelector}>
          {weekDates.map((date, idx) => {
            const isToday = isSameDay(date, today);
            return (
              <View
                key={idx}
                style={isToday ? styles.activeDate : styles.dateButton}
              >
                <Text style={styles.dayText}>{format(date, 'EEE', { locale: uk })}</Text>
                <Text style={styles.dayNumber}>{format(date, 'd')}</Text>
              </View>
            );
          })}
        </View>

        <TextInput
          style={styles.planInput}
          placeholder="Назва плану"
          placeholderTextColor="#fff"
          value={planName}
          onChangeText={setPlanName}
        />

      </View>

        <ScrollView style={styles.exerciseContainer}>
            <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseLabel}>Назва вправи</Text>
                <TouchableOpacity onPress={addExercise}>
                    <Ionicons name="add-circle" size={27} color="#35318B" />
                </TouchableOpacity>
            </View>

            
            {exercises.map((exercise, idx) => (
            <TextInput
                key={idx}
                style={styles.exerciseInput}
                placeholder={`Вправа ${idx + 1}`}
                value={exercise}
                onChangeText={(text) => handleExerciseChange(text, idx)}
            />
            ))}

        </ScrollView>
        <View style={styles.actionsRow}>
                <View style={styles.deletebtn}>
                    <TouchableOpacity style={{backgroundColor: 'red', borderRadius: 20, padding: 5, }} onPress={removeExercise}>
                        <Ionicons name="trash" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.saveButtonContainer}>
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, }}>Зберегти</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
backBtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: 10,
  },
  dayHeader: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayText: {
    fontSize: 10,
    color: '#585555',
    textAlign: 'center',
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
  planInput: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginBottom: 20,
    paddingVertical: 8,
  },
  exerciseContainer:{
    paddingHorizontal: 16,
    paddingTop: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    height: '70%',
    backgroundColor: '#fff'
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  exerciseInput: {
    backgroundColor: '#E2E2E2',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
  },
  actionsRow: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingBottom: 20,
  },
  deletebtn:{
    alignItems: 'flex-end'
  },
  saveButtonContainer:{
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#35318B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 16,
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
