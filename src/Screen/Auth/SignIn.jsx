import { View, Text, Image, TouchableOpacity, TextInput, Pressable, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { Input } from '../../CommanStyles/InputSyles';
import Toast from '../../Components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserDetails } from '../../redux/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
            // mobileNo: "7976114618",
            // password: "123456"
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
            const response = await fetch("https://gaadibuddy.com/api/cleaners/login", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
            if (result.error) {
                throw result.error
            }
            const finalVal = result.cleaner
            console.log(finalVal, "hii");

            dispatch(setUserID(finalVal))
            dispatch(setUserDetails(true))
            const string = JSON.stringify(finalVal)
            await AsyncStorage.setItem('LoginDet', string)
            const ooo = await AsyncStorage.getItem('LoginDet')
            console.log(userID, "i am valueooo");

            setloader(false)
            // setToastMessage("User Logged In");
            // setToastTextColorState("white")
            // setToastColorState("green")
            // setLoading(false)
            // childRef.current.showToast();
            // navigation.navigate("HomeNav")
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
                    <View style={Input.InPutContainer}>
                        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/3247/3247310.png" }} style={Input.Logo} />
                        <TextInput placeholder='Enter Phone Number' placeholderTextColor={"grey"} style={Input.InputField} onChangeText={(value) => { setMobNum(value) }} keyboardType='numeric' />
                    </View>
                    <View style={Input.InPutContainer}>
                        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/4241/4241429.png" }} style={Input.Logo} />
                        <TextInput placeholder='Enter Password' placeholderTextColor={"grey"} style={Input.InputField} onChangeText={(value) => { setPasswod(value) }} />
                    </View>
                    {/* <TextInput placeholder='Enter Password' style={Input.InputField} onChangeText={(value) => { setPasswod(value) }} /> */}
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