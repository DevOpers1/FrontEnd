import React from 'react';
import { StyleSheet } from 'react-native';
import Main from './components/main';
import MainPlanAdd from './components/main-add-plan';

import Reg from './components/reg';
import EquipmentCatalog from './components/equipment-catalog';
import EquipmentCatalogCardio from './components/equipment-catalog-cardio';
import EquipmentCatalogPower from './components/equipment-catalog-power';
import Cardio1 from './components/cardio1';
import Scan from './components/scan';
import ScanTest from './components/scan-test';
import RegUser from './components/reg-user';
import PlanGeneral from './components/plan-general';
import PlanMan from './components/plan-men';
import PlanWoman from './components/plan-woman';
import Plan1 from './components/plan1';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// === DEEP LINKING CONFIGURATION ===
const linking = {
  prefixes: ['myapp://'], // 👈 Замініть на власний URI, якщо потрібно
  config: {
    screens: {
      Cardio1: 'Cardio1', // 👈 Дозволяє відкривати через myapp://Cardio1?t_id=5
      // (Інші екрани можна додати сюди також, якщо плануєте deep link далі)
    },
  },
};

const Stack = createNativeStackNavigator();

const GymScan = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Reg" component={Reg} />
        <Stack.Screen name="RegUser" component={RegUser} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="MainPlanAdd" component={MainPlanAdd} />
        <Stack.Screen name="Catalog" component={EquipmentCatalog} />
        <Stack.Screen name="CatalogPower" component={EquipmentCatalogPower} />
        <Stack.Screen name="CatalogCardio" component={EquipmentCatalogCardio} />
        <Stack.Screen name="Cardio1" component={Cardio1} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="ScanTest" component={ScanTest} />
        <Stack.Screen name="PlanGeneral" component={PlanGeneral} />
        <Stack.Screen name="PlanMan" component={PlanMan} />
        <Stack.Screen name="PlanWoman" component={PlanWoman} />
        <Stack.Screen name="Plan1" component={Plan1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default GymScan;
