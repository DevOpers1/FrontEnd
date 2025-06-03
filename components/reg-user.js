import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegistrationScreen = ({ navigation }) => {
  const [email] = useState('example@email.com');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username || !age || !weight || !height) {
      setError('Будь ласка, заповніть всі поля.');
      return;
    }
    setError('');
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Зареєструватися</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={email}
          editable={false}
          placeholder="E-mail"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Ім'я користувача"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Вік"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Вага"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Зріст"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        
        <Text style={styles.errorText}>{error}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Підтвердити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#322c8b',
    marginBottom: 80,
  },
  formContainer: {
    backgroundColor: '#35318B',
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 70,
    marginTop: 20,
  },
  buttonText: {
    color: '#35318B',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default RegistrationScreen;