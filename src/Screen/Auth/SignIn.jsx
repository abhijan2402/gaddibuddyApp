import { View, Text, Image, TouchableOpacity, TextInput, Pressable, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { Input } from '../../CommanStyles/InputSyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from '../../Components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserDetails } from '../../redux/actions/userAction';
// import axios from 'axios';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const SignIn = ({ navigation }) => {
    const [MobNum, setMobNum] = useState("")
    const [passwod, setPasswod] = useState("")
    const [loader, setloader] = useState(false)


    const childRef = useRef(null);
    const [toastColorState, setToastColorState] = useState('rgba(41,250,25,1)');
    const [toastTextColorState, setToastTextColorState] = useState('black');
    const [toastMessage, setToastMessage] = useState('');

    const dispatch = useDispatch();
    const { userID, user } = useSelector(state => state.user);

    const Login = async () => {
        const data = {
            // mobileNo: "8822881085",
            // password: "dhullo_nabajit"
            mobileNo: MobNum,
            password: passwod
        }
        try {
            if (MobNum == "") {
                throw "Please enter mobile num"
            }
            if (passwod == "")
                throw "please enter password"

            setloader(true)
            const response = await fetch("http://192.168.0.185:9000/api/cleaners/login", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
            const finalVal = result.cleaner
            // const naa = finalVal.name;
            // console.log(naa, "naa");
            dispatch(setUserID(finalVal))
            // dispatch(setUserDetails("hii"))
            console.log(userID, "i am valueooo");


            const trap = result.cleaner.name
            const JSONValue = JSON.stringify(trap)
            // console.log(JSONValue, "JSONValue");


            console.log(result.cleaner, "name");
            const pass = result.cleaner.password;
            const JSONValue1 = JSON.stringify(pass)

            // const MobNum = result.cleaner.MobNum
            // const JSONValue2 = JSON.stringify(MobNum)

            const serviceStartDate = result.cleaner.serviceStartDate
            const JSONValue3 = JSON.stringify(serviceStartDate)

            const ID = result.cleaner._id
            const JSONValue4 = JSON.stringify(ID)


            await AsyncStorage.setItem('Userdetails', JSONValue)
            await AsyncStorage.setItem('password', JSONValue1)
            // await AsyncStorage.setItem('MobNum', JSONValue2)
            await AsyncStorage.setItem('ID', JSONValue4)
            await AsyncStorage.setItem('serviceStartDate', JSONValue3)




            // const value = await AsyncStorage.getItem('Userdetails')
            // console.log(value, "i am value")
            setloader(false)
            setToastMessage("User Logged In");
            setToastTextColorState("white")
            setToastColorState("green")
            // setLoading(false)
            childRef.current.showToast();
            navigation.navigate("HomeNav")
        } catch (error) {
            console.error("Error:", error);
            setToastMessage(error);
            setToastTextColorState("white")
            setToastColorState("red")
            childRef.current.showToast();
            setloader(false)
        }
    }
    return (
        <>
            <Toast
                toastColor={toastColorState}
                toastTextColor={toastTextColorState}
                toastMessage={toastMessage}
                ref={childRef}
            />
            <View style={Input.MainView}>
                <View style={Input.LogoView}>
                    <Image source={require("../../assests/logo.png")} style={[Input.ImageLogo]} />
                </View>
                <View>
                    <TextInput placeholder='Enter Phone Number' style={Input.InputField} onChangeText={(value) => { setMobNum(value) }} keyboardType='numeric' />
                    <TextInput placeholder='Enter Password' style={Input.InputField} onChangeText={(value) => { setPasswod(value) }} />
                    <TouchableOpacity style={Input.SignUpButton} onPress={Login}>
                        {
                            loader ? <ActivityIndicator size={22} color="white" /> :
                                <Text style={Input.SignUpButtonText}>Login</Text>
                        }
                    </TouchableOpacity>
                    <View style={Input.ALreadyView}>
                        <Text style={Input.MainText}>New User?</Text>
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text style={Input.MainTextColor}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </View >
        </>
    )
}

export default SignIn