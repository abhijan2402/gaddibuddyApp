import React, { useState, forwardRef, useContext, useRef, useImperativeHandle, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const App = forwardRef((props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showmodal, setShowModal] = useState(false);
    useImperativeHandle(ref, () => ({
        showAddress() {
            setShowModal(true)
        }
    }));
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showmodal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to confirm the jobs?</Text>
                        <View style={styles.ModalBtns}>
                            <Pressable
                                style={styles.Btns}
                                onPress={() => setShowModal(!showmodal)}>
                                <Text style={styles.textStyle}>No</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.Btns, { backgroundColor: "#EE7523", borderWidth: 0 }]}
                                onPress={() => setShowModal(!showmodal)}>
                                <Text style={[styles.textStyle, { color: "white" }]}>Yes</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
});

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: "5%",
        paddingVertical: "15%",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: windoWidth / 1.3
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: "700",
        color: "black",
        fontSize: 16
    },
    ModalBtns: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "10%"
    },
    Btns: {
        borderWidth: 1,
        marginHorizontal: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 6,
        width: "40%"
    }
});

export default App;