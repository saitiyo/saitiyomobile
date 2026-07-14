import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@react-native-vector-icons/ionicons";

import colors from "../../constants/colors";

interface Props {
  id?: string;

  name: string;

  role: string;

  status: string;

  subtitle: string;

  onPress?: () => void;

  onLongPress?: () => void;
}

const TeamMemberListItem = ({
  name,
  role,
  status,
  subtitle,
  onPress,
  onLongPress,
}: Props) => {
  const initials = name
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const statusColor =
    status === "Active" ||
    status === "Clocked In"
      ? colors.success
      : colors.gray400;

  const statusBackground =
    status === "Active" ||
    status === "Clocked In"
      ? "#EAF8EC"
      : colors.gray100;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.card}
    >
      <View style={styles.avatar}>
        <Text style={styles.initials}>
          {initials}
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text
            numberOfLines={1}
            style={styles.name}
          >
            {name}
          </Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  statusBackground,
              },
            ]}
          >
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    statusColor,
                },
              ]}
            />

            <Text
              style={[
                styles.badgeText,
                {
                  color: statusColor,
                },
              ]}
            >
              {status}
            </Text>
          </View>
        </View>

        <Text style={styles.role}>
          {role}
        </Text>

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Icon
              name="time-outline"
              size={15}
              color={colors.gray400}
            />

            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          </View>

          <Icon
            name="chevron-forward"
            size={18}
            color={colors.gray300}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TeamMemberListItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray100,
    marginBottom: 12,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  initials: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 18,
  },

  body: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
    marginRight: 10,
  },

  role: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textGray,
  },

  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  subtitle: {
    marginLeft: 6,
    fontSize: 12,
    color: colors.gray400,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});