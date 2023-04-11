import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigation from './Navigation/HomeNavigation';
import SignIn from './src/Screen/Auth/SignIn';
import Signup from './src/Screen/Auth/Signup';
import BoardingScreen from './src/Screen/Auth/BoardingScreen';
const App = () => {
  const Stack = createNativeStackNavigator();
  const [user, setuser] = useState(true)
  return (
    // // <SignIn />
    // <Signup />
    <>
      {
        user ?
          <NavigationContainer>
            <Stack.Navigator initialRouteName='BoardingScreen' screenOptions={{
              headerShown: false
            }}>
              <Stack.Screen name='BoardingScreen' component={BoardingScreen} />
              <Stack.Screen name='SignIn' component={SignIn} />
              <Stack.Screen name='SignUp' component={Signup} />
              <Stack.Screen name='HomeNav' component={HomeNavigation} />


            </Stack.Navigator>

          </NavigationContainer> : <SignIn />

      }
    </>


  )
}

export default App

const styles = StyleSheet.create({})