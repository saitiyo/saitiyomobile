import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from '../../components/CustomButton/CustomButton';
import colors from '../../constants/colors'; 
import { useAppDispatch } from '../../redux/store';
import { setOnBoardingStatus } from '../../redux/features/auth.features';

const OnBoarding = () => {
  const dispatch = useAppDispatch();
  
  const statusBarHeight = StatusBar.currentHeight || 0;
  const isAndroid = Platform.OS === 'android';
  const topPadding = isAndroid ? statusBarHeight + 30 : 50;

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('@viewedOnboarding', 'true');
      dispatch(setOnBoardingStatus(false)); 
    } catch (error) {
      console.error("Error saving onboarding status", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent={isAndroid} 
      />
      
      <ImageBackground
        source={require('../../assets/images/onboardingimg.png')}
        resizeMode="cover"
        style={styles.background}
      >
        {/* ✅ NEW: Dark overlay to ensure your white text is always readable */}
        <View style={styles.overlay} />

        <View style={[styles.content, { paddingTop: topPadding }]}>
          
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={3}>
              Manage Your Construction Sites On The Go
            </Text>
            <Text style={styles.subtitle}>
              Track projects, manage teams, and oversee materials in real-time.
            </Text>
          </View>

          {/* Action Section */}
          <CustomButton
            title="Get Started"
            onPress={handleGetStarted}
            customStyles={styles.button}
            textStyles={styles.buttonText}
          />
          
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill, // Covers the entire ImageBackground
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // 45% opacity black
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    maxWidth: '90%',
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: colors.white,
    lineHeight: 46,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray200,
    marginTop: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.black,
    fontWeight: '600',
  },
});

export default OnBoarding;