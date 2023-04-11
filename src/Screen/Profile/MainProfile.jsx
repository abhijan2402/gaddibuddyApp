import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Pressable, Alert, Modal, Image } from 'react-native'
import { Input } from '../../CommanStyles/InputSyles';
import { useState } from 'react';
import { Modals } from '../../CommanStyles/ModalStyles';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const MainProfile = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <View style={styles.MainView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <View style={styles.ProfileView}>
                    <Text style={styles.ProfileText}>Name : Abhishek Jangid</Text>
                    <Text style={styles.ProfileText}>Email : abhishek.jangid643@gmail.com</Text>
                    <Text style={styles.ProfileText}>Address : Central Spine Road ,Jaipur</Text>
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
                            <TextInput placeholder='Name' placeholderTextColor={"black"} style={Modals.Input} />
                            <TextInput placeholder='Address' placeholderTextColor={"black"} style={Modals.Input} />
                            <TouchableOpacity style={[Input.SignUpButton, { marginHorizontal: 30 }]} onPress={() => setModalVisible(true)}>
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