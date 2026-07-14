import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface Props {
  name: string;
  role: string;
  status: "Clocked In" | "Clocked Out";
  time: string;
}

const TeamMemberCard = ({
  name,
  role,
  status,
  time,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name[0]}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>

      <View>
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                status === "Clocked In"
                  ? "#F0FDF4"
                  : "#F3F4F6",
            },
          ]}
        >
          <Text
            style={{
              color:
                status === "Clocked In"
                  ? "#22C55E"
                  : "#6B7280",
              fontWeight: "600",
            }}
          >
            {status}
          </Text>
        </View>

        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1A1D23",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFF",
    fontWeight: "700",
  },
  name: {
    fontWeight: "700",
    color: "#1A1D23",
  },
  role: {
    color: "#6B7280",
    marginTop: 2,
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  time: {
    marginTop: 4,
    fontSize: 11,
    color: "#9CA3AF",
  },
});

export default TeamMemberCard;