import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import JobAvailable from '../../Components/JobAvailable';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const Home = ({ navigation }) => {
  const [data, setdata] = useState([])
  const [SearcheData, setSearcheData] = useState([])
  useEffect(() => {
    ListJobs();
  }, [])

  const ListJobs = async () => {
    console.log("hii");
    try {
      const response = await fetch(`http://192.168.0.185:9000/api/scheduledJobs/`, {
        method: "GET", // or 'PUT'
      });
      const result = await response.json();
      let Newd = result.scheduledJobs
      setdata(Newd)
      let searchItem = "643f9f459b24e10a88ab6601"
      if (searchItem != "") {
        console.log("hhhh");
        const searcheShops = Newd.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem.toLowerCase());
        });
        setSearcheData(searcheShops)
        console.log(SearcheData, "jjjj");

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
        <Text style={styles.HomeText}>Home</Text>
        {/* <Text style={[styles.HomeText, { color: "#EE7523" }]}>Select all Jobs</Text> */}
      </View>
      <View>
        <JobAvailable NOJ="50" Type="Monthly" onPress={() => navigation.navigate('JobList', { JobsLists: SearcheData })} />
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