import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { JobList } from '../../Data/JobList';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserDetails } from '../../redux/actions/userAction';
const Jobs = () => {
  const [data, setdata] = useState([])
  const [SearcheData, setSearcheData] = useState([])
  const { userID, user } = useSelector(state => state.user);
  useEffect(() => {
    ListJobs();
  }, [])


  const ListJobs = async () => {
    console.log("hii");
    console.log(userID, "i am usweer");
    try {
      const response = await fetch(`http://192.168.4.185:9000/api/scheduledJobs/`, {
        method: "GET", // or 'PUT'
      });
      const result = await response.json();
      let Newd = result.scheduledJobs
      setdata(Newd)

      // let searchItem = "643f9f459b24e10a88ab6601"
      let searchItem = userID._id

      if (searchItem != "") {
        console.log("hhhh");
        const searcheShops = Newd.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem.toLowerCase());
        });
        setSearcheData(searcheShops)
      } else {
        console.log("noooooooooooooooo");
      }
    } catch (error) {
      console.log(error, 'jj')
    }
  }
  return (
    <View style={styles.MainView}>
      <View style={styles.Header}>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2223/2223615.png" }} style={styles.Logo} />
        <Text style={styles.AccountText}>My Job Listing</Text>
      </View>
      <ScrollView style={{ marginBottom: "15%" }}>
        {
          SearcheData.length == 0 ? <ActivityIndicator color="#EE7523" size={"large"} style={{ height: windoHeight / 1.2 }} /> :

            SearcheData.map((item, index) => (
              <View style={styles.JobView} key={index}>
                <View style={[styles.CarView, { width: windoWidth / 7.5 }]}>
                  <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2736/2736918.png" }} style={styles.CarLogo} />
                </View>
                <View style={[styles.CarViewData]}>
                  <Text style={[styles.DataInfo, { fontWeight: "600", color: "black", fontSize: 17 }]}>{item.serviceSurface}</Text>
                  <Text style={styles.DataInfo}>ELITE i20 -KA MG 4602</Text>
                  <Text style={styles.DataInfo}>Service Type - {item.serviceType}</Text>
                </View>
                <View style={[styles.CarView, { width: windoWidth / 4.5 }]}>
                  <Text style={styles.timeText}>{item.serviceStatus}</Text>
                </View>
              </View>

            ))
        }
      </ScrollView>
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
    width: windoWidth / 6,
    alignItems: "center",
    // borderWidth: 1
  },
  CarViewData: {
    width: windoWidth / 6,
    justifyContent: "center",
    paddingHorizontal: 10,
    width: windoWidth / 1.8
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