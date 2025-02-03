
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ListaHechizos from "../screens/ListaHechizos/ListaHechizos";
import SubirHechizos from "../screens/SubirHechizos/SubirHechizos";
import DescargarHechizos from "../screens/DescargarHechizos/DescargarHechizos";
const Tab = createBottomTabNavigator();


export default function BottomTab() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen options={{title:"Lista de hechizos"}} name="listaHechizos" component={ListaHechizos} />
          <Tab.Screen 
            options={{title:"Sube tu hechizo aprendiz"}} 
            name="subirHechizos" 
            component={SubirHechizos} />
          <Tab.Screen 
            options={{title:"Descarga tu hechizo aprendiz"}} 
            name="descargarHechizos" 
            component={DescargarHechizos} />            
        </Tab.Navigator>
        
      </NavigationContainer>
    );
  }