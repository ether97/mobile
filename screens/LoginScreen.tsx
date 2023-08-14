import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const img = { uri: "Login.jpg" };

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Login.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.loginContainer}>
          <View style={styles.login}>
            <TextInput
              label="Email"
              value={email}
              mode="flat"
              style={styles.textInput}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              label="Password"
              value={password}
              // mode="flat"
              style={styles.textInput}
              activeOutlineColor="black"
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              mode="contained"
              dark
              // loading
              buttonColor="rgba(255,255,255,0.2)"
              textColor="black"
              onPress={() => console.log("Pressed")}
            >
              Login
            </Button>
            <Button
              mode="contained"
              dark
              // loading
              buttonColor="rgba(255,255,255,0.2)"
              textColor="black"
              onPress={() => navigation.navigate("Main")}
            >
              Main
            </Button>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <Text style={{ color: "rgba(1,1,1,0.7)" }}>
                Don't have an account?
              </Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Register
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  loginContainer: {
    flex: 1,
    // backgroundColor: "black",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  login: {
    gap: 20,
    width: "75%",
    // alignItems: "center",
  },
  textInput: {
    backgroundColor: "transparent",
  },
  pressable: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});
