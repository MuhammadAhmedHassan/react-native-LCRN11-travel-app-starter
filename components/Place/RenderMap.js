import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Animated,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import SlidingUpPanel from "rn-sliding-up-panel";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import { SIZES, FONTS, COLORS, icons } from "../../constants";

import { MapStyle } from "../../styles";
import { HeaderBar, Rating, TextButton } from "..";

const RenderMap = () => {
  const isIOS = Platform.OS === "ios";
  const selectedPlace = useRoute().params?.selectedPlace;
  const navigation = useNavigation();
  const { name, mapInitialRegion, hotels } = selectedPlace;
  let _panel = null;
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [allowDragging, setAllowDragging] = useState(true);

  const _draggedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Listener that will disable panel dragging whenever the mapview is shown
    _draggedValue.addListener((valueObj) => {
      if (valueObj.value > SIZES.height) {
        // map view is currently showing
        setAllowDragging(false);
      }
    });

    return () => {
      _draggedValue.removeAllListeners();
    };
  }, []);

  return (
    <SlidingUpPanel
      ref={(c) => (_panel = c)}
      allowDragging={allowDragging}
      draggableRange={{ top: SIZES.height + 120, bottom: 120 }}
      animatedValue={_draggedValue}
      showBackdrop={false}
      snappingPoints={[SIZES.height + 120]}
      height={SIZES.height + 120}
      friction={0.7}
      onBottomReached={() => setAllowDragging(true)}
    >
      <View style={styles.container}>
        {/* Panel header */}
        <View style={styles.panelHeaderContainer}>
          <Image
            source={icons.up_arrow}
            style={{ width: 20, height: 20, tintColor: COLORS.white }}
          />
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
            SWIPE FOR DETAILS
          </Text>
        </View>

        {/* Panel detail */}
        <View style={styles.panelDetailsContainer}>
          <MapView
            style={{ width: "100%", height: "100%" }}
            provider={PROVIDER_GOOGLE}
            initialRegion={mapInitialRegion}
            customMapStyle={MapStyle}
          >
            {hotels.map((hotel, index) => {
              const icon =
                selectedHotel?.id === hotel.id ? icons.bed_on : icons.bed_off;
              return (
                <Marker
                  key={index}
                  coordinate={hotel.latlng}
                  identifier={hotel.id}
                  onPress={() => setSelectedHotel(hotel)}
                >
                  <Image
                    source={icon}
                    resizeMode='contain'
                    style={{ width: 50, height: 50 }}
                  />
                </Marker>
              );
            })}
          </MapView>
          {/* Header */}
          <HeaderBar
            title={name}
            leftOnPress={() => _panel?.hide()}
            right={true}
            containerStyle={styles.headerContainer}
          />

          {/* Hotel Details */}
          {!!selectedHotel && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsHeading}>Hotels in {name}</Text>

              <View style={styles.cardContainer}>
                <Image
                  source={selectedHotel?.image}
                  resizeMode='cover'
                  style={{ width: 90, height: 120, borderRadius: 15 }}
                />

                <View
                  style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {selectedHotel?.name}
                  </Text>
                  <Rating
                    containerStyle={{ marginTop: SIZES.base }}
                    rate={selectedHotel?.rate}
                  />
                  <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
                    <TextButton
                      label='Details'
                      containerStyle={{
                        marginTop: SIZES.base,
                        height: 45,
                        width: 100,
                      }}
                      labelStyle={FONTS.h3}
                      onPress={() => console.log("details")}
                    />
                    <View
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.lightGray,
                          ...FONTS.body5,
                          fontSize: isIOS ? SIZES.body4 : SIZES.body5,
                        }}
                      >
                        from ${selectedHotel?.price} / night
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </SlidingUpPanel>
  );
};

export default RenderMap;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginTop: SIZES.radius,
    padding: SIZES.radius,
    borderRadius: 15,
    backgroundColor: COLORS.transparentBlack1,
  },
  container: { flex: 1, backgroundColor: "transparent" },
  panelHeaderContainer: {
    height: 120,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  panelDetailsContainer: {
    flex: 1,
    // backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: { position: "absolute", top: SIZES.padding * 2 },
  detailsHeading: { color: COLORS.white, ...FONTS.h1 },
  detailsContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    padding: SIZES.radius,
  },
});
