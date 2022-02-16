import {createStore} from "redux";
import {reducerList} from "../reducers";


const store = createStore(reducerList)

export default store;
