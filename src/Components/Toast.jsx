import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Image } from 'react-native';
const { width, height } = Dimensions.get('window');

const Toast = forwardRef((props, ref) => {

    /* 
                how to use
    
                    toastColor=toast body color
                    toastTextColor=toast text color
                    toastMessage=message for toast
                    ref=refernece using useRef hook like below
                    create for usong toast -> const childRef = useRef(null);
                    for calling toast use this -> childRef.current.showToast();
    
    */
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useImperativeHandle(ref, () => ({
        showToast() {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.delay(3000),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                })
            ]).start()
        }
    }));

    const closetoast = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    }
    return (
        <Animated.View style={[styles.toastContainer, {
            backgroundColor: props.toastColor,
            opacity: fadeAnim,
            transform: [
                {
                    translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-20, 0]
                    })
                },
            ]
        }]}>
            <Text style={{ color: props.toastTextColor, fontFamily: "SourceSansPro-Bold", fontWeight: "bold", width: '80%', marginRight: 5, }}>
                {props.toastMessage}
            </Text>
            <TouchableOpacity onPress={() => closetoast()}>
                <Image
                    style={{ width: 20, height: 20, resizeMode: "contain", tintColor: "white" }}
                    source={{ uri: "https://cdn-icons-png.flaticon.com/128/9916/9916878.png" }}
                />
            </TouchableOpacity>
        </Animated.View>
    )
})
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: "center",
        position: "absolute",
        top: 0,
    },
    toastContainer: {
        width: width - 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row',
        padding: 15,
        alignSelf: "center",
        margin: 5,
        zIndex: 200,
        position: "absolute",
        top: 0,
    }
})
export default Toast;
