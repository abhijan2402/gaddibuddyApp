import { authtypes } from "../constants/userConstant";
const initialState = {
    userID: {},
    userDetails: {}
}
const userReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case authtypes.SET_USER_UID:
            return {
                ...state, userID: actions.payload
            }
        case authtypes.SET_USER_DETAILS:
            return {
                ...state, userDetails: actions.payload
            }
        default:
            return state;
    }
}

export default userReducer;