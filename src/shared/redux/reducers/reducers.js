import { combineReducers } from 'redux';
import { hotelReducerGetAvailableRooms, hotelReducerGetHotelList } from './HotelReducers';
import { translationReducerGetCurrentLanguage, translationReducerGetTranslations } from './TranslationReducers';

/**
 * Listado de reducers de redux, actualmente disponibles:
 * @description {@link hotelReducerGetHotelList} - Reducer que obtiene la lista de hoteles disponibles
 * @description {@link hotelReducerGetAvailableRooms} - Reducer que obtiene la lista de habitaciones disponibles
 * @description {@link translationReducerGetTranslations} - Reducer que obtiene los copys de todos los paises
 * @description {@link translationReducerGetCurrentLanguage} - Reducer que obtiene los copys de un pais en especifico
 * @namespace
 */
const reducerList = combineReducers({
    hotelReducerGetHotelList,
    hotelReducerGetAvailableRooms,
    translationReducerGetTranslations,
    translationReducerGetCurrentLanguage,
});

export default reducerList;
