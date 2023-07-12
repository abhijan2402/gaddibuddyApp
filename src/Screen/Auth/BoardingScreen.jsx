import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Input } from '../../CommanStyles/InputSyles';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserDetails } from '../../redux/actions/userAction';

const BoardingScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { userID } = useSelector(state => state.user);
    const user = "hey"
    // useEffect(() => {
    //     dispatch(setUserID(user))
    // }, [])
    // const test = () => {
    //     console.log(userID, "jhh")
    // }
    return (
        <View style={Input.MainView}>
            <View style={Input.LogoView}>
                <Image source={require("../../assests/logo.png")} style={[Input.ImageLogo]} />
            </View>
            <View style={styles.Footer}>
                <View style={styles.WelcomeView}>
                    <Text style={styles.WelcomeText}>Welcome to gaadibuddy</Text>
                    {/* <Image source={require('../../assests/carBS.png')} style={{ width: "80%", height: 150 }} /> */}
                </View>
                <View style={styles.BtnView}>
                    <TouchableOpacity style={[styles.BtnViewMain, { borderColor: 'white' }]} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={[styles.BtnText, { color: "white" }]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.BtnViewMain, { backgroundColor: "white", borderWidth: 0 }]} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={[styles.BtnText, { color: "#EE7523" }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default BoardingScreen

const styles = StyleSheet.create({
    Footer: {
        marginTop: "50%",
        // borderWidth: 1,
        height: windoHeight / 2.2,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "#EE7523"
    },
    WelcomeText: {
        fontSize: 40,
        color: "white",
        fontWeight: "700"
    },
    WelcomeView: {
        justifyContent: "center",
        // borderWidth: 1,
        alignItems: "center",
        marginTop: "10%"
    },
    BtnView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "25%"
    },
    BtnViewMain: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 8

    },
    BtnText: {
        fontSize: 20,
        color: "white"
    }
})