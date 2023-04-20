import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Pressable, Alert, Modal, Image } from 'react-native'
import { Input } from '../../CommanStyles/InputSyles';
import { useEffect, useState } from 'react';
import { Modals } from '../../CommanStyles/ModalStyles';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
const MainProfile = () => {
    const { userID, user } = useSelector(state => state.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [iD, setID] = useState("")
    const [updatedName, setupdatedName] = useState("")
    const [updatedPass, setupdatedPass] = useState("")
    useEffect(() => {

        test();
        Dataset();
    }, [])
    const Dataset = () => {
        console.log(userID, "hhh");
    }

    const test = async () => {
        const value = await AsyncStorage.getItem('Userdetails')
        let user = value;
        setname(JSON.parse(user))


        const value1 = await AsyncStorage.getItem('password')
        let user1 = value1;
        setpassword(JSON.parse(user1))


        const value2 = await AsyncStorage.getItem('ID')
        let user2 = value2;
        console.log(user2, "user2");
        setID(JSON.parse(user2))
        // setpassword(JSON.parse(user2))
    }
    const UpdateProfile = async () => {
        console.log("Test");
        const data = {
            name: updatedName,
            password: updatedPass,
            status: 'Active',
            mobileNo: "9799255889",
            serviceStartDate: "2023-04-14T08:57:36.131+00:00"


        }
        try {
            const response = await fetch(`http://192.168.0.185:9000/api/cleaners/${iD}`, {
                method: "PATCH", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Success:", result);

        } catch (error) {
            console.log(error, 'jj')

        }
    }
    return (
        <>
            <View style={styles.MainView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <View style={styles.ProfileView}>
                    <Text style={styles.ProfileText}>Name :{name} </Text>
                    <Text style={styles.ProfileText}>Email : abhishek.jangid643@gmail.com</Text>
                    <Text style={styles.ProfileText}>password :{password}</Text>
                </View>
                <TouchableOpacity style={[Input.SignUpButton, { marginHorizontal: 30 }]} onPress={() => setModalVisible(true)}>
                    <Text style={Input.SignUpButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={Modals.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}>
                    <View style={Modals.centeredView}>
                        <View style={Modals.modalView}>
                            <View style={Modals.Disp}>
                                <Text style={Modals.modalText}>Edit Profile</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/2976/2976286.png" }} style={Modals.CrossIcon} />
                                </TouchableOpacity>
                            </View>
                            <TextInput placeholder={name} placeholderTextColor={"black"} style={Modals.Input} onChangeText={(value) => { setupdatedName(value) }} />
                            <TextInput placeholder={password} placeholderTextColor={"black"} style={Modals.Input} onChangeText={(value) => { setupdatedPass(value) }} />
                            <TouchableOpacity style={[Input.SignUpButton, { marginHorizontal: 30 }]} onPress={UpdateProfile}>
                                <Text style={Input.SignUpButtonText}>Update Profile</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>

            </View>
        </>
    )
}

export default MainProfile

const styles = StyleSheet.create({
    MainView: {
        width: windoWidth,
        height: windoHeight,
        backgroundColor: "white"
    },
    header: {
        height: windoHeight / 12,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: 25,
        color: "black",
        fontWeight: "800"
    },
    ProfileView: {
        borderWidth: 1.5,
        marginHorizontal: 20,
        marginVertical: 20,
        justifyContent: "center",
        paddingLeft: 10,
        borderRadius: 8,
        borderColor: "#EE7523"
    },
    ProfileText: {
        fontSize: 15,
        color: "black",
        marginVertical: 15,
        fontWeight: "700"
    },
})