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

import { TextButton } from "../";

const PlacesFlatList = ({
  COUNTRIES_ITEM_SIZE,
  countriesScrollX,
  places,
  PLACES_ITEM_SIZE,
  EMPTY_PLACE_ITEM_SIZE,
  placesScrollX,
  handlePlacesChange,
  handleExploreClick,
}) => {
  const isIOS = Platform.OS === "ios";
  const length = places.length;

  return (
    <View style={{ height: isIOS ? 500 : 450 }}>
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={places}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ alignItems: "center" }}
        snapToAlignment='center'
        snapToInterval={isIOS ? PLACES_ITEM_SIZE + 28 : PLACES_ITEM_SIZE}
        scrollEventThrottle={16}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: placesScrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const position = (
            event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE
          ).toFixed(0);
          handlePlacesChange(position);
        }}
        renderItem={({ item, index }) => {
          const isFirstItem = index === 0;
          const isLastItem = index === length - 1;
          let activeHeight = 0;
          if (isIOS) {
            if (SIZES.height > 800) activeHeight = SIZES.height / 2;
            else activeHeight = SIZES.height / 1.65;
          } else activeHeight = SIZES.height / 1.8;

          const opacity = placesScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const height = placesScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE,
            ],
            outputRange: [
              SIZES.height / 2.25,
              activeHeight,
              SIZES.height / 2.25,
            ],
            extrapolate: "clamp",
          });

          if (isFirstItem || isLastItem) {
            return <View style={{ width: EMPTY_PLACE_ITEM_SIZE }} />;
          }

          return (
            <Animated.View
              opacity={opacity}
              style={[styles.container, { width: PLACES_ITEM_SIZE, height }]}
            >
              <Image
                source={item.image}
                resizeMode='cover'
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
                <TextButton
                  label='Explore'
                  containerStyle={{
                    position: "absolute",
                    bottom: -20,
                    width: 150,
                    backgroundColor: COLORS.white,
                  }}
                  onPress={handleExploreClick}
                />
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default PlacesFlatList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginHorizontal: SIZES.padding,
  },
  nameText: {
    marginBottom: SIZES.radius,
    color: COLORS.white,
    ...FONTS.h1,
  },
  descriptionText: {
    marginBottom: SIZES.padding * 2,
    textAlign: "center",
    color: COLORS.white,
    ...FONTS.body3,
  },
});
