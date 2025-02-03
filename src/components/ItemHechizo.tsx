import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IStyles } from '../interfaces/Style.interface';
import { Divider } from 'native-base';

interface Props{
    styles: IStyles;
    descargarPergamino:Function;
    eliminarPergamino:Function;
    item:String
}

export default function ItemHechizo({styles,descargarPergamino,eliminarPergamino,item}:Props) {
  return (
    <>
    <View style={styles.containerItem}>
        <TouchableOpacity onPress={() => descargarPergamino(item)}>
            <Text style={styles.textItem}>📜 {item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eliminarPergamino(item)}>
            <Text style={styles.textDelete}>❌ Eliminar</Text>
        </TouchableOpacity>
        
    </View> 
    <Divider/>
    </>

  )
}