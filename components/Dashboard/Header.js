import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";

import {
  dummyData,
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
} from "../../constants";

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Side Drawer */}
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => console.log("Side Drawer")}
      >
        <Image
          source={icons.side_drawer}
          resizeMode='contain'
          style={styles.icon}
        />
      </TouchableOpacity>
      {/* Label/Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>EUROPE</Text>
      </View>

      {/* Profile */}
      <TouchableOpacity onPress={() => console.log("profile")}>
        <Image
          source={images.profile_pic}
          resizeMode='contain'
          style={styles.profilePic}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    alignItems: "center",
  },
  btnContainer: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});
