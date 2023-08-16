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
    img: (
      <Image
        source={require("../assets/white.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      />
    ),
    label: "home",
  },
  {
    img: (
      <Image
        source={require("../assets/gray.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      />
    ),
    label: "shop",
  },
  {
    img: (
      <Image
        source={require("../assets/black.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      />
    ),
    label: "about",
  },
];

const data = images.map((item, index) => ({ ...item, key: index }));

const Tab = ({ item }: { item: (typeof data)[0] }) => {
  return (
    <View>
      <Text
        style={{
          color: "white",
          fontWeight: "600",
          letterSpacing: 5,
          // width: 100,
          fontSize: 40,
          // textTransform: "uppercase",
          lineHeight: 50,
        }}
      >
        {item.label}
      </Text>
    </View>
  );
};

const Tabs = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View style={{ position: "absolute", top: 100, left: 30 }}>
      <View style={{ gap: 20 }}>
        {data.map((item) => {
          return <Tab key={item.key} item={item} />;
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
        keyExtractor={(item) => item.label}
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
