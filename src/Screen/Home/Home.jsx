import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import JobAvailable from '../../Components/JobAvailable';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const Home = ({ navigation }) => {
  return (
    <View style={styles.MainView}>
      <View style={styles.Header}>
        <Text style={styles.HomeText}>Home</Text>
        <Text style={[styles.HomeText, { color: "#EE7523" }]}>Select all Jobs</Text>
      </View>
      <View>
        <JobAvailable NOJ="50" Type="Monthly" onPress={() => navigation.navigate('JobDetail')} />
        <JobAvailable NOJ="28" Type="Weekly" onPress={() => navigation.navigate('JobDetail')} />
        <JobAvailable NOJ="78" Type="One Time" onPress={() => navigation.navigate('JobDetail')} />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  MainView: {
    width: windoWidth,
    height: windoHeight,
    backgroundColor: "white"
  },
  Header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    padding: 20
  },
  HomeText: {
    fontSize: 20,
    color: "black",
    fontWeight: "800"
  }

})