import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { G, Path } from 'react-native-svg';

const GoogleLogo = (props) => (
    <Svg viewBox="-3 0 262 262" {...props}>
      <G id="SVGRepo_iconCarrier">
        <Path
          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
          fill="#4285F4"
        />
        <Path
          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
          fill="#34A853"
        />
        <Path
          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
          fill="#FBBC05"
        />
        <Path
          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
          fill="#EB4335"
        />
      </G>
    </Svg>
  );

const GymScan = ({navigation}) => {
    return (
        <LinearGradient colors={['#B8BEE6', '#5C65A1']} style={styles.container}>
            <Image source={require('../assets/LogoGymscan.png')} style={styles.logo} />
            
            <View style={styles.nameContainer}>
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.appName}>GymScan</Text>
            </View>
            
            <Text style={styles.lowerName}>Ваш планер тренувань у спортзалі</Text>
            
            <TouchableOpacity style={styles.googleBtn} onPress={() => navigation.navigate('RegUser')}>
                <GoogleLogo style={styles.googleBtnImg}/>
                <Text style={styles.googleBtnText}>Continue with Google</Text>
            </TouchableOpacity>
        </LinearGradient>
);
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
        paddingVertical: 20,
        paddingHorizontal: 40,
    },
    googleBtnImg: {
        width: 18,
        height: 18,
    },
    googleBtnText: {
        marginLeft: 10,
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default GymScan;
