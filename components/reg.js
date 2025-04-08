import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GymScan = () => {
    return (
        <LinearGradient colors={['#B8BEE6', '#5C65A1']} style={styles.container}>
            <Image source={require('../assets/LogoGymscan.png')} style={styles.logo} />
            
            <View style={styles.nameContainer}>
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.appName}>GymScan</Text>
            </View>
            
            <Text style={styles.lowerName}>Ваш планер тренувань у спортзалі</Text>
            
            <TouchableOpacity style={styles.googleBtn}>
                <Image 
                    source={{ uri: 'https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg' }}
                    style={styles.googleBtnImg}
                />
                <Text style={styles.googleBtnText}>Continue with Google</Text>
            </TouchableOpacity>
        </LinearGradient>    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        
        marginBottom: 60,
    },
    nameContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 22,
        color: '#303030',
        fontWeight: '800',
    },
    appName: {
        fontSize: 48,
        color: '#011936',
        fontWeight: '800',
    },
    lowerName: {
        fontSize: 15,
        color: '#606060',
        fontWeight: '600',
        marginTop: 5,
    },
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 60,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    googleBtnImg: {
        width: 18,
        height: 18,
        marginRight: 10,
    },
    googleBtnText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default GymScan;
