import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigation from './Navigation/HomeNavigation';
import SignIn from './src/Screen/Auth/SignIn';
import Signup from './src/Screen/Auth/Signup';
import BoardingScreen from './src/Screen/Auth/BoardingScreen';
import { useSelector } from 'react-redux';
const App = () => {
  const Stack = createNativeStackNavigator();
  // const [user, setuser] = useState(true)
  const { userID, userDetails } = useSelector(state => state.user);
  useEffect(() => {
    console.log(userDetails, userID, " i amusre");
  }, [])

  return (
    // // <SignIn />
    // <Signup />
    <>

      <NavigationContainer>
        {!userDetails ?
          <Stack.Navigator initialRouteName='BoardingScreen' screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='BoardingScreen' component={BoardingScreen} />
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='SignUp' component={Signup} />


          </Stack.Navigator> :
          <Stack.Navigator initialRouteName='HomeNav' screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='HomeNav' component={HomeNavigation} />
          </Stack.Navigator>
        }
      </NavigationContainer>

    </>


  )
}

export default App

const styles = StyleSheet.create({})