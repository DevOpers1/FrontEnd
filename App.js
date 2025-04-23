import React from 'react';
import { StyleSheet, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Main from './components/main'
import Reg from './components/reg'
import EquipmentCatalog from './components/equipment-catalog'
import EquipmentCatalogCardio from './components/equipment-catalog-cardio'
import EquipmentCatalogPower from './components/equipment-catalog-power'
import Cardio1 from './components/cardio1'
import Scan from './components/scan'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const GymScan = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Reg"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Reg" component={Reg}/>
                <Stack.Screen name="Main" component={Main}/>
                <Stack.Screen name="Catalog" component={EquipmentCatalog}/>
                <Stack.Screen name="CatalogPower" component={EquipmentCatalogPower}/>
                <Stack.Screen name="CatalogCardio" component={EquipmentCatalogCardio}/>
                <Stack.Screen name="Cardio1" component={Cardio1}/>
                <Stack.Screen name="Scan" component={Scan}/>


            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    
});

export default GymScan;
