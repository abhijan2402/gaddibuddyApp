import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import JobAvailable from '../../Components/JobAvailable';
import { useSelector } from 'react-redux';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const Home = ({ navigation }) => {
  const { userID, user } = useSelector(state => state.user);
  const [data, setdata] = useState([])
  const [SearcheData, setSearcheData] = useState([])
  const [DailyJob, setDailyJob] = useState([])
  const [MonthlyJob, setMonthlyJob] = useState([])
  useEffect(() => {
    ListJobs();
    ListJobs();
    console.log(userID, "uder");
  }, [])

  const ListJobs = async () => {
    console.log("hii");
    try {
      const response = await fetch(`http://192.168.4.185:9000/api/scheduledJobs/`, {
        method: "GET", // or 'PUT'
      });
      const result = await response.json();
      let Newd = result.scheduledJobs
      console.log(Newd, "j");
      setdata(Newd)



      let searchItem = userID._id
      if (searchItem != "") {
        console.log("hhhh");
        const searcheShops = Newd.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem.toLowerCase());
        });
        setSearcheData(searcheShops)
        console.log(SearcheData, "jjjj");
      }



      let searchItem1 = "One Time"
      if (searchItem1 != "") {
        console.log("hhhh");
        const searcheShops1 = SearcheData.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem1.toLowerCase());
        });
        setDailyJob(searcheShops1)

      }


      let searchItem2 = "Daily"
      if (searchItem2 != "") {
        console.log("hhhh");
        const searcheShops2 = SearcheData.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem2.toLowerCase());
        });
        setMonthlyJob(searcheShops2)
        console.log(MonthlyJob, "i am monthly");
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
        <JobAvailable NOJ={DailyJob.length} Type="One Time" onPress={() => navigation.navigate('JobList', { JobsLists: DailyJob, })} />
        <JobAvailable NOJ={MonthlyJob.length} Type="Monthly" onPress={() => navigation.navigate('JobList', { JobsLists: MonthlyJob, })} />
        <JobAvailable NOJ="78" Type="weekly" onPress={() => navigation.navigate('JobList', { JobsLists: SearcheData })} />
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