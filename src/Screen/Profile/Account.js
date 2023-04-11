import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const Account = ({ navigation }) => {
  return (
    <View style={styles.MainView}>
      <View style={styles.Header}>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2223/2223615.png" }} style={styles.Logo} />
        <Text style={styles.AccountText}>Account</Text>
      </View>
      <View style={{ backgroundColor: "#F7F7F7" }}>
        <View style={styles.MidView}>
          <View style={styles.NameView}>
            <Text style={styles.NameText}>Hello</Text>
            <Text style={[styles.NameText, { color: "green", marginLeft: "2%" }]}>John Doe</Text>
          </View>
          <Text style={[styles.NameText, { marginVertical: 5 }]} >+91 98565525255</Text>
        </View>
        <TouchableOpacity style={styles.OptionView} onPress={() => navigation.navigate('MainProfile')}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/747/747376.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.OptionView} onPress={() => navigation.navigate('JobHistory')}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/833/833314.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Job History</Text>
        </TouchableOpacity>
        <View style={styles.OptionView}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/482/482541.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Payments</Text>
        </View>
        <View style={styles.OptionView}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3388/3388614.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Help</Text>
        </View>
        <View style={styles.OptionView}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/471/471664.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>FAQ'S</Text>
        </View>
        <View style={styles.OptionView}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9131/9131981.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>About Dhullo</Text>
        </View>
        <View style={styles.OptionView}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/992/992680.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Logout</Text>
        </View>
        <View style={[styles.OptionView, { marginHorizontal: 20, marginVertical: 10 }]}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9131/9131981.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Refer a friend</Text>
        </View>
        <View style={[styles.OptionView, { marginHorizontal: 20, marginVertical: 10 }]}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9131/9131981.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Active Dully Option</Text>
        </View>
      </View>

    </View >
  )
}

export default Account

const styles = StyleSheet.create({
  MainView: {
    width: windoWidth,
    height: windoHeight,
    backgroundColor: "#F7F7F7"
  },
  Header: {
    height: windoHeight / 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white"

  },
  AccountText: {
    fontSize: 22,
    color: "black",
    marginHorizontal: 20,
    fontWeight: "600"
  },
  NameView: {
    display: "flex",
    flexDirection: "row",
    // paddingHorizontal: 20,
    marginTop: "5%"
  },
  NameText: {
    fontSize: 17,
    color: "black",
  },
  MidView: {
    // backgroundColor: "lightgrey",
    borderBottomWidth: 1,
    borderBottomColor: "green",
    marginHorizontal: 20,
    paddingBottom: "2%"
  },
  Logo: {
    width: 23,
    height: 23
  },
  OptionView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    padding: 13,
    paddingHorizontal: 25
  },
  OptionText: {
    marginLeft: "5%",
    color: "black",
    fontSize: 18,
    marginVertical: 3
  }
})