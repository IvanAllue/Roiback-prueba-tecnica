/**
 * Listado de los types a ejecutar:
 * @readonly
 * @enum {string}
 * @constant
 * @type {{
 * SET_AVAILABLE_ROOMS_BY_FIREBASE: string,
 * GET_AVAILABLE_ROOMS: string,
 * GET_HOTELS: string,
 * GET_TRANSLATIONS: string,
 * SET_TRANSLATIONS_BY_FIREBASE: string,
 * SET_HOTELS_BY_FIREBASE: string
 * }}
 *---------------------------------------------------------------------------------------------------------------------
 *  @description GET_AVAILABLE_ROOMS -> Activa el saga:  {@link getRooms}.
 * @description SET_AVAILABLE_ROOMS_BY_FIREBASE -> Activa el Reducer:  {@link hotelReducerGetAvailableRooms}.
 * @description GET_HOTELS -> Activa el Reducer:  {@link getHotels}.
 * @description SET_HOTELS_BY_FIREBASE -> Activa el Reducer: {@link hotelReducerGetHotelList}.
 * @description GET_TRANSLATIONS -> Activa el Reducer: {@link hotelReducerGetHotelList}.
 * @description SET_TRANSLATIONS_BY_FIREBASE -> Activa el Reducer: {@link hotelReducerGetHotelList}.
 *
 *
 * @todo Translations constants
 */
export const REDUX_CONSTANTS = {
    GET_AVAILABLE_ROOMS: 'GET_AVAILABLE_ROOMS',
    SET_AVAILABLE_ROOMS_BY_FIREBASE: 'SET_AVAILABLE_ROOMS_BY_FIREBASE',
    GET_HOTELS: 'GET_HOTELS',
    SET_HOTELS_BY_FIREBASE: 'SET_HOTELS_BY_FIREBASE',
    GET_TRANSLATIONS: 'SET_HOTELS_BY_FIREBASE',
    SET_TRANSLATIONS_BY_FIREBASE: 'SET_HOTELS_BY_FIREBASE',
}

