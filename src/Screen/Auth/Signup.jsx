import { StyleSheet, Text, View, Dimensions, Pressable, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input } from '../../CommanStyles/InputSyles';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const Signup = ({ navigation }) => {
    return (
        <View style={Input.MainView}>
            <View style={Input.LogoView}>
                <Image source={{ uri: "https://s3-alpha-sig.figma.com/img/81c2/a2f9/ad6fcc725874137d639c942051eefd36?Expires=1681689600&Signature=axMxo--hkb-qpGFOYQiujj6YRLJoHt7HpUW-u382d0IMTJXa~jBNdYu4swZNT83Qzifo5RUHutVEUhFoWMwSODVZ39vSrJLHevKJT17QWdXaUe3sko5q3Wk9qap1X6ALJlWTRMAiG68rZkeP6monpkftOt8dgmBXoFJfctPBNe1eLOLkUkRqooNXjytvDJR5vi8-1KKK~hSZuLx6Y-LdC1kpsBG--iE~9kOEk~aVUJ4cLlIcHhWF-vlxHpO1bParSWIG-GTUH1DfqjeQH-bcx69BncgXYIEqan0ZIBs20rQes1XFl9lum98pPvG5pESSGwx~Q~qMX6Bg6cHR0CHvgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" }} style={Input.ImageLogo} />
            </View>
            <View>
                <TextInput placeholder='Enter UserName' style={Input.InputField} />
                <TextInput placeholder='Enter Phone Number' style={Input.InputField} />
                <TextInput placeholder='Enter Password' style={Input.InputField} />
                <TouchableOpacity style={Input.SignUpButton}>
                    <Text style={Input.SignUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={Input.ALreadyView}>
                <Text style={Input.MainText}>Already a User?</Text>
                <Pressable onPress={() => navigation.navigate('SignIn')}>
                    <Text style={Input.MainTextColor}>Login</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default Signup