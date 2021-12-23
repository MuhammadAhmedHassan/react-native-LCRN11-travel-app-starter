import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { COLORS, SIZES, FONTS } from "../constants";

const TextButton = ({ label, containerStyle, labelStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  container: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  text: FONTS.h2,
});
