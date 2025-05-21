// ScanScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QRScanner from "./QRScanner"; // Імпорт нашого сканера

export default function ScanScreen({ navigation }) {
  const [isScanning, setIsScanning] = useState(false);
  const [qrValue, setQrValue] = useState(null);

  // Обробник натискання на кнопку «Скануйте QR Code»
  const handleOpenScanner = () => {
    setQrValue(null);
    setIsScanning(true);
  };

  // Обробник, який передається в QRScanner і отримує результат
  const handleOnRead = (value) => {
    setIsScanning(false);
    if (value) {
      setQrValue(value);
      // Тут можна відобразити алерт чи зберегти значення, або навігуватись далі
      // Наприклад:
      // Alert.alert("QR Value:", value);
      console.log("Scanned QR value:", value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Якщо йде процес сканування, показуємо модальне вікно з камерою */}
      {isScanning && (
        <QRScanner
          onRead={handleOnRead}
          style={StyleSheet.absoluteFill} // Щоб камера забрала весь екран
        />
      )}

      {/* Основний вміст — QR Сканер */}
      <View style={styles.content}>
        <Text style={styles.title}>Скануйте свій QR Code</Text>

        {/* Якщо вже прочитано QR, показуємо результат */}
        {qrValue && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {"Значення QR:\n" + qrValue}
            </Text>
          </View>
        )}

        {/* Рамка для сканування */}
        <View style={styles.qrFrame}>
          {/* Якщо не сканування, показуємо кутики рамки */}
          {!isScanning && (
            <>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
            </>
          )}
        </View>

        {/* Кнопка для запуску сканування */}
        <TouchableOpacity
          style={styles.scanActionButton}
          onPress={handleOpenScanner}
          disabled={isScanning}
        >
          <Ionicons name="scan" size={35} color="#fff" />
          <Text style={styles.scanActionText}>Скануйте QR Code</Text>
        </TouchableOpacity>
      </View>

      {/* Нижня навігаційна панель */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Main")}
        >
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Catalog")}
        >
          <MaterialCommunityIcons name="dumbbell" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate("Scan")}
        >
          <Ionicons name="scan" size={28} color="#450CE2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("PlanGeneral")}
        >
          <MaterialCommunityIcons
            name="calendar-text"
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#450CE2",
    marginBottom: 30,
    textAlign: "center",
  },

  resultContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },

  resultText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },

  qrFrame: {
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: "transparent",
    position: "relative",
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  cornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: "black",
  },
  cornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: "black",
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderColor: "black",
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "black",
  },

  scanActionButton: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "#450CE2",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },

  scanActionText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "400",
    marginLeft: 10,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },

  navItem: {
    alignItems: "center",
  },

  scanButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 30,
    marginTop: -20,
    elevation: 4, // невеличка тінь для спливання
  },
});
