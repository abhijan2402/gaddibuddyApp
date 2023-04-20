import { authtypes } from "../constants/userConstant"



const setUserID = (userID) => {
    return {
        type: authtypes.SET_USER_UID,
        payload: userID
    }
}
const setUserDetails = (user) => {
    return {
        type: authtypes.SET_USER_DETAILS,
        payload: user
    }
}
export { setUserID, setUserDetails }