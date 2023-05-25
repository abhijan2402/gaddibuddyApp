import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListJobHome from '../../Components/ListJobHome';
import { JobList } from '../../Data/JobList';
import Header from '../../Components/Header';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import { useNavigation, useRoute } from '@react-navigation/native';

const JobListing = ({ navigation }) => {
    const route = useRoute();
    const { JobsLists, Type } = route.params;
    const [SearcheData, setSearcheData] = useState([])

    useEffect(() => {
        FilterData()
        console.log(JobsLists, "i am job list");
    }, [])
    const FilterData = () => {
        let searchItem = Type

        if (searchItem != "") {
            console.log("hhhh");
            const searcheShops = JobsLists.filter((filteredShops) => {
                return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem.toLowerCase());
            });
            setSearcheData(searcheShops)
            console.log(SearcheData, "I am in hob listing page");
        } else {
            console.log("noooooooooooooooo");
        }
    }

    return (
        <View style={styles.Header}>
            <Header title="My Job Listing" onPress={() => navigation.navigate('Homes')} />
            <ScrollView style={{ marginBottom: "17%" }}>
                {
                    SearcheData.length == [] ?
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: windoHeight / 1.2 }}>
                            <Text style={{ fontSize: 19, color: "black" }}>No Jobs are Available</Text>
                        </View> :
                        SearcheData.map((item, index) => (
                            <ListJobHome item={item} key={index} onPress={() => navigation.navigate('JobMaindetail', { CarType: item.carId.carType, serviceType: item.service, ScheduledId: item._id, Address: item.carId.houseName, SecondAddress: item.carId.streetName })} />
                        ))
                }
            </ScrollView>
        </View>
    )
}

export default JobListing

const styles = StyleSheet.create({
    Header: {
        width: windoWidth,
        height: windoHeight,
        backgroundColor: 'white'
    },
    MainHeader: {
        height: windoHeight / 13,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    MainHeaderText: {
        fontSize: 18,
        color: "black",
        fontWeight: "700"
    }
})