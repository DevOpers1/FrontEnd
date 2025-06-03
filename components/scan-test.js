// ScanScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const FRAME_SIZE = 250; // Розмір квадратного фрейму для сканера

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // вибираємо задню камеру
  const device = useCameraDevice('back');

  // Налаштування code scanner для QR-кодів
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        const qrValue = codes[0].value;
        console.log('QR-код зчитано:', qrValue);
        Alert.alert('QR-код зчитано', qrValue, [
          {
            text: 'ОК',
            onPress: () => {
              // Після натискання ОК зупиняємо сканування
              setIsScanning(false);
            },
          },
        ]);
      }
    },
  });

  // Запит прав на камеру при завантаженні екрану
  useEffect(() => {
    const getPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    };
    getPermission();
  }, []);

  // Якщо камера ще не готова або прав немає
  if (!device || !hasPermission) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Камера недоступна або не дозволена</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Якщо isScanning=true, рендеримо камеру на весь екран */}
      {isScanning && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>Скануйте свій QR Code</Text>

        {/* 
          Панель із кутиками рамки.
          Коли isScanning=false, вона просто намалює порожню рамку.
          Коли isScanning=true, вона накладеться поверх камери. 
        */}
        <View style={styles.qrFrame}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
        </View>

        {/* Кнопка: коли not scanning — фіолетова з чорним текстом/іконою,
            коли isScanning — сіра з чорним текстом/іконою, і disabled */}
        <TouchableOpacity
          style={[
            styles.scanActionButton,
            isScanning ? styles.scanActionButtonDisabled : null,
          ]}
          activeOpacity={isScanning ? 1 : 0.7}
          onPress={() => {
            if (!isScanning) {
              setIsScanning(true);
            }
          }}
          disabled={isScanning}
        >
          <Ionicons
            name="scan"
            size={35}
            color="#000" // завжди чорна іконка
          />
          <Text
            style={[
              styles.scanActionText,
              isScanning ? styles.scanActionTextDisabled : null,
            ]}
          >
            Скануйте QR Code
          </Text>
        </TouchableOpacity>
      </View>

      {/* Нижня навігаційна панель */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Main')}
        >
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Catalog')}
        >
          <MaterialCommunityIcons name="dumbbell" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => {
            if (!isScanning) setIsScanning(true);
          }}
        >
          <Ionicons name="scan" size={28} color="#450CE2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('PlanGeneral')}
        >
          <MaterialCommunityIcons name="calendar-text" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
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

  centered: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#000',
    fontSize: 16,
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
    width: FRAME_SIZE,
    height: FRAME_SIZE,
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
    flexDirection: 'row',
    backgroundColor: '#450CE2', // фіолетовий фон, коли не сканування
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  scanActionButtonDisabled: {
    backgroundColor: '#CCC', // сірий фон, коли скануємо
  },

  scanActionText: {
    color: '#000', // чорний текст
    fontSize: 26,
    fontWeight: '400',
    marginLeft: 10,
  },
  scanActionTextDisabled: {
    color: '#000', // залишаємо текст чорним навіть у disabled
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
