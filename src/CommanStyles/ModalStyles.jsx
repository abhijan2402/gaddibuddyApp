import { StyleSheet, Text, View, Dimensions } from 'react-native'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
export const Modals = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        width: windoWidth / 1.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: "700",
        color: "black",
        fontSize: 18,
        // borderWidth: 1,
        width: windoWidth / 2,
        marginLeft: 20
    },
    Input: {
        borderWidth: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    CrossIcon: {
        width: 20,
        height: 20
    },
    Disp: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }
})