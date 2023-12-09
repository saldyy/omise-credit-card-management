import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLOR } from "../../styles/themes";

type CustomButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  isLoading: boolean;
  title?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textColor?: string;
};

export default ({
  onPress,
  isLoading,
  title,
  color,
  style,
  textStyle,
  textColor = "#fff",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      disabled={isLoading}
      style={[
        styles.appButtonContainer,
        { backgroundColor: color || COLOR.PRIMARY },
        style,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.appButtonText, textStyle, { color: textColor }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
