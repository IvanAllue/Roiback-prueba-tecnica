import {takeEvery} from 'redux-saga/effects'
import {REDUX_CONSTANTS} from "../constants/constants";
import {HotelSagas} from "./HotelSagas";

/**
 * Contiene el listado de sagas (middlewares) que se ejecutan en la aplicaicon.
 * @description Para mas informacion:
 * @see Ver constantes disponibles: {@link REDUX_CONSTANTS}
 * @returns {Generator<SimpleEffect<"FORK", ForkEffectDescriptor<never>>, void, *>}
 */
export default function* sagaGenerator() {
    yield takeEvery(REDUX_CONSTANTS.GET_AVAILABLE_ROOMS, HotelSagas.getRooms)
    yield takeEvery(REDUX_CONSTANTS.GET_HOTELS, HotelSagas.getHotels)
}
