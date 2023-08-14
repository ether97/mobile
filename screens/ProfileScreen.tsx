import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  FlatList,
} from "react-native";
import data from "../data";

const { width, height } = Dimensions.get("window");
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Item = ({
  imageUri,
  heading,
  description,
}: {
  imageUri: any;
  heading: string;
  description: string;
}) => {
  return (
    <View style={styles.itemStyle}>
      <Image source={imageUri} style={[styles.imageStyle]} />
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ width: 5, backgroundColor: "black" }} />
        <View style={styles.textContainer}>
          <Text style={[styles.heading]}>{heading}</Text>
          <Text style={[styles.description]}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

const Pagination = () => {
  return (
    <View style={styles.pagination}>
      {data.map((item) => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, { backgroundColor: item.color }]}
            />
          </View>
        );
      })}
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View>
      <StatusBar hidden style="auto" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => <Item {...item} />}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      <Image
        style={styles.logo}
        source={require("../assets/ue_black_logo.png")}
      />
      <Pagination />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: "-90deg" },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
  itemStyle: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: width * 0.75,
    height: height * 0.75,
    resizeMode: "contain",
    flex: 0.5,
  },
  textContainer: {
    // flex: 0.5,
    // width: width * 0.6,
    // maxWidth: 250,
    // marginRight: 50,
    // alignSelf: "flex-end",
  },
  heading: {},
  description: {},
  pagination: {
    position: "absolute",
    right: 20,
    bottom: 40,
    flexDirection: "row",
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
});
