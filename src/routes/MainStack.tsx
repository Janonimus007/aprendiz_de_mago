import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ListaHechizos from "../screens/ListaHechizos/ListaHechizos";

// Crear el Stack Navigator
const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaHechizos">
        <Stack.Screen
          name="ListaHechizos"
          component={ListaHechizos}
          options={{ title: "Lista de Pergaminos", headerShown:false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
