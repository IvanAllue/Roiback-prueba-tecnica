import {combineReducers} from "redux";
import {hotelReducerGetAvailableRooms, hotelReducerGetHotelList} from "./HotelReducers";
import {translationReducerGetTranslations} from "./TranslationReducers";

/**
 * Listado de reducers de redux, actualmente disponibles:
 * @description {@link hotelReducerGetHotelList} - Reducer que obtiene la lista de hoteles disponibles
 * @description {@link hotelReducerGetAvailableRooms} - Reducer que obtiene la lista de habitaciones disponibles
 * @namespace
 */
export const reducerList = combineReducers({
    hotelReducerGetHotelList,
    hotelReducerGetAvailableRooms,
    translationReducerGetTranslations,
})
