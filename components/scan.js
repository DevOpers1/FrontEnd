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
  Linking, // <-- Додаємо імпорт Linking
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const FRAME_SIZE = 250; // Розмір квадратного фрейму для сканера

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Вибираємо задню камеру
  const device = useCameraDevice('back');

  // Налаштування code scanner для QR-кодів
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async (codes) => {
      if (codes.length > 0) {
        const qrValue = codes[0].value;

        // Зупиняємо сканування одразу, щоб не спрацьовувало кілька разів
        setIsScanning(false);

        // Перевіряємо, чи це валідний URL, і намагаємося відкрити
        try {
          const supported = await Linking.canOpenURL(qrValue);
          if (supported) {
            await Linking.openURL(qrValue);
          } else {
            Alert.alert(
              'Невірний формат',
              'Сканований текст не є дійсним посиланням:\n' + qrValue,
              [{ text: 'ОК' }]
            );
          }
        } catch (error) {
          Alert.alert(
            'Помилка',
            'Не вдалося відкрити посилання:\n' + error.message,
            [{ text: 'ОК' }]
          );
        }
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
      {/* Якщо isScanning = true, рендеримо камеру на весь екран */}
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

        {/* Панель із кутиками рамки */}
        <View style={styles.qrFrame}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
        </View>

        {/* Кнопка «Скануйте QR Code» / «Зупинити сканування» */}
        <TouchableOpacity
          style={[
            styles.scanActionButton,
            isScanning ? styles.scanActionButtonScanning : null,
          ]}
          activeOpacity={0.7}
          onPress={() => {
            // Якщо зараз не скануємо – запускаємо, якщо скануємо – зупиняємо
            setIsScanning(prev => !prev);
          }}
        >
          <Ionicons
            name="scan"
            size={35}
            color={isScanning ? '#000' : '#fff'} // біла за замовчуванням, чорна при скануванні
          />
          <Text
            style={[
              styles.scanActionText,
              isScanning ? styles.scanActionTextScanning : null,
            ]}
          >
            {isScanning ? 'Зупинити сканування' : 'Скануйте QR Code'}
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
            setIsScanning(prev => !prev);
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
    backgroundColor: '#450CE2', // фіолетовий фон, коли не скануємо
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  scanActionButtonScanning: {
    backgroundColor: '#CCC', // сірий фон під час сканування
  },

  scanActionText: {
    color: '#fff', // текст білий за замовчуванням
    fontSize: 26,
    fontWeight: '400',
    marginLeft: 10,
  },
  scanActionTextScanning: {
    color: '#000', // під час сканування текст стає чорним
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
