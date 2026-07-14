import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "@react-native-vector-icons/ionicons";

interface Props {
  title: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

const TeamStatCard = ({
  title,
  value,
  icon,
  color,
  bgColor,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <Icon name={icon as any} size={22} color={color} />
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1D23",
  },
  title: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },
});

export default TeamStatCard;