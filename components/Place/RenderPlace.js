import React, { useRef, useState } from "react";
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
import { HeaderBar, TextIconButton } from "../";

const RenderPlace = ({ selectedPlace }) => {
  const navigation = useNavigation();
  const { image, name, rate, description } = selectedPlace;
  return (
    <ImageBackground
      source={image}
      style={{
        width: "100%",
        height: "100%",
      }}
      resizeMode='cover'
    >
      <HeaderBar
        leftOnPress={() => navigation.goBack()}
        containerStyle={{ marginTop: SIZES.padding }}
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          justifyContent: "flex-end",
          marginBottom: 100,
        }}
      >
        {/* Name & Rating */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.largeTitle,
            }}
          >
            {name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                marginRight: 5,
                color: COLORS.white,
                ...FONTS.h3,
              }}
            >
              {rate}
            </Text>
            <Image source={icons.star} style={{ width: 20, height: 20 }} />
          </View>
        </View>

        {/* Description */}
        <Text
          style={{
            marginTop: SIZES.base,
            color: COLORS.white,
            ...FONTS.body3,
          }}
        >
          {description}
        </Text>

        {/* Text Icon button  */}
        <TextIconButton
          label='Book a flight'
          icon={icons.aeroplane}
          containerStyle={{ marginTop: SIZES.padding }}
          onPress={() => console.log("Book a flight")}
          labelStyle={{}}
        />
      </View>
    </ImageBackground>
  );
};

export default RenderPlace;

const styles = StyleSheet.create({});
