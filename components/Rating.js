import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { icons } from "../constants";

const Rating = ({ containerStyle, rate }) => {
  return (
    <View style={{ flexDirection: "row", ...containerStyle }}>
      {Array(rate)
        .fill(0)
        .map((_, idx) => (
          <Image
            key={`full-${idx}`}
            source={icons.star}
            resizeMode='cover'
            style={{ marginLeft: idx === 0 ? 0 : 5, width: 15, height: 15 }}
          />
        ))}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({});
