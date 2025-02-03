import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, Alert, TouchableOpacity, RefreshControl, ImageBackground } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { styles } from "./ListaHechizos.styles";
import ItemHechizo from "../../components/ItemHechizo";
import { crearCarpeta, obtenerPergaminos } from "../../services/HechizosServices";

const CARPETA_PERGAMINOS = `${FileSystem.documentDirectory}pergaminos/`;

export default function ListaHechizos() {
  const [pergaminos, setPergaminos] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    crearCarpeta();
    obtenerPergaminos(setRefreshing, setPergaminos);
  }, []);



  const subirPergamino = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync();
      if (resultado.canceled) return;

      const { uri, name } = resultado.assets[0];
      const destino = `${CARPETA_PERGAMINOS}${name}`;

      await FileSystem.copyAsync({ from: uri, to: destino });
      obtenerPergaminos(setRefreshing, setPergaminos);
    } catch (error) {
      Alert.alert("Error", "No se pudo subir el pergamino.");
      console.error("Error al subir pergamino:", error);
    }
  };

  const eliminarPergamino = async (nombre: string) => {
    try {
      const rutaArchivo = `${CARPETA_PERGAMINOS}${nombre}`;
      await FileSystem.deleteAsync(rutaArchivo);
      obtenerPergaminos(setRefreshing, setPergaminos);
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el pergamino.");
      console.error("Error al eliminar pergamino:", error);
    }
  };

  const descargarPergamino = async (nombre: string) => {
    try {
      const rutaArchivo = `${CARPETA_PERGAMINOS}${nombre}`;
      const fileUri = await FileSystem.getContentUriAsync(rutaArchivo);

      Alert.alert(
        "Descargar Pergamino",
        `¿Quieres descargar o abrir "${nombre}"?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Descargar/Abrir",
            onPress: () => IntentLauncher.startActivityAsync("android.intent.action.VIEW", { data: fileUri, flags: 1 }),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo descargar el pergamino.");
      console.error("Error al descargar pergamino:", error);
    }
  };

  return (
    <ImageBackground
    source={require('../../../assets/mago_aprendiz.png')}
    style={styles.containerBackground}>
      <View style={styles.container}>
        <Button title="📥 Subir Pergamino" onPress={subirPergamino} />
        
        <FlatList
          data={pergaminos}
          keyExtractor={(item) => item}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={()=>obtenerPergaminos(setRefreshing, setPergaminos)} />
          }
          renderItem={({ item }) => {
          console.log(item)
          return   <ItemHechizo styles={styles} item={item} eliminarPergamino={eliminarPergamino}
            descargarPergamino={descargarPergamino}/>
          }}
          style={styles.listContainer}
        />
      </View>      
    </ImageBackground>

  );
}
