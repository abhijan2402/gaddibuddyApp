import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Input } from '../../CommanStyles/InputSyles';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const BoardingScreen = ({ navigation }) => {
    return (
        <View style={Input.MainView}>
            <View style={Input.LogoView}>
                <Image source={{ uri: "https://s3-alpha-sig.figma.com/img/81c2/a2f9/ad6fcc725874137d639c942051eefd36?Expires=1681689600&Signature=axMxo--hkb-qpGFOYQiujj6YRLJoHt7HpUW-u382d0IMTJXa~jBNdYu4swZNT83Qzifo5RUHutVEUhFoWMwSODVZ39vSrJLHevKJT17QWdXaUe3sko5q3Wk9qap1X6ALJlWTRMAiG68rZkeP6monpkftOt8dgmBXoFJfctPBNe1eLOLkUkRqooNXjytvDJR5vi8-1KKK~hSZuLx6Y-LdC1kpsBG--iE~9kOEk~aVUJ4cLlIcHhWF-vlxHpO1bParSWIG-GTUH1DfqjeQH-bcx69BncgXYIEqan0ZIBs20rQes1XFl9lum98pPvG5pESSGwx~Q~qMX6Bg6cHR0CHvgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" }} style={[Input.ImageLogo]} />
            </View>
            <View style={styles.Footer}>
                <View style={styles.WelcomeView}>
                    <Text style={styles.WelcomeText}>Welcome to gaadibuddy</Text>
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
        </View>
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