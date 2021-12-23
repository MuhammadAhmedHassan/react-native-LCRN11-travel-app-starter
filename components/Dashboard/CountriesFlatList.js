import React, { useState } from "react";
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

const CountriesFlatList = ({
  COUNTRIES_ITEM_SIZE,
  countriesScrollX,
  countries,
  handleCountriesChange,
}) => {
  const isIOS = Platform.OS === "ios";
  const length = countries.length;

  return (
    <View>
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment='center'
        snapToInterval={COUNTRIES_ITEM_SIZE}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        data={countries}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: countriesScrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          // Calculate position
          const position = (
            event.nativeEvent.contentOffset.x / COUNTRIES_ITEM_SIZE
          ).toFixed(0);
          handleCountriesChange(position);
        }}
        renderItem={({ item, index }) => {
          const isFirstItem = index === 0;
          const isLastItem = item === length - 1;
          const opacity = countriesScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const mapSize = countriesScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE,
            ],
            outputRange: [25, isIOS ? 80 : 60, 25],
            extrapolate: "clamp",
          });
          const fontSize = countriesScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE,
            ],
            outputRange: [15, 25, 15],
            extrapolate: "clamp",
          });

          if (isFirstItem || isLastItem) {
            return <View style={{ width: COUNTRIES_ITEM_SIZE }} />;
          }

          return (
            <Animated.View
              opacity={opacity}
              style={{
                height: 130,
                width: COUNTRIES_ITEM_SIZE,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.Image
                source={item.image}
                resizeMode='contain'
                style={{
                  width: mapSize,
                  height: mapSize,
                  tintColor: COLORS.white,
                }}
              />
              <Animated.Text
                style={{
                  marginTop: 3,
                  color: COLORS.white,
                  ...FONTS.h1,
                  fontSize,
                }}
              >
                {item.name}
              </Animated.Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default CountriesFlatList;

const styles = StyleSheet.create({});
