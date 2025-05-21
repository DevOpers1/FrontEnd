// QRScanner.js

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import Ionicons from "react-native-vector-icons/Ionicons";

const QRScanner = ({ onRead, style }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Отримуємо задню камеру (back camera)
  const device = useCameraDevice("back");
  
  // Налаштування сканера QR-кодів
  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        console.log("onCodeScanned codes:", codes);
        console.log("onCodeScanned value:", codes[0].value);
        onRead(codes[0].value);
      }
    },
  });

  useEffect(() => {
    // Щоб примусово оновити сканер при зміні пристрою або дозволів
    setRefresh((prev) => !prev);
  }, [device, hasPermission]);

  useEffect(() => {
    // Запит дозволу на камеру при монтуванні
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      console.log("Camera.requestCameraPermission:", permission);
      setHasPermission(permission === "granted");
    };
    requestCameraPermission();

    // Якщо протягом 15 секунд нічого не відскановано, закриваємо сканер
    const timer = setTimeout(() => {
      onRead(null);
    }, 15 * 1000);

    return () => clearTimeout(timer);
  }, []);

  // Якщо пристрій ще не готовий або немає дозволу — показуємо повідомлення
  if (device == null || !hasPermission) {
    return (
      <View style={[styles.unavailableContainer, style]}>
        <Text style={styles.unavailableText}>
          Camera not available or not permitted
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.scannerContainer, style]}>
      {/* Камера, яка заповнює весь простір */}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />

      {/* Кнопка «назад» зверху */}
      <View style={styles.backHeader}>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => onRead(null)}
        >
          <Ionicons name="arrow-back-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Нижня панель з кнопкою «Close» */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => onRead(null)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  unavailableContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#00000080",
    alignItems: "center",
    justifyContent: "center",
  },
  unavailableText: {
    color: "white",
    fontSize: 16,
  },
  scannerContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
  backHeader: {
    backgroundColor: "#00000090",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "100%",
  },
  footer: {
    backgroundColor: "#00000090",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  closeButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
  },
});