import { StatusBar } from "expo-status-bar";
import Categories from "./src/Components/Categories";
import Movies from "./src/Components/Movies";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import configureStore from "./src/Containers/store";

const store = configureStore();
const Stack = createStackNavigator();

export default (stack) => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Categories} navigation={stack} />
        <Stack.Screen name="Movies" component={Movies} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>

);
