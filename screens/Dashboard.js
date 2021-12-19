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
} from "react-native";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";

const Dashboard = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Dashboard</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Place")}>
        <Text>Navigate to Place</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
