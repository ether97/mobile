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
const MARGIN_TOP = 200;
const IMAGE_WIDTH = width * 0.75;
const IMAGE_HEIGHT = height * 0.5;

const Item = ({
  scrollY,
  index,
  item,
}: {
  scrollY: Animated.Value;
  index: number;
  item: (typeof data)[0];
}) => {
  const inputRange = [
    (index - 1) * height,
    index * height,
    (index + 1) * height,
  ];
  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
  });
  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.imageUri}
        style={[styles.imageStyle, { transform: [{ scale }] }]}
      />
    </View>
  );
};

const ItemColorScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const priceInputRange = [-height * 0.7, 0, height * 0.7];
  const translateY = scrollY.interpolate({
    inputRange: priceInputRange,
    outputRange: [28, 0, -28],
  });
  return (
    <View style={styles.container}>
      <StatusBar hidden style="auto" />
      <Image
        source={require("../assets/ball.jpg")}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.FlatList
        data={data}
        style={{
          paddingTop: MARGIN_TOP,
        }}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * height * 0.5,
            index * height * 0.5,
            (index + 1) * height * 0.5,
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
          });
          const circleScale = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
          });
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
          });
          const circleOpacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.1, 1, 0.1],
          });

          return (
            // <Item scrollY={scrollY} index={index} item={item} />
            <>
              <Animated.View
                style={[
                  {
                    backgroundColor: item.color,
                    height: 100,
                    width: 100,
                    position: "absolute",
                    borderRadius: 100,
                    top: 150,
                    left: 100,
                  },
                  {
                    transform: [{ scale: circleScale }],
                    opacity: circleOpacity,
                  },
                ]}
              />
              <Animated.Image
                source={item.imageUri}
                style={[
                  styles.imageStyle,
                  {
                    transform: [{ scale }],
                    opacity,
                    marginBottom: index === data.length - 1 ? 400 : 0,
                  },
                ]}
              />
            </>
          );
        }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <View
        style={{
          overflow: "hidden",
          height: 20,
          position: "absolute",
          bottom: 270,
          alignSelf: "center",
        }}
      >
        <Animated.View
          style={[
            {
              transform: [{ translateY }],
            },
          ]}
        >
          {data.map((item, index) => {
            return (
              <Text
                key={item.heading}
                style={{
                  fontSize: 20,
                  lineHeight: 20,
                  fontWeight: "500",
                  color: "rgba(1,1,1,1)",
                  textAlign: "center",
                  letterSpacing: 20,
                  textTransform: "uppercase",
                }}
              >
                {item.type}
              </Text>
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
};

export default ItemColorScreen;

const styles = StyleSheet.create({
  container: {
    width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    // overflow: "hidden",
    // paddingTop: 50,
    // marginTop: MARGIN_TOP,
  },
  imageStyle: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    // marginTop: MARGIN_TOP,
    resizeMode: "contain",
    // backgroundColor: "orange",
    // marginBottom: 20,
    alignSelf: "center",
    // flex: 1,
  },
});
