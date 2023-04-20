import { combineReducers } from "redux";
import userReducer from "./userReducer";


const rootreducer = combineReducers({
    user: userReducer,
})

export default rootreducer;