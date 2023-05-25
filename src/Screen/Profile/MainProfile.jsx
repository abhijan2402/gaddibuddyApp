import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Pressable, Alert, Modal, Image } from 'react-native'
import { Input } from '../../CommanStyles/InputSyles';
import { useEffect, useState, useRef } from 'react';
import { Modals } from '../../CommanStyles/ModalStyles';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserDetails } from '../../redux/actions/userAction';
import Toast from '../../Components/Toast';



const MainProfile = () => {
    const { userID, user } = useSelector(state => state.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [iD, setID] = useState("")
    const [updatedName, setupdatedName] = useState("")
    const [updatedPass, setupdatedPass] = useState("")

    const childRef = useRef(null);
    const [toastColorState, setToastColorState] = useState('rgba(41,250,25,1)');
    const [toastTextColorState, setToastTextColorState] = useState('black');
    const [toastMessage, setToastMessage] = useState('');


    const dispatch = useDispatch();


    useEffect(() => {
        console.log(userID, "I am userID");
        setupdatedName(userID.name)
        setupdatedPass(userID.password)
    }, [])


    const UpdateProfile = async () => {
        console.log("Test");
        const data = {
            name: "Abhishek Jan",
            password: "123456",
            status: "Active",
            mobileNo: "7976114618",
            serviceStartDate: "2023-04-28T06:57:54.020Z"
        }
        console.log("Test");
        console.log(JSON.stringify(data));
        try {
            const response = await fetch(`https://gaadibuddy.com/api/cleaners/${iD}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.parse(JSON.stringify(data))
            });
            const result = await response.json();
            console.log("Success!!!!!:", result);
            const finalVal = result.cleaner
            dispatch(setUserID(finalVal))
            console.log(userID, "i am valueooo");

            // setloader(false)
            setToastMessage("User details Updated");
            setToastTextColorState("white")
            setToastColorState("green")
            // setLoading(false)
            childRef.current.showToast();
            setModalVisible(false)

        } catch (error) {
            console.log(error, 'jj')
            setToastMessage("Error in updating profile");
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
            <View style={styles.MainView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <View style={styles.ProfileView}>
                    <Text style={styles.ProfileText}>Name :{userID.name} </Text>
                    {/* <Text style={styles.ProfileText}>Email : abhishek.jangid643@gmail.com</Text> */}
                    <Text style={styles.ProfileText}>Password :{userID.password}</Text>
                    <Text style={styles.ProfileText}>Mobile Number :{userID.mobileNo}</Text>

                </View>
                {/* <TouchableOpacity style={[Input.SignUpButton, { marginHorizontal: 30 }]} onPress={() => setModalVisible(true)}>
                    <Text style={Input.SignUpButtonText}>Edit Profile</Text>
                </TouchableOpacity> */}
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
                            <TextInput value={updatedName} placeholderTextColor={"black"} style={Modals.Input} onChangeText={(value) => { setupdatedName(value) }} />
                            <TextInput value={updatedPass} placeholderTextColor={"black"} style={Modals.Input} onChangeText={(value) => { setupdatedPass(value) }} />
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