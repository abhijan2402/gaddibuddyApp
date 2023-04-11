import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { JobList } from '../../Data/JobList';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const Jobs = () => {
  return (
    <View style={styles.MainView}>
      <View style={styles.Header}>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2223/2223615.png" }} style={styles.Logo} />
        <Text style={styles.AccountText}>My Job Listing</Text>
      </View>
      <View></View>
      {

        JobList.map((item, index) => (
          <View style={styles.JobView}>
            <View style={styles.CarView}>
              <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2736/2736918.png" }} style={styles.CarLogo} />
            </View>
            <View style={[styles.CarViewData]}>
              <Text style={[styles.DataInfo, { fontWeight: "600", color: "black", fontSize: 17 }]}>Car Wash</Text>
              <Text style={styles.DataInfo}>ELITE i20 -KA MG 4602</Text>
              <Text style={styles.DataInfo}>Address</Text>
            </View>
            <View style={styles.CarView}>
              <Text style={styles.timeText}>Time</Text>
            </View>
          </View>

        ))
      }
    </View>
  )
}

export default Jobs

const styles = StyleSheet.create({
  MainView: {
    width: windoWidth,
    height: windoHeight,
    backgroundColor: "white"
  },
  Header: {
    height: windoHeight / 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "white"

  },
  AccountText: {
    fontSize: 22,
    color: "black",
    marginHorizontal: 20,
    fontWeight: "600"
  },
  Logo: {
    width: 23,
    height: 23
  },
  CarLogo: {
    width: 30,
    height: 30
  },
  JobView: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 15,
    backgroundColor: "#E2E0E0",
    paddingVertical: 10,
    marginVertical: 15
  },
  CarView: {
    width: windoWidth / 7,
    alignItems: "center"
  },
  CarViewData: {
    width: windoWidth / 7,
    justifyContent: "center",
    paddingHorizontal: 10,
    width: windoWidth / 1.6
  },
  DataInfo: {
    fontSize: 15,
    marginVertical: 5
  },
  timeText: {
    fontSize: 15,
    color: "black",
    fontWeight: "700"
  }
})