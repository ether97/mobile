import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import React from "react";
import "../assets/maroon.jpg";

const { width, height } = Dimensions.get("window");

const colors = ["black.jpg", "white.jpg", "gray.jpg", "maroon.jpg", "blue.jpg"];

const images = [
  {
    help: (
      <Image
        source={require("../assets/black.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      />
    ),
  },
  {
    shop: (
      <Image
        source={require("../assets/gray.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      />
    ),
  },
  {
    home: (
      <Image
        source={require("../assets/maroon.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      />
    ),
  },
  {
    urbanear: (
      <Image
        source={require("../assets/white.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      />
    ),
  },
];

const data = Object.entries(images).map(([key, value], index) => ({
  title: key,
  image: value,
  key: index,
}));

const Tab = ({ item }: { item: (typeof data)[0] }) => {
  return (
    <View>
      <Text style={{ color: "white" }}>{item.label}</Text>
    </View>
  );
};

const Tabs = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View style={{ position: "absolute", top: 100, left: 30 }}>
      <View style={{ gap: 20 }}>
        {data.map((item) => {
          return <Tab key={item.label} item={item} />;
        })}
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{ width, height }}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        horizontal
        keyExtractor={(data) => data.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              {item.img}
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: "rgba(1,1,1,0.5)" },
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
