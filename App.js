 import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Main from './components/main'
import MainPlanAdd from './components/main-add-plan'

import Reg from './components/reg'
import EquipmentCatalog from './components/equipment-catalog'
import EquipmentCatalogCardio from './components/equipment-catalog-cardio'
import EquipmentCatalogPower from './components/equipment-catalog-power'
import Cardio1 from './components/cardio1'
import Scan from './components/scan'
// import ScanTest from './components/scan-test'
import RegUser from './components/reg-user'
import PlanGeneral from './components/plan-general'
import PlanMan from './components/plan-men'
import PlanWoman from './components/plan-woman'
import Plan1 from './components/plan1'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const GymScan = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="MainPlanAdd"
                screenOptions={{ headerShown: false }}
                >
                <Stack.Screen name="Reg" component={Reg}/>
                <Stack.Screen name="RegUser" component={RegUser}/>
                <Stack.Screen name="Main" component={Main}/>
                <Stack.Screen name="MainPlanAdd" component={MainPlanAdd}/>
                <Stack.Screen name="Catalog" component={EquipmentCatalog}/>
                <Stack.Screen name="CatalogPower" component={EquipmentCatalogPower}/>
                <Stack.Screen name="CatalogCardio" component={EquipmentCatalogCardio}/>
                <Stack.Screen name="Cardio1" component={Cardio1}/>
                <Stack.Screen name="Scan" component={Scan}/>
                {/* <Stack.Screen name="ScanTest" component={ScanTest}/> */}
                <Stack.Screen name="PlanGeneral" component={PlanGeneral}/>
                <Stack.Screen name="PlanMan" component={PlanMan}/>
                <Stack.Screen name="PlanWoman" component={PlanWoman}/>
                <Stack.Screen name="Plan1" component={Plan1}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    
});

export default GymScan;
