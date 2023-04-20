import { createStore } from "redux";
import rootreducer from "./reducers";

const configureStore = () => {
    return createStore(rootreducer);
}

export default configureStore;