import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserDetails } from '../../redux/actions/userAction';

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userID, userDetails } = useSelector(state => state.user);
  const [UserDetai, setUserDetai] = useState("")
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  useEffect(() => {
    Dataset()
  }, [])

  const Dataset = () => {
    console.log(userID, "hhh");
  }
  const Logout = () => {
    dispatch(setUserDetails(false))
  }
  return (
    <View style={styles.MainView}>
      <View style={styles.Header}>
        {/* <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2223/2223615.png" }} style={styles.Logo} /> */}
        <Text style={styles.AccountText}>Account</Text>
      </View>
      <View style={{}}>
        <View style={styles.MidView}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9131/9131529.png" }} style={{ width: 45, height: 45, marginRight: "3%" }} />
          <View>
            <View style={styles.NameView}>
              <Text style={styles.NameText}>Hello</Text>
              <Text style={[styles.NameText, { color: "green", marginLeft: "2%" }]}>{userID.name}</Text>
            </View>
            <Text style={[styles.NameText, { marginVertical: 5 }]} >+91-{userID.mobileNo}</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.OptionView, { backgroundColor: "#ffcbbf" }]} onPress={() => navigation.navigate('MainProfile')}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/236/236831.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Profile</Text>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }} style={styles.Logo1} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.OptionView, { backgroundColor: "#ccccfc" }]} onPress={() => navigation.navigate('JobHistory')}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/9048/9048549.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Job History</Text>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }} style={styles.Logo1} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.OptionView, { backgroundColor: "#fffebf" }]} onPress={Logout}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/4034/4034229.png" }} style={styles.Logo} />
          <Text style={styles.OptionText}>Logout</Text>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }} style={styles.Logo1} />
        </TouchableOpacity>

        {/* https://cdn-icons-png.flaticon.com/128/747/747376.png
        https://cdn-icons-png.flaticon.com/128/833/833314.png
        https://cdn-icons-png.flaticon.com/128/992/992680.png */}
      </View>

    </View >
  )
}

export default Account

const styles = StyleSheet.create({
  MainView: {
    width: windoWidth,
    height: windoHeight,
    backgroundColor: "#F7F7F7",
    backgroundColor: "white"
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
    paddingBottom: "2%",
    marginBottom: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  Logo: {
    width: 30,
    height: 30
  },
  Logo1: {
    width: 20,
    height: 20
  },
  OptionView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 0.5,
    // borderColor: "yellow",
    padding: 13,
    // paddingHorizontal: 25,
    marginHorizontal: "7%",
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 5,
    // shadowColor: "red"
  },
  OptionText: {
    marginLeft: "5%",
    color: "black",
    fontSize: 18,
    marginVertical: 3,
    // borderWidth: 1,
    width: "76%",
    fontWeight: "500"
  }
})