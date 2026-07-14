import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@react-native-vector-icons/ionicons";

import colors from "../../constants/colors";

interface ErrorStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn't load the requested information. Please try again.",
  buttonText = "Try Again",
  onRetry,
}: ErrorStateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name="cloud-offline-outline"
          size={60}
          color={colors.gray300}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      {onRetry && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={onRetry}
        >
          <Icon
            name="refresh-outline"
            size={18}
            color={colors.white}
          />

          <Text style={styles.buttonText}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: colors.gray50,
  },

  iconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray100,
    marginBottom: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textGray,
    textAlign: "center",
    marginBottom: 28,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    height: 50,
    borderRadius: 12,
  },

  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 8,
  },
});