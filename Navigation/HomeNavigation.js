import { View, Text, StyleSheet, style, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Jobs from '../src/Screen/Jobs/Jobs';
import Account from '../src/Screen/Profile/Account';
import Home from '../src/Screen/Home/Home';
import ProfileNavigation from './ProfileNavigation';
import MainHomeNavigation from './MainHomeNavigation';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, tabBarShowLabel: false, showIcon: false,
        tabBarStyle: [{ elevation: 0, backgroundColor: "#ffffff", borderTopWidth: 1, borderTopColor: "#808080", height: 60, },],
      }}
    >
      <Tab.Screen name="MainHome" component={MainHomeNavigation} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Feather name='home' color={focused ? '#F05656' : '#808080'} size={22} />
            <Text style={{ color: focused ? '#F05656' : '#808080', fontFamily: "SourceSansPro-Regular" }}>Home</Text>
          </View>
        )
      }} />
      {/* <Tab.Screen name="Jobs" component={Jobs} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name='cart-outline' color={focused ? '#F05656' : '#808080'} size={22} />
            <Text style={{ color: focused ? '#F05656' : '#808080', fontFamily: "SourceSansPro-Regular" }}>Jobs</Text>
          </View>
        )
      }} /> */}

      <Tab.Screen name='Prof' component={ProfileNavigation} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons name='account' color={focused ? '#F05656' : '#808080'} size={22} />
            <Text style={{ color: focused ? '#F05656' : '#808080', textAlign: "center", fontFamily: "SourceSansPro-Regular" }}>Account</Text>
          </View>
        )
      }}
      />



    </Tab.Navigator>

  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "lightblue",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});

export default HomeNavigation