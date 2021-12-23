import React, { useRef, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

import {
  dummyData,
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
} from "../../constants";
import { CountriesFlatList, PlacesFlatList } from "./";

const COUNTRIES_ITEM_SIZE = SIZES.width / 3;
const PLACES_ITEM_SIZE =
  Platform.OS === "ios" ? SIZES.width / 1.25 : SIZES.width / 1.2;
const EMPTY_PLACE_ITEM_SIZE = (SIZES.width - PLACES_ITEM_SIZE) / 2;

const CountriesAndPlacesSection = () => {
  const isIOS = Platform.OS === "ios";
  const navigation = useNavigation();
  const countriesScrollX = useRef(new Animated.Value(0)).current;
  const placesScrollX = useRef(new Animated.Value(0)).current;

  const [countries] = useState([
    { id: -1 },
    ...dummyData.countries,
    { id: -2 },
  ]);
  const [places, setPlaces] = useState([
    { id: -1 },
    ...dummyData.countries[0].places,
    { id: -2 },
  ]);
  const [placesScrollPosition, setPlacesScrollPosition] = useState(0);

  const handleCountriesChange = (position) => {
    setPlaces([
      { id: -1 },
      ...dummyData.countries[position].places,
      { id: -2 },
    ]);
  };
  const handlePlacesChange = (position) => {
    setPlacesScrollPosition(position);
  };
  const handleExploreClick = () => {
    // Get the places current index
    const currentIndex = parseInt(placesScrollPosition, 10) + 1;
    // Navigate to the next screen
    console.log("selectedPlace:", places[currentIndex]);
    navigation.navigate("Place", { selectedPlace: places[currentIndex] });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: isIOS ? 40 : 0,
      }}
    >
      <View style={{ height: 700 }}>
        {/* Countries Flatlist */}
        <CountriesFlatList
          COUNTRIES_ITEM_SIZE={COUNTRIES_ITEM_SIZE}
          countriesScrollX={countriesScrollX}
          countries={countries}
          handleCountriesChange={handleCountriesChange}
        />
        {/* Places Flatlist */}
        <PlacesFlatList
          COUNTRIES_ITEM_SIZE={COUNTRIES_ITEM_SIZE}
          countriesScrollX={countriesScrollX}
          places={places}
          PLACES_ITEM_SIZE={PLACES_ITEM_SIZE}
          EMPTY_PLACE_ITEM_SIZE={EMPTY_PLACE_ITEM_SIZE}
          placesScrollX={placesScrollX}
          handlePlacesChange={handlePlacesChange}
          handleExploreClick={handleExploreClick}
        />
      </View>
    </ScrollView>
  );
};

export default CountriesAndPlacesSection;
