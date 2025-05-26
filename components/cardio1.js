import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

export default function TreadmillScreen({ route, navigation }) {
  const { trainer } = route.params;
  const [exercise, setExercise] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // 0: image, 1: video

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/exercises/${trainer.trainer_id}/`)
      .then(res => res.json())
      .then(data => setExercise(data))
      .catch(error => console.error('Error fetching exercise:', error));
  }, [trainer.trainer_id]);

  const toggleMedia = () => {
    setShowVideo(!showVideo);
    Animated.timing(animation, {
      toValue: showVideo ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const translateXImage = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  const translateXVideo = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.mediaContainer}>
          <Animated.View style={[styles.slide, { transform: [{ translateX: translateXImage }] }]}>
            <Image
              source={{ uri: trainer.images }}
              style={styles.image}
              resizeMode="contain"
            />
          </Animated.View>

          {exercise?.video_link && (
            <Animated.View style={[styles.slide, { transform: [{ translateX: translateXVideo }] }]}>
              <Video
                source={{ uri: exercise.video_link }}
                useNativeControls
                resizeMode="contain"
                shouldPlay
                style={styles.video}
              />
            </Animated.View>
          )}
        </View>

        {exercise?.video_link && (
          <TouchableOpacity style={styles.videoArrow} onPress={toggleMedia}>
            <Ionicons
              name={showVideo ? 'arrow-back-circle-outline' : 'play-circle-outline'}
              size={36}
              color="#000"
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>{trainer.name}</Text>

          <View style={styles.tags}>
            {trainer.muscle_activity.split(',').map((activity, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{activity.trim()}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Опис тренажера</Text>
          <View style={styles.list}>
            <Text style={styles.techText}>{trainer.description}</Text>
          </View>

          <Text style={styles.sectionTitle}>Інструкція до вправи</Text>
          <View style={styles.instructionBox}>
            <Text style={styles.instructionTitle}>{exercise?.name || 'Назва недоступна'}</Text>
            <Text style={styles.instrText}>{exercise?.instructions || 'Немає інструкції'}</Text>
            <Text style={styles.goalTitle}>Основна мета:</Text>
            <Text style={styles.goalText}>{exercise?.purpose || 'Немає опису мети'}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Main')}>
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Catalog')}>
          <MaterialCommunityIcons name="dumbbell" size={24} color="#450CE2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('Scan')}>
          <Ionicons name="scan" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PlanGeneral')}>
          <MaterialCommunityIcons name="calendar-text" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  fixedHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    position: 'relative',
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 16,
    zIndex: 20,
  },
  headerText: {
    fontSize: 28,
    color: '#000',
  },
  mediaContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  slide: {
    width: width,
    height: 200,
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: 200,
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
  },
  videoArrow: {
    position: 'absolute',
    top: 100,
    right: 20,
    zIndex: 30,
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    backgroundColor: '#392783',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#000',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  list: {
    marginBottom: 20,
  },
  techText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  instrText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 6,
  },
  instructionBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  instructionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  goalTitle: {
    color: '#392783',
    fontWeight: 'bold',
    marginTop: 10,
  },
  goalText: {
    color: '#333',
    fontSize: 13,
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
