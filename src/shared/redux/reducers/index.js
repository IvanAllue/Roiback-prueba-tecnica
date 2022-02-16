import {combineReducers} from "redux";
import {hotelReducerGetAvailableRooms, hotelReducerGetHotelList} from "./Hotel";

export const reducerList = combineReducers({
    hotelReducerGetHotelList,
    hotelReducerGetAvailableRooms
})
