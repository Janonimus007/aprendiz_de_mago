import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native'; 
import MainStack from './src/routes/MainStack'; 

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="rgba(0, 0, 0, 0.5)" 
      />
      <MainStack />
    </NativeBaseProvider>
  );
}