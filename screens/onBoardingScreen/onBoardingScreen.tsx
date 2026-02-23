import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import CustomButton from '../../components/CustomBotton/CustomButton';

const { height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const autoSwipeRef:any = useRef(null);
  const timerRef:any = useRef(null);

  const slides = [
    {
      backgroundColor: 'transparent',
      image: (
        <ImageBackground
          source={require('../../assets/images/onboardingimgone.png')}
          style={styles.backgroundImage}
        >
          {/* <View style={styles.imageOverlay}>
            <Text style={styles.emoji}>🏗️</Text>
            <Text style={styles.imageTitle}>Project Overview</Text>
          </View> */}
        </ImageBackground>
      ),
      title: 'Site Management Made Simple',
      subtitle: 'Track projects, materials, and teams in real-time',
    },
    {
      backgroundColor: 'transparent',
      image: (
        <ImageBackground
          source={require('../../assets/images/onboardingbgone.png')}
          style={styles.backgroundImage}
        >
          {/* <View style={styles.imageOverlay}>
            <Text style={styles.emoji}>📊</Text>
            <Text style={styles.imageTitle}>Progress Tracking</Text>
          </View> */}
        </ImageBackground>
      ),
      title: 'Real-Time Progress Tracking',
      subtitle: 'Monitor timelines, budgets, and milestones on the go',
    },
    {
      backgroundColor: 'transparent',
      image: (
        <ImageBackground
          source={require('../../assets/images/onboardingbgone.png')}
          style={styles.backgroundImage}
        >
          {/* <View style={styles.imageOverlay}>
            <Text style={styles.emoji}>👷</Text>
            <Text style={styles.imageTitle}>Team Collaboration</Text>
          </View> */}
        </ImageBackground>
      ),
      title: 'Team Collaboration',
      subtitle: 'Connect with workers, managers, and subcontractors',
    },
  ];

  // Enhanced auto-swipe with pause on touch
  useEffect(() => {
    let isPaused = false;
    let currentIndex = 0;
    const AUTO_SWIPE_INTERVAL = 4000;

    const swipeNext = () => {
      if (!isPaused && autoSwipeRef.current) {
        const nextIndex = (currentIndex + 1) % slides.length;
        autoSwipeRef.current.goToPage(nextIndex, true);
        currentIndex = nextIndex;
      }
    };

    timerRef.current = setInterval(swipeNext, AUTO_SWIPE_INTERVAL);

    // Pause auto-swipe on touch
    const pauseAutoSwipe = () => {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
      }, 5000); // Resume after 5 seconds of inactivity
    };

    // You can attach this to touch events
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleDone = async () => {
    try {
    //   await AsyncStorage.setItem('@viewedOnboarding', 'true');
    //   navigation.replace('MainApp');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };


  // Custom Dot component
  const Dot = ({ selected }:{selected:any}) => (
    <View style={[styles.dot, selected && styles.dotSelected]} />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <Onboarding
        
        ref={autoSwipeRef}
        pages={slides}
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        bottomBarHeight={120}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        containerStyles={styles.onboardingContainer}
        // imageContainerStyles={styles.imageContainer}
        showDone={false}
        showNext={false}
        showSkip={false}
        DotComponent={Dot}
        showPagination={true}
        transitionAnimationDuration={400}
      />

      <View style={{width:"100%",paddingHorizontal:20}}>
        <CustomButton
        title='Get Started'
        onPress={()=>{}}
        customStyles={{backgroundColor:"white",marginBottom:10}}
        textStyles={{color:"black"}}
        
       />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  onboardingContainer: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 70,
    marginBottom: 10,
  },
  imageTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  imageContainer: {
    paddingBottom: 0,
    height: height * 0.3,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom:4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 24,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginLeft: 20,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 20,
  },
  nextText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doneText: {
    color: '#1a237e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  dotSelected: {
    width: 30,
    backgroundColor: '#ffffff',
  },
});

export default OnboardingScreen;