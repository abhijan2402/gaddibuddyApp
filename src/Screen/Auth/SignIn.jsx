import { View, Text, Image, TouchableOpacity, TextInput, Pressable, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { Input } from '../../CommanStyles/InputSyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from '../../Components/Toast';

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

    const Login = async () => {
        const data = {
            // mobileNo: "7976114618",
            // password: "qwerty123"
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
            const response = await fetch("http://192.168.13.185:9000/api/cleaners/login", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);

            const trap = result.cleaner.name
            const JSONValue = JSON.stringify(trap)
            // console.log(JSONValue, "JSONValue");


            // console.log(result.cleaner, "name");
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




            const value = await AsyncStorage.getItem('Userdetails')
            console.log(value, "i am value")
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
                    <Image source={{ uri: "https://s3-alpha-sig.figma.com/img/81c2/a2f9/ad6fcc725874137d639c942051eefd36?Expires=1681689600&Signature=axMxo--hkb-qpGFOYQiujj6YRLJoHt7HpUW-u382d0IMTJXa~jBNdYu4swZNT83Qzifo5RUHutVEUhFoWMwSODVZ39vSrJLHevKJT17QWdXaUe3sko5q3Wk9qap1X6ALJlWTRMAiG68rZkeP6monpkftOt8dgmBXoFJfctPBNe1eLOLkUkRqooNXjytvDJR5vi8-1KKK~hSZuLx6Y-LdC1kpsBG--iE~9kOEk~aVUJ4cLlIcHhWF-vlxHpO1bParSWIG-GTUH1DfqjeQH-bcx69BncgXYIEqan0ZIBs20rQes1XFl9lum98pPvG5pESSGwx~Q~qMX6Bg6cHR0CHvgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" }} style={[Input.ImageLogo]} />
                </View>
                <View>
                    <TextInput placeholder='Enter Phone Number' style={Input.InputField} onChangeText={(value) => { setMobNum(value) }} />
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