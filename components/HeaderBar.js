import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { icons, COLORS, SIZES, FONTS } from "../constants";

const HeaderBar = ({ title, leftOnPress, right, containerStyle }) => {
  const renderButton = (icon, onPress, showIcon) => (
    <TouchableOpacity
      style={[
        styles.btn,
        { backgroundColor: showIcon ? COLORS.transparentBlack : null },
      ]}
      onPress={onPress}
    >
      {showIcon && (
        <Image source={icon} style={styles.icon} resizeMode='contain' />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Back Button */}
      {renderButton(icons.left_arrow, leftOnPress, true)}

      {/* Title */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>

      {/* Settings */}
      {renderButton(icons.settings, undefined, right)}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
  },
  textContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { color: COLORS.white, ...FONTS.h3 },
  icon: { tintColor: COLORS.white, height: 20, width: 20 },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
