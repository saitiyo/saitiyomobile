import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import IonIcons from "@react-native-vector-icons/ionicons";

import colors from "../../constants/colors";

interface Props {
  title: string;
  subtitle: string;
  icon: string;
  onPress: () => void;
}

const QuickActionCard = ({
  title,
  subtitle,
  icon,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <IonIcons
          name={icon as any}
          size={24}
          color={colors.primary}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
};

export default QuickActionCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.gray50,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.gray100,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textGray,
    lineHeight: 18,
  },
});