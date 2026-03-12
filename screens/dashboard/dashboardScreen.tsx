import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import colors from '../../constants/Colors';
import HeadingText from '../../components/HeadingText';
import BodyText from '../../components/BodyText';
import Spacer from '../../components/Spacer/Spacer';
import Icon from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.authSlice);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.white }}
      contentContainerStyle={styles.container}
    >
      {/* top card */}
      <View
        style={{
          width: '100%',
          height:150,
          backgroundColor: colors.black,
          borderRadius: 10,
          padding: 10,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <HeadingText text="Hi" textStyles={{ color: colors.white }} />

          <HeadingText
            text={user && user.firstName ? user.firstName : ''}
            textStyles={{ color: '#767676', fontSize: 24 }}
          />

        </View>
        <View>
          {/* <CustomButton
            title="View Public Profile"
            onPress={() =>
              (navigation as any).navigate('ArtistDetailScreen', {
                artistAccountId: artist?.id,
              })
            }
          /> */}
        </View>
      </View>

      <Spacer height={20} />

      <View style={styles.section}>
        <HeadingText
          text="Quick Actions"
          textStyles={{ fontSize: 18, color: colors.black }}
        />
        <Spacer height={10} />
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => (navigation as any).navigate('UpdateProfileHome')}
          >
            <Icon name="create-outline" size={28} color={colors.primary} />
            <Text style={styles.quickActionText}>Work on Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => (navigation as any).navigate('AddPictures')}
          >
            <Icon name="images-outline" size={28} color={colors.primary} />
            <Text style={styles.quickActionText}>Go to Team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => (navigation as any).navigate('AddMinimumBookingFee')}
          >
            <Icon name="cash-outline" size={28} color={colors.primary} />
            <Text style={styles.quickActionText}>Upload Document</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Spacer height={30} />

      <View style={styles.section}>
        <HeadingText
          text="My Stats"
          textStyles={{ fontSize: 18, color: colors.black }}
        />
        <Spacer height={10} />
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              100
            </Text>
            <Text style={styles.statLabel}>Inventory</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              50
            </Text>
            <Text style={styles.statLabel}>Team</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              5
            </Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>
        </View>
      </View>

      <Spacer height={30} />

      <View style={styles.section}>
        <HeadingText
          text="Recent Tasks"
          textStyles={{ fontSize: 18, color: colors.black }}
        />
        <Spacer height={10} />
        <BodyText
          text="You have no recent tasks."
          textStyles={{ color: colors.gray400 }}
        />
        {/* You can add a FlatList here for real booking data */}
      </View>

      <Spacer height={40} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: colors.white,
  },
  headerCard: {
    backgroundColor: colors.gray100,
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.gray200,
  },
  section: {
    backgroundColor: colors.gray100,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionText: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 6,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 13,
    color: colors.gray500,
    marginTop: 2,
  },
});

export default DashboardScreen;
