import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import { COLORS, SIZES, FONTS } from "../constants";

const TextIconButton = ({
  label,
  icon,
  containerStyle,
  labelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, labelStyle]}>{label}</Text>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default TextIconButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  text: { marginRight: SIZES.base, ...FONTS.h2 },
  icon: { width: 25, height: 25 },
});
