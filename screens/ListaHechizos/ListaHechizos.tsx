import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, Alert, TouchableOpacity, RefreshControl } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";

const CARPETA_PERGAMINOS = `${FileSystem.documentDirectory}pergaminos/`;

export default function ListaHechizos() {
  const [pergaminos, setPergaminos] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    crearCarpeta();
    obtenerPergaminos();
  }, []);

  const crearCarpeta = async () => {
    const carpetaInfo = await FileSystem.getInfoAsync(CARPETA_PERGAMINOS);
    if (!carpetaInfo.exists) {
      await FileSystem.makeDirectoryAsync(CARPETA_PERGAMINOS, { intermediates: true });
    }
  };

  const obtenerPergaminos = async () => {
    try {
      setRefreshing(true);
      const archivos = await FileSystem.readDirectoryAsync(CARPETA_PERGAMINOS);
      setPergaminos(archivos);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pergaminos.");
      console.error("Error al obtener pergaminos:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const subirPergamino = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync();
      if (resultado.canceled) return;

      const { uri, name } = resultado.assets[0];
      const destino = `${CARPETA_PERGAMINOS}${name}`;

      await FileSystem.copyAsync({ from: uri, to: destino });
      obtenerPergaminos();
    } catch (error) {
      Alert.alert("Error", "No se pudo subir el pergamino.");
      console.error("Error al subir pergamino:", error);
    }
  };

  const eliminarPergamino = async (nombre: string) => {
    try {
      const rutaArchivo = `${CARPETA_PERGAMINOS}${nombre}`;
      await FileSystem.deleteAsync(rutaArchivo);
      obtenerPergaminos();
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
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="📥 Subir Pergamino" onPress={subirPergamino} />
      
      <FlatList
        data={pergaminos}
        keyExtractor={(item) => item}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={obtenerPergaminos} />
        }
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
            <TouchableOpacity onPress={() => descargarPergamino(item)}>
              <Text style={{ fontSize: 16 }}>📜 {item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eliminarPergamino(item)}>
              <Text style={{ color: "red", fontWeight: "bold" }}>❌ Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
