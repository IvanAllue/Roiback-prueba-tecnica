import {combineReducers} from "redux";
import {hotelReducerGetAvailableRooms, hotelReducerGetHotelList} from "./Hotel";

/**
 * Envia la lista de reducers a utilizar
 */
export const reducerList = combineReducers({
    hotelReducerGetHotelList,
    hotelReducerGetAvailableRooms
})
