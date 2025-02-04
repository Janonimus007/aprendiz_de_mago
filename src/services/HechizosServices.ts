import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const CARPETA_PERGAMINOS = FileSystem.documentDirectory + "pergaminos/";
export const crearCarpeta = async () => {
    const carpetaInfo = await FileSystem.getInfoAsync(CARPETA_PERGAMINOS);
    if (!carpetaInfo.exists) {
      await FileSystem.makeDirectoryAsync(CARPETA_PERGAMINOS, { intermediates: true });
    }
  };

  export const obtenerPergaminos = async (
    setRefreshing: React.Dispatch<React.SetStateAction<boolean>>,
    setPergaminos: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    try {
      setRefreshing(true);
  
      const carpetaInfo = await FileSystem.getInfoAsync(CARPETA_PERGAMINOS);
      if (!carpetaInfo.exists) {
        setPergaminos([]); // Si no existe, devuelve una lista vacía
        return;
      }
  
      const archivos = await FileSystem.readDirectoryAsync(CARPETA_PERGAMINOS);
      setPergaminos(archivos);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pergaminos.");
      console.error("Error al obtener pergaminos:", error);
    } finally {
      setRefreshing(false);
    }
  };