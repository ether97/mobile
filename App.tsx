import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "white",
    secondary: "yellow",
    onSurfaceVariant: "white",
  },
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const tabs = [
  {
    name: "Home",
    component: HomeScreen,
    focusedIcon: <Entypo name="home" size={24} color="black" />,
    unFocusedIcon: <SimpleLineIcons name="home" size={24} color="black" />,
  },
  {
    name: "Profile",
    component: ProfileScreen,
    focusedIcon: <Ionicons name="person-circle" size={24} color="black" />,
    unFocusedIcon: (
      <Ionicons name="person-circle-outline" size={24} color="black" />
    ),
  },
  {
    name: "Cart",
    component: CartScreen,
    focusedIcon: <Ionicons name="cart-sharp" size={24} color="black" />,
    unFocusedIcon: <Ionicons name="ios-cart-outline" size={24} color="black" />,
  },
];

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      {tabs.map(({ name: newName, component, focusedIcon, unFocusedIcon }) => (
        <Tab.Screen
          key={newName}
          name={newName}
          component={component}
          options={{
            tabBarLabel: newName,
            tabBarLabelStyle: { color: "gray" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? focusedIcon : unFocusedIcon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
