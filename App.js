import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigation from './Navigation/HomeNavigation';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='HomeNav' screenOptions={{
        headerShown:false
      }}>
     <Stack.Screen name='HomeNav'  component={HomeNavigation}/>
     
    
    </Stack.Navigator>
 
  </NavigationContainer>
 
    
  )
}

export default App

const styles = StyleSheet.create({})