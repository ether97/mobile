import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useRegisterUserMutation } from "../state/api";

const RegisterScreen = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [registerUser] = useRegisterUserMutation();
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log(name, email, password);
    registerUser({ name: name, email: email, password: password })
      .unwrap()
      .then(() => {
        console.log("hi");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              label="Name"
              value={name}
              mode="flat"
              style={styles.textInput}
              onChangeText={(text) => setName(text)}
            />
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
            <TextInput
              label="Confirm password"
              value={confirmPassword}
              // mode="flat"
              style={styles.textInput}
              activeOutlineColor="black"
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <Button
              onPress={handleSubmit}
              mode="contained"
              dark
              buttonColor="rgba(255,255,255,0.2)"
              textColor="black"
              // loading
              // style={styles.button}
            >
              Register
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
                Already have an account?
              </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;

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
