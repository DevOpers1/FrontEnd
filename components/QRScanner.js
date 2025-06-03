// ScanScreen.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Висота/ширина квадратної області для сканування (наприклад 70% ширини екрану)
const SCAN_AREA_SIZE = SCREEN_WIDTH * 0.7;

const ScanScreen = ({ onRead, onClose }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice("back");
  const [isScanning, setIsScanning] = useState(false);

  // Кодсканер налаштований на тип QR
  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        const value = codes[0].value;
        console.log("QR-код зчитано:", value);
        // Повертаємо результат, наприклад, у проп onRead
        onRead(value);
        // Зупиняємо подальше сканування
        setIsScanning(false);
      }
    },
  });

  useEffect(() => {
    // Запит прав на камеру
    const requestPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === "granted");
    };
    requestPermission();
  }, []);

  // Якщо дозвіл не отримано або камера ще не вибрана
  if (!device || !hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Камера недоступна або не дозволена</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Якщо натиснули кнопку "Скануйте QR Code" => показуємо камеру */}
      {isScanning && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      )}

      {/* Темний напівпрозорий фон із «вирізом» під квадрат */}
      {isScanning && <View style={styles.overlay}>
        {/* Верхня частина */}
        <View style={[styles.overlayRow, { height: (SCREEN_HEIGHT - SCAN_AREA_SIZE) / 2 }]} />
        {/* Секція із вирізом посередині */}
        <View style={[styles.overlayRow, { height: SCAN_AREA_SIZE }]}>
          <View style={[styles.overlayBlock, { width: (SCREEN_WIDTH - SCAN_AREA_SIZE) / 2 }]} />
          <View style={styles.transparentWindow} />
          <View style={[styles.overlayBlock, { width: (SCREEN_WIDTH - SCAN_AREA_SIZE) / 2 }]} />
        </View>
        {/* Нижня частина */}
        <View style={[styles.overlayRow, { height: (SCREEN_HEIGHT - SCAN_AREA_SIZE) / 2 }]} />
      </View>}

      {/* Відображаємо верхній підпис завжди */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Скануйте свій QR Code</Text>
      </View>

      {/* Якщо не скануємо, показуємо плейсхолдер (можна поставити статичний зображений QR-код) */}
      {!isScanning && (
        <View style={styles.placeholderContainer}>
          <View style={styles.placeholderFrame}>
            {/* Тут можна вставити статичне SVG/PNG з QR-кодом-джокером,
                але для прикладу просто залишимо пусту білу заливку */}
          </View>
        </View>
      )}

      {/* Кнопка зі скануванням або «Закрити» */}
      <View style={styles.footer}>
        {isScanning ? (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setIsScanning(false);
              onClose && onClose();
            }}
          >
            <Text style={styles.closeButtonText}>Закрити</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setIsScanning(true)}
          >
            <Ionicons
              name="scan-outline"
              size={20}
              color="#FFFFFF"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.scanButtonText}>Скануйте QR Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centered: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "#000",
    fontSize: 16,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7C3AED", // відтінок фіолетового, як у дизайні
  },
  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderFrame: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#00000040",
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
  },
  overlayRow: {
    width: "100%",
    backgroundColor: "#00000080", // чорний напівпрозорий
  },
  overlayBlock: {
    height: "100%",
    backgroundColor: "#00000080",
  },
  transparentWindow: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  footer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  scanButton: {
    flexDirection: "row",
    backgroundColor: "#7C3AED", // фіолетовий фон
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "#00000080",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,ч
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
