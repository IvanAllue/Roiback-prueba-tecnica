import { call, put } from 'redux-saga/effects';
import { getDataFromFirebase } from '../../firebase';
import REDUX_CONSTANTS from '../constants/constants';

/**
 * Obtiene la lista de hoteles de firebase que se leeran en el reducer: {@link hotelReducerGetHotelList}
 * @generator
 * @see Ver constantes disponibles: {@link REDUX_CONSTANTS}
 */
function* getHotels() {
    const hotelsDataSnapshot = yield call(getDataFromFirebase, 'hotels');
    yield put({ type: REDUX_CONSTANTS.SET_HOTELS_BY_FIREBASE, hotels: hotelsDataSnapshot.val() });
}

/**
 *  Obtiene la lista de rooms de firebase que se leeran en el reducer: {@link hotelReducerGetAvailableRooms}
 * @generator
 * @see Ver constantes disponibles: {@link REDUX_CONSTANTS}
 */
function* getRooms() {
    const roomsDataSnapshot = yield call(getDataFromFirebase, 'rooms');
    yield put({ type: REDUX_CONSTANTS.SET_AVAILABLE_ROOMS_BY_FIREBASE, rooms: roomsDataSnapshot.val() });
}

/**
 * Devuelve los sagas con los que podemos obtener {@link HotelDTO|hotels} y {@link RoomDTO|rooms}
 * @type {{getHotels: ((function(): Generator<*, void, *>)|*),
 * getRooms: ((function(): Generator<SimpleEffect<"CALL", CallEffectDescriptor<DataSnapshot>>, void, *>)|*)}}
 */
const HotelSagas = {
    getHotels,
    getRooms,
};

export default HotelSagas;
