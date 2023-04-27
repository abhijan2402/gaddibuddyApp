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
    const { JobsLists } = route.params;
    const [SearcheData, setSearcheData] = useState([])

    useEffect(() => {
        FilterData()
        console.log(JobsLists, "i am job list");
    }, [])
    const FilterData = () => {
        let searchItem = "pending"

        if (searchItem != "") {
            console.log("hhhh");
            const searcheShops = JobsLists.filter((filteredShops) => {
                return Object.values(filteredShops).join(" ").toLowerCase().includes(searchItem.toLowerCase());
            });
            setSearcheData(searcheShops)
        } else {
            console.log("noooooooooooooooo");
        }
    }

    return (
        <View style={styles.Header}>
            <Header title="My Job Listing" onPress={() => navigation.navigate('Homes')} />
            <ScrollView>
                {
                    SearcheData.map((item, index) => (
                        <ListJobHome item={item} key={index} Carid={item.carId} onPress={() => navigation.navigate('JobMaindetail', { CarId: item.carId })} />
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