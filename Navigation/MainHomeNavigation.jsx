import React, { useContext, useEffect, useReducer } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../src/Screen/Home/Home';
import JobDetail from '../src/Screen/Home/JobDetail';
import JobList from '../src/Screen/Home/JobListing';
import JobListing from '../src/Screen/Home/JobListing';
import JobMaindetail from '../src/Screen/Home/JobMaindetail';
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
                <Stack.Screen name='JobList' component={JobListing} />
                <Stack.Screen name='JobMaindetail' component={JobMaindetail} />


            </Stack.Navigator>
        </>
    )
}

export default MainHomeNavigation