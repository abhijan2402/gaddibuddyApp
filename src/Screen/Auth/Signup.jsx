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
        const data = {
            name: name,
            mobileNo: phoneNumber,
            password: password

            // mobileNo: MobNum,
            // password: passwod
        }
        try {
            setloader(true)
            const response = await fetch("http://192.168.13.185:9000/api/cleaners/addCleaner", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Success:", result);
            await AsyncStorage.setItem('Userdetails', JSON.stringify(result))
            const value = await AsyncStorage.getItem('Userdetails')
            console.log(value, "i am value")
            setloader(false)
            setToastMessage("Cleaner Created");
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
                    <Image source={{ uri: "https://s3-alpha-sig.figma.com/img/81c2/a2f9/ad6fcc725874137d639c942051eefd36?Expires=1681689600&Signature=axMxo--hkb-qpGFOYQiujj6YRLJoHt7HpUW-u382d0IMTJXa~jBNdYu4swZNT83Qzifo5RUHutVEUhFoWMwSODVZ39vSrJLHevKJT17QWdXaUe3sko5q3Wk9qap1X6ALJlWTRMAiG68rZkeP6monpkftOt8dgmBXoFJfctPBNe1eLOLkUkRqooNXjytvDJR5vi8-1KKK~hSZuLx6Y-LdC1kpsBG--iE~9kOEk~aVUJ4cLlIcHhWF-vlxHpO1bParSWIG-GTUH1DfqjeQH-bcx69BncgXYIEqan0ZIBs20rQes1XFl9lum98pPvG5pESSGwx~Q~qMX6Bg6cHR0CHvgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" }} style={Input.ImageLogo} />
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