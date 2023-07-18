import { StyleSheet, Text, View, Dimensions, Image, ScrollView, RefreshControl, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import JobAvailable from '../../Components/JobAvailable';
import { useSelector } from 'react-redux';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeHeader from '../../Components/HomeHeader';
import { UpdateStatus } from "../../APIs/UpdateJob";
import CheckInOut from '../../Components/CheckInOut';
import { CheckIn } from '../../APIs/Post/CheckIn';
import { CheckOut } from '../../APIs/Post/CheckOut';
import Lottie from 'lottie-react-native';
const Home = ({ navigation }) => {
  const { userID, user } = useSelector(state => state.user);
  const [data, setdata] = useState([])
  const [SearcheData, setSearcheData] = useState([])
  const [DailyJob, setDailyJob] = useState([])
  const [MonthlyJob, setMonthlyJob] = useState([])
  const [weeklyJob, setWeeklyJob] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date())
  const [nextdate, setnextdate] = useState("")
  const [onlyDate, setonlyDate] = useState(date.getDate())
  const [SearchResult, setSearchResult] = useState([])
  const [wholedata, setwholedata] = useState([])
  const [searchMod, setsearchMod] = useState(false)
  const [visibleData, setvisibleData] = useState(false)


  useEffect(() => {
    setTimeout(() => {
      ListJobs();
      UpdateStatus()
      setDate(new Date())
    }, 2000);
  }, [])
  const tryNext = () => {
    // console.log("I am try next");
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let goAhead = today
    setnextdate(goAhead)
  }
  const ListJobs = async () => {
    await tryNext()
    let olddate = new Date();
    olddate.setDate(date.getDate() - 2);
    let tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 5);
    // console.log("tomorrow => ", tomorrow);
    // console.log(date, nextdate);
    const data = {
      start: olddate,
      end: tomorrow
    }
    // console.log(data, "i am finidng for the data");
    try {
      const response = await fetch(`https://gaadibuddy.com/api/scheduledJobs/ByDate/cleaner/${userID._id}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      let Newd = result.scheduledJobs
      setwholedata(Newd)
      let format2 = date.getFullYear() + "-0" + `${date.getMonth() + 1}` + "-" + date.getDate();
      let searchItem1 = format2
      if (searchItem1 != "") {
        const searcheShops1 = await Newd.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem1.toLowerCase());
        });
        // console.log(searcheShops1, " i am job");
        setSearcheData(searcheShops1)
      }
    } catch (error) {
      console.log(error, 'error')
    }
  }
  function findLength(searchItem2) {
    // console.log(SearcheData, " i am trying data");
    // console.log(searchItem2, " i am searchItem2");
    if (searchItem2 != "") {
      const searcheShops2 = SearcheData.filter((filteredShops) => {
        return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem2.toLowerCase());
      });
      // console.log(searcheShops2, "i amher");
      return searcheShops2.length
    }
  }



  const ToFindNextDate = async (param) => {
    setSearchResult([])
    setsearchMod(false)
    let today = new Date();
    if (param == "Add") {
      date.setDate(date.getDate() + 1);
      setDate(date)
      const OnlyDates = date.getDate()
      setonlyDate(OnlyDates)
      // console.log("I am date ", "Add", date.getDate());
      let format2;
      if (date.getDate() > 9) {
        // console.log("Hi");
        format2 = date.getFullYear() + "-0" + `${date.getMonth() + 1}` + "-" + date.getDate();
      }
      else {
        format2 = date.getFullYear() + "-0" + `${date.getMonth() + 1}` + "-0" + date.getDate();
      }
      // console.log(format2, " I am format 2 if");

      //last one
      // let format2 = date.getFullYear() + "-0" + `${date.getMonth() + 1}` + "-" + date.getDate();


      // console.log(format2, "format");
      // console.log("2023-05-11");
      let searchItem1 = format2
      // console.log(wholedata, " i am whokenftat");
      if (searchItem1 != "") {
        const searcheShops1 = wholedata.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem1.toLowerCase());
        });
        // console.log(searcheShops1, " i am Searched job");
        setSearchResult(searcheShops1)
        setsearchMod(true)
        setDailyJob(findLengthUpdated("Daily", searcheShops1))
        setMonthlyJob(findLengthUpdated("One Time", searcheShops1))
        setWeeklyJob(findLengthUpdated("Weekly", searcheShops1))
      }
    }
    else {
      date.setDate(date.getDate() - 1);
      setDate(date)
      const OnlyDates = date.getDate()
      setonlyDate(OnlyDates)
      // console.log("I am date ", "Sub", date.getDate());
      let format2;
      if (date.getDate() > 9) {
        console.log("Hi");
        format2 = date.getFullYear() + "-0" + `${date.getMonth() + 1}` + "-" + date.getDate();
      }
      else {
        console.log("Helloe else");
        format2 = date.getFullYear() + "-0" + `${date.getMonth() + 1}` + "-0" + date.getDate();
      }
      console.log(format2, " I am format 2 else");

      //last one
      // let format2 = date.getFullYear() + "-0" + `${date.getMonth() + 1}` + "-0" + date.getDate();


      let searchItem1 = format2
      if (searchItem1 != "") {
        const searcheShops1 = wholedata.filter((filteredShops) => {
          return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem1.toLowerCase());
        });
        setSearchResult(searcheShops1)
        setsearchMod(true)
        setDailyJob(findLengthUpdated("Daily", searcheShops1))
        setMonthlyJob(findLengthUpdated("One Time", searcheShops1))
        setWeeklyJob(findLengthUpdated("Weekly", searcheShops1))
      }
    }
  }


  const findLengthUpdated = (TypeForm, FilterArray) => {
    // console.log(FilterArray, "i am filterarray");
    const searchItem2 = TypeForm
    if (searchItem2 != "") {
      const searcheShops2 = FilterArray.filter((filteredShops) => {
        return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem2.toLowerCase());
      });
      // console.log("It is juts fir checing ", searcheShops2.length);
      return searcheShops2.length
    }
  }
  const test = () => {
    setsearchMod(false)
    const UpdateDate = new Date();
    // console.log(UpdateDate, "jjj");
    const OnlyDates = date.setDate(UpdateDate.getDate())
    // console.log(OnlyDates, "date");
    setonlyDate(OnlyDates)
    // console.log(searchMod, "I am search Mod");
    ListJobs()
  }
  const CHeckedIn = async () => {
    const resp = await CheckIn(userID._id)
    if (resp) {
      setvisibleData(true)
      await AsyncStorage.setItem('CheckedIn', "true")
      const gettingItem = await AsyncStorage.getItem('CheckedIn')
    }
  }
  const CheckedOut = async () => {
    const resp = await CheckOut(userID._id)
    if (resp) {
      setvisibleData(false)
      const finalVal = await AsyncStorage.removeItem('CheckedIn')
    }
  }
  useEffect(() => {
    checkCleanerAttendence()
  }, [])
  const checkCleanerAttendence = async () => {
    const gettingItem = await AsyncStorage.getItem('CheckedIn')
    if (gettingItem == null) {
      console.log("I am in if");
      setvisibleData(false)
    }
    else {
      console.log("I am in else");
      setvisibleData(true)
    }
  }

  return (
    <>
      <View style={{ display: visibleData ? "flex" : "none", height: windoHeight, backgroundColor: "#f5f5f7" }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <HomeHeader />

          <TouchableOpacity style={{ borderRadius: 8, marginHorizontal: 20, backgroundColor: '#EE7523', paddingHorizontal: 20, paddingVertical: 5 }} onPress={test}>
            <Text style={{ fontSize: 15, color: "white" }}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => ToFindNextDate("Sub")}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={styles.DateChangeArrow} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: 'black', fontWeight: "600" }}>{date.getDate()}-{date.getUTCMonth() + 1}-{date.getFullYear()}</Text>
          <TouchableOpacity onPress={() => ToFindNextDate("Add")}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/32/32213.png" }} style={styles.DateChangeArrow} />
          </TouchableOpacity>
        </View>
        {
          searchMod ? <View>
            {/* <Text>hiii</Text> */}
            <JobAvailable NOJ={MonthlyJob} Type="One Time" JobsLists={SearcheData} onPress={() => navigation.navigate("JobList", { JobsLists: SearchResult, Type: "One Time" })} />
            <JobAvailable NOJ={DailyJob} Type="Daily" JobsLists={SearcheData} onPress={() => navigation.navigate("JobList", { JobsLists: SearchResult, Type: "Daily" })} />
            <JobAvailable NOJ={weeklyJob} Type="Weekly" JobsLists={SearcheData} onPress={() => navigation.navigate("JobList", { JobsLists: SearchResult, Type: "Weekly" })} />
          </View> :
            <View>
              {/* <Text>helllo</Text> */}
              <JobAvailable NOJ={findLength("One Time")} Type="One Time" JobsLists={SearcheData} onPress={() => navigation.navigate("JobList", { JobsLists: SearcheData, Type: "One Time" })} />
              <JobAvailable NOJ={findLength("Daily")} Type="Daily" JobsLists={SearcheData} onPress={() => navigation.navigate("JobList", { JobsLists: SearcheData, Type: "Daily" })} />
              <JobAvailable NOJ={findLength("Weekly")} Type="Weekly" JobsLists={SearcheData} onPress={() => navigation.navigate("JobList", { JobsLists: SearcheData, Type: "Weekly" })} />
            </View>
        }
        <View style={{ display: "flex", alignItems: "center", height: !visibleData ? windoHeight : "10%", justifyContent: "center" }}>
          <View style={styles.Container}>
            <TouchableOpacity style={[styles.BtnTO, { display: visibleData ? "flex" : "none", width: "100%" }]} onPress={CheckedOut}>
              <Text style={styles.BtnText}>Set Check Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ display: "flex", alignItems: "center", height: !visibleData ? windoHeight : "10%", justifyContent: "center" }}>
        <View style={[styles.Container, { display: visibleData ? "none" : "flex" }]}>
          <TouchableOpacity style={[styles.BtnTO, { width: "100%" }]} onPress={CHeckedIn}>
            <Text style={styles.BtnText}>Check In to see Jobs</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  MainView: {
    width: windoWidth,
    height: windoHeight,
    backgroundColor: "white"
  },
  DateChangeArrow: {
    width: 30,
    height: 30
  },
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%"
  },
  BtnTO: {
    borderRadius: 8,
    paddingHorizontal: "10%",
    paddingVertical: 10,
    backgroundColor: "#EE7523"
  },
  BtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
  }
})