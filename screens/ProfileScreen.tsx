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

const Circle = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.6, 0],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              { opacity, transform: [{ scale }], backgroundColor: color },
            ]}
          />
        );
      })}
    </View>
  );
};
const Ticker = ({ scrollX }: { scrollX: Animated.Value }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map(({ type }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Item = ({
  imageUri,
  heading,
  description,
  index,
  scrollX,
}: {
  imageUri: any;
  heading: string;
  description: string;
  index: number;
  scrollX: Animated.Value;
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.6) * width,
    index * width,
    (index + 0.6) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.3, 1, 0.3],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.2, 0, -width * 0.2],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.6, 0, -width * 0.6],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });
  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[styles.imageStyle, { transform: [{ scale }] }]}
      />
      <View
        style={{
          flex: 0.5,
          flexDirection: "row",
          // backgroundColor: "red",
          width: 290,
        }}
      >
        {/* <View style={{ width: 5, backgroundColor: "black", height: "100%" }} /> */}
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.heading,
              { opacity, transform: [{ translateX: translateXHeading }] },
            ]}
          >
            {heading}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.description,
              { opacity, transform: [{ translateX: translateXDescription }] },
            ]}
          >
            {description}
          </Animated.Text>
        </View>
      </View>
    </View>
  );
};

const Pagination = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View style={styles.pagination}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 2) * width,
          index * width,
          (index + 2) * width,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 2, 0.5],
        });
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <Animated.View
              style={[
                styles.paginationDot,
                { transform: [{ scale }], backgroundColor: item.color },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

const ProfileScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View>
      <StatusBar hidden style="auto" />
      <Circle scrollX={scrollX} />
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={scrollX} />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Image
        style={styles.logo}
        source={require("../assets/ue_black_logo.png")}
      />
      <Pagination scrollX={scrollX} />
      <Ticker scrollX={scrollX} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE * 0.8,
    height: CIRCLE_SIZE * 0.8,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    top: 100,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tickerContainer: {
    position: "absolute",
    top: 30,
    left: 30,
    // backgroundColor: "red",
    overflow: "hidden",
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "800",
  },
  logo: {
    opacity: 0.5,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH * 0.9,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    bottom: 10,
    transform: [
      // { translateX: -LOGO_WIDTH / 2 },
      // { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: "-90deg" },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT * 1.6 },
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
    height: height * 0.6,
    resizeMode: "contain",
    flex: 0.5,
    // backgroundColor: "blue",
    marginTop: 60,
  },
  textContainer: {
    // flex: 0.5,
    // width: width * 0.6,
    // maxWidth: 250,
    // marginRight: 50,
    // alignSelf: "flex-end",
  },
  heading: {
    fontSize: 25,
    fontWeight: "700",
    textTransform: "uppercase",
    // textAlign: "center",
    // alignSelf: "flex-start",
  },
  description: {
    color: "rgba(1,1,1,0.6)",
  },
  pagination: {
    position: "absolute",
    right: 30,
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
