import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@react-native-vector-icons/ionicons";

import TeamStatCard from "../../components/TeamStatCard/TeamStatCard";
import TeamMemberCard from "../../components/TeamMemberCard/TeamMemberCard";

// colors
import colors from "../../constants/colors";
import { screenNames } from "../../navigation/screenNames";

const mockMembers = [
  {
    id: "1",
    name: "Kintu Musa",
    role: "Project Manager",
    status: "Clocked In",
    time: "03 Apr 2025 • 07:35",
  },
  {
    id: "2",
    name: "Sarah Nakato",
    role: "Site Engineer",
    status: "Clocked In",
    time: "03 Apr 2025 • 07:20",
  },
  {
    id: "3",
    name: "Brian Okello",
    role: "Safety Officer",
    status: "Clocked Out",
    time: "03 Apr 2025 • 17:30",
  },
];

const TeamHomeScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("Clocked In");

  const filteredMembers = mockMembers.filter(
    member => member.status === activeTab
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Team Overview</Text>

      <Text style={styles.subtitle}>
        View clock-in status and navigate to team members.
      </Text>

      <View style={styles.statsContainer}>
        <TeamStatCard
          title="Team Members"
          value={120}
          icon="people-outline"
          color={colors.primary}
          bgColor={colors.gray100}
        />

        <TeamStatCard
          title="Support Team"
          value={50}
          icon="shield-checkmark-outline"
          color={colors.primary}
          bgColor={colors.gray100}
        />
      </View>

      <TeamStatCard
        title="Members On Site"
        value={36}
        icon="location-outline"
        color={colors.success}
        bgColor={colors.gray100}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screenNames.TeamMembersScreen)}
      >
        <Text style={styles.buttonText}>
          Go To Team Members
        </Text>

        <Icon
          name="chevron-forward"
          size={18}
          color={colors.white}
        />
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Clocked In" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("Clocked In")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Clocked In" &&
                  styles.activeTabText,
              ]}
            >
              Clocked In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Clocked Out" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("Clocked Out")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Clocked Out" &&
                  styles.activeTabText,
              ]}
            >
              Clocked Out
            </Text>
          </TouchableOpacity>
        </View>

        {filteredMembers.map(member => (
          <TeamMemberCard
            key={member.id}
            name={member.name}
            role={member.role}
            status={member.status as any}
            time={member.time}
          />
        ))}
        
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.gray50,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textDark,
  },

  subtitle: {
    marginTop: 4,
    marginBottom: 20,
    fontSize: 14,
    color: colors.textGray,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.gray100,
  },

  tabs: {
    flexDirection: "row",
    marginBottom: 16,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray200,
  },

  activeTab: {
    borderBottomColor: colors.primary,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray300,
  },

  activeTabText: {
    color: colors.primary,
  },

  button: {
    marginTop: 20,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
});

export default TeamHomeScreen;