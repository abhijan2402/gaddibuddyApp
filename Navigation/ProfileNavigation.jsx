import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useReducer } from 'react';
import Account from '../src/Screen/Profile/Account';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobHistory from '../src/Screen/Profile/JobHistory';
import MainProfile from '../src/Screen/Profile/MainProfile';
const Stack = createNativeStackNavigator();
const ProfileNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Account"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Account' component={Account} />
                <Stack.Screen name='JobHistory' component={JobHistory} />
                <Stack.Screen name='MainProfile' component={MainProfile} />
            </Stack.Navigator>
        </>
    )
}

export default ProfileNavigation

const styles = StyleSheet.create({})