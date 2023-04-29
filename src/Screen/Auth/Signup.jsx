import { StyleSheet, Text, View, Dimensions, Pressable, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../../CommanStyles/InputSyles';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from '../../Components/Toast';
const Signup = ({ navigation }) => {
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setloader] = useState(false)
    const childRef = useRef(null);
    const [toastColorState, setToastColorState] = useState('rgba(41,250,25,1)');
    const [toastTextColorState, setToastTextColorState] = useState('black');
    const [toastMessage, setToastMessage] = useState('');
    const SignUp = async () => {
        console.log("hiii");
        try {
            // if (name == "" || mobileNo == "" || password === "") {
            //     throw "Enter all the fields"

            // }
            // const data = {
            //     name: name,
            //     mobileNo: phoneNumber,
            //     password: password


            // }
            setloader(true)
            const response = await fetch("http://192.168.152.185:9000/api/cleaners/addCleaner", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    mobileNo: phoneNumber,
                    password: password
                }),
            });
            console.log("kkk");
            const result = await response.json();
            console.log("Success:", result);
            setloader(false)
            if (result.error) {
                throw result.error
            }
            setToastMessage("Cleaner Created,Please log in");
            setToastTextColorState("white")
            setToastColorState("green")
            // setLoading(false)
            childRef.current.showToast();
            setTimeout(() => {
                navigation.navigate("SignIn")
            }, 2000);
        } catch (error) {
            console.error("Error:", error);
            setToastMessage(error);
            setToastTextColorState("white")
            setToastColorState("red")
            // setLoading(false)
            childRef.current.showToast();
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
                    <Image source={require("../../assests/logo.png")} style={Input.ImageLogo} />
                </View>
                <View>
                    <TextInput placeholder='Enter UserName' style={Input.InputField} onChangeText={(value) => { setName(value) }} />
                    <TextInput placeholder='Enter Phone Number' style={Input.InputField} onChangeText={(value) => { setPhoneNumber(value) }} />
                    <TextInput placeholder='Enter Password' style={Input.InputField} onChangeText={(value) => { setPassword(value) }} />
                    <TouchableOpacity style={Input.SignUpButton} onPress={SignUp}>
                        {
                            loader ? <ActivityIndicator size={22} color="white" /> :
                                <Text style={Input.SignUpButtonText}>Sign Up</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={Input.ALreadyView}>
                    <Text style={Input.MainText}>Already a User?</Text>
                    <Pressable onPress={() => navigation.navigate('SignIn')}>
                        <Text style={Input.MainTextColor}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}
export default Signup