import { StyleSheet, Text, View, Dimensions } from 'react-native'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
export const Input = StyleSheet.create({
    InputField: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#EE7523",
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 20
    },
    SignUpButton: {
        marginHorizontal: 10,
        backgroundColor: "#EE7523",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 7,
        marginVertical: 20
    },
    SignUpButtonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "600"
    },
    ImageLogo: {
        width: windoWidth - 50,
        height: windoHeight / 10
    },
    LogoView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: windoHeight / 3,
        alignItems: "center"
    },
    MainView: {
        width: windoWidth,
        height: windoHeight,
        backgroundColor: "white"
    },
    ALreadyView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        justifyContent: "center"
    },
    MainText: {
        fontSize: 17,
        color: "black",
        fontWeight: "600"
    },
    MainTextColor: {
        fontSize: 17,
        color: "#EE7523",
        fontWeight: "800",
        marginHorizontal: 10
    }
})