import {createStore} from "redux";
import {getHotelList} from "../reducers/Hotel";

const store = createStore(getHotelList)

export default store;
