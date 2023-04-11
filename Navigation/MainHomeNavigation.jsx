import React, { useContext, useEffect, useReducer } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/Screen/Home/Home';
import JobDetail from '../src/Screen/Home/JobDetail';
const Stack = createNativeStackNavigator();
const MainHomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Homes"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Homes' component={Home} />
                <Stack.Screen name='JobDetail' component={JobDetail} />
            </Stack.Navigator>
        </>
    )
}

export default MainHomeNavigation