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
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

export default function TreadmillScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // Якщо deep link: route.params.t_id. Якщо навігація внутрішня: теж можна передавати t_id.
  const { t_id } = route.params || {}; // якщо нічого не передали, буде undefined

  
  const [trainer, setTrainer] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const [play, setPlay] = useState(false);

  // 1) Завантажуємо дані тренажера за t_id
  useEffect(() => {
    if (!t_id) return;

    fetch(`http://192.168.1.6:8000/api/trainers/${t_id}/`)
      .then(res => res.json())
      .then(data => {
        setTrainer(data);
        return data.trainer_id; // якщо API повертає trainer_id всередині, але зазвичай t_id = trainer_id
      })
      .then((trainerId) => {
        // доки нема конкретного маршруту вправи — можемо завантажити за тим самим trainer_id
        return fetch(`http://192.168.1.6:8000/api/exercises/${t_id}/`);
      })
      .then(res => res.json())
      .then(data => setExercise(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [t_id]);

  const toggleMedia = () => {
    const newShowVideo = !showVideo;
    setShowVideo(newShowVideo);
    setPlay(newShowVideo);
    Animated.timing(animation, {
      toValue: newShowVideo ? 1 : 0,
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

  const getYouTubeVideoId = (url) => {
    const match = url?.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };
  const youtubeVideoId = getYouTubeVideoId(exercise?.video_link);

  // Якщо даних тренера ще немає — показуємо просто текст-завантаження
  if (!trainer) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Завантаження даних тренажера…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.mediaContainer}>
          <Animated.View style={[styles.slide, { transform: [{ translateX: translateXImage }] }]}>
            <Image source={{ uri: trainer.images }} style={styles.image} resizeMode="contain" />
          </Animated.View>

          {youtubeVideoId && (
            <Animated.View style={[styles.slide, { transform: [{ translateX: translateXVideo }] }]}>
              <YoutubePlayer
                height={Dimensions.get('window').width * 9 / 16}
                videoId={youtubeVideoId}
                play={showVideo}
              />
            </Animated.View>
          )}

          {youtubeVideoId && (
            <>
              {!showVideo ? (
                <TouchableOpacity style={[styles.arrowButton, { right: 20 }]} onPress={toggleMedia}>
                  <Text style={styles.arrowText}>{'>'}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[styles.arrowButton, { left: 20 }]} onPress={toggleMedia}>
                  <Text style={styles.arrowTextWhite}>{'<'}</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>

      <View style={styles.flexContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
              <Text style={styles.instructionTitle}>
                {exercise?.name || 'Назва недоступна'}
              </Text>
              <Text style={styles.instrText}>
                {exercise?.instructions || 'Немає інструкції'}
              </Text>
              <Text style={styles.goalTitle}>Основна мета:</Text>
              <Text style={styles.goalText}>
                {exercise?.purpose || 'Немає опису мети'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Main')}
        >
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Catalog')}
        >
          <MaterialCommunityIcons name="dumbbell" size={24} color="#450CE2" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('Scan')}
        >
          <Ionicons name="scan" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('PlanGeneral')}
        >
          <MaterialCommunityIcons name="calendar-text" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="account-outline" size={24} color="#000" />
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
    top: 10,
    left: 25,
    zIndex: 20,
  },
  flexContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    backgroundColor: '#392783',
  },
  headerText: {
    fontSize: 28,
    color: '#000',
  },
  mediaContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  slide: {
    width: width,
    aspectRatio: 16 / 9,
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: 200,
  },
  arrowButton: {
    position: 'absolute',
    top: '45%',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 28,
    color: '#000',
    lineHeight: 28,
  },
  arrowTextWhite: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 28,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
