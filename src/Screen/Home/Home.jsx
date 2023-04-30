import { StyleSheet, Text, View, Dimensions, Image, ScrollView, RefreshControl, } from 'react-native'
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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    ListJobs();
    ListJobs();
    console.log(userID, "uder");
  }, [])

  const ListJobs = async () => {
    console.log("hii");
    try {
      const response = await fetch(`http://192.168.152.185:9000/api/scheduledJobs/`, {
        method: "GET", // or 'PUT'
      });
      const result = await response.json();
      let Newd = result.scheduledJobs
      // console.log(Newd, "j");
      setdata(Newd)



      let searchItem = userID._id
      if (searchItem != "") {
        console.log("hhhh");
        const searcheShops = await Newd.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem.toLowerCase());
        });
        setSearcheData(searcheShops)
        // console.log(SearcheData, "jjjj");
      }



      let searchItem1 = "One Time"
      if (searchItem1 != "") {
        const searcheShops1 = await SearcheData.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem1.toLowerCase());
        });
        setDailyJob(searcheShops1)

      }


      let searchItem2 = "Daily"
      if (searchItem2 != "") {
        const searcheShops2 = await SearcheData.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem2.toLowerCase());
        });
        setMonthlyJob(searcheShops2)
        // console.log(MonthlyJob, "i am monthly");
      }

    } catch (error) {
      console.log(error, 'jj')
    }
  }
  function findLength(searchItem2) {
    if (searchItem2 != "") {
      const searcheShops2 = SearcheData.filter((filteredShops) => {
        return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem2.toLowerCase());
      });
      return searcheShops2.length
    }
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await ListJobs();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView style={styles.MainView} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.Header}>
        <Text style={styles.HomeText}>Home</Text>
        {/* <Text style={[styles.HomeText, { color: "#EE7523" }]}>Select all Jobs</Text> */}
      </View>
      <View>
        <JobAvailable NOJ={findLength("One Time")} Type="One Time" onPress={() => navigation.navigate('JobList', { JobsLists: SearcheData, Type: "One Time" })} />
        <JobAvailable NOJ={findLength("Daily")} Type="Monthly" onPress={() => navigation.navigate('JobList', { JobsLists: SearcheData, Type: "Daily" })} />
        <JobAvailable NOJ="78" Type="weekly" onPress={() => navigation.navigate('JobList', { JobsLists: SearcheData })} />
      </View>
    </ScrollView>
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