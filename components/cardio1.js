import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TreadmillScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Верхня частина зображення (нерухома) */}
      <View style={styles.fixedHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>{'<'}</Text>
        </TouchableOpacity>
        <Image
            source={{ uri: 'https://i.imgur.com/NxF7V1J.png' }}
            style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Прокручуваний контент */}
      <ScrollView style={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Бігова доріжка</Text>

          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>квадрицепс</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>підколінні сухожилля</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Техніка виконання</Text>
          <View style={styles.list}>
            <Text style={styles.techText}>1. Встаньте на бокові платформи, оберіть швидкість і почніть рух із ходьби.</Text>
            <Text style={styles.techText}>2. Тримайте спину рівною, не нахиляйтесь вперед.</Text>
            <Text style={styles.techText}>3. Приземляйтесь на середню частину стопи, а не на п’яти чи пальці.</Text>
            <Text style={styles.techText}>4. Руки рухаються природно, уникайте опори на поручні.</Text>
          </View>

          <Text style={styles.sectionTitle}>Інструкція до вправи</Text>
          <View style={styles.instructionBox}>
            <Text style={styles.instructionTitle}>Ходьба <Text style={styles.speedText}>(4–6 км/год)</Text></Text>
            <Text style={styles.instrText}>1. Починайте з низької швидкості</Text>
            <Text style={styles.instrText}>2. Тримайте спину прямо</Text>
            <Text style={styles.instrText}>3. Руки природно рухаються.</Text>
            <Text style={styles.goalTitle}>Основна мета:</Text>
            <Text style={styles.goalText}>Легка розминка, покращення кровообігу, активація основних м’язів.</Text>
          </View>
        </View>
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
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    position: 'relative',
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 16,
    zIndex: 20,
  },
  headerText: {
    fontSize: 28,
    color: '#000',
  },
  image: {
    width: '80%',
    height: 200,
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    backgroundColor: '#392783',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#000',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  list: {
    marginBottom: 20,
  },
  techText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  instrText: {
    color: '#fffff',
    fontSize: 14,
    marginBottom: 6,
  },
  instructionBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  instructionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  speedText: {
    color: '#555',
    fontSize: 12,
  },
  goalTitle: {
    color: '#392783',
    fontWeight: 'bold',
    marginTop: 10,
  },
  goalText: {
    color: '#333',
    fontSize: 13,
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
