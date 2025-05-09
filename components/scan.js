import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ScanScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Основний вміст — QR Сканер */}
      <View style={styles.content}>
        <Text style={styles.title}>Скануйте свій QR Code</Text>
        <View style={styles.qrFrame}>
          {/* Тут буде камера або зображення з рамкою */}
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
        </View>

        <TouchableOpacity style={styles.scanActionButton}>
          <Ionicons name="scan" size={35} color="#fff" />
          <Text style={styles.scanActionText}>Скануйте QR Code</Text>
        </TouchableOpacity>
      </View>

      {/* Нижня навігаційна панель */}
      <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Main')}>
                      <Ionicons name="home-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Catalog')}>
                      <MaterialCommunityIcons name="dumbbell" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scan')}>
                      <Ionicons name="scan" size={28} color="#450CE2" />
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
      flex: 1,
      backgroundColor: '#fff',
    },
  
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
  
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: '#450CE2',
      marginBottom: 70,
    },
  
    qrFrame: {
      width: 250,
      height: 250,
      borderWidth: 1,
      borderColor: 'transparent',
      position: 'relative',
      marginBottom: 40,
    },
  
    cornerTopLeft: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 30,
      height: 30,
      borderLeftWidth: 4,
      borderTopWidth: 4,
      borderColor: 'black',
    },
    cornerTopRight: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 30,
      height: 30,
      borderRightWidth: 4,
      borderTopWidth: 4,
      borderColor: 'black',
    },
    cornerBottomLeft: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 30,
      height: 30,
      borderLeftWidth: 4,
      borderBottomWidth: 4,
      borderColor: 'black',
    },
    cornerBottomRight: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 30,
      height: 30,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderColor: 'black',
    },
  
    scanActionButton: {
      marginTop: 40,
      flexDirection: 'row',
      backgroundColor: '#450CE2',
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 20,
      alignItems: 'center',
    },
  
    scanActionText: {
      color: '#fff',
      fontSize: 26,
      fontWeight: 400,
      marginLeft: 10,
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
  
