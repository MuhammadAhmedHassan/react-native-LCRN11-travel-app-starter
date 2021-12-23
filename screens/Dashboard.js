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
import { Header, CountriesAndPlacesSection } from "../components/Dashboard";

const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <Header />

      <CountriesAndPlacesSection />
    </SafeAreaView>
  );
};

export default Dashboard;
