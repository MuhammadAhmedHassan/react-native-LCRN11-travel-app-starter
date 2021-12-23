import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";

import { RenderPlace, RenderMap } from "../components/Place";

const Place = () => {
  const selectedPlace = useRoute().params?.selectedPlace;

  if (!selectedPlace) return null;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <RenderPlace selectedPlace={selectedPlace} />
      <RenderMap />
    </View>
  );
};

export default Place;
