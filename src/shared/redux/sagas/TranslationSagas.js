import { call, put } from 'redux-saga/effects';
import REDUX_CONSTANTS from '../constants/constants';
import { getDataFromFirebase } from '../../firebase';

/**
 * Obtiene la lista de hoteles de firebase que se leeran en el reducer: {@link hotelReducerGetHotelList}
 * @generator
 * @see Ver constantes disponibles: {@link REDUX_CONSTANTS}
 */
function* getTranslations() {
    const translationsDataSnapshot = yield call(getDataFromFirebase, 'translations');
    yield put({
        type: REDUX_CONSTANTS.SET_TRANSLATIONS_BY_FIREBASE,
        translations: translationsDataSnapshot.val(),
    });
}

/**
 * Ejecuta una preticion a Firebase solicitando el path (la query) rooms.
 * @param PATH {'rooms'|'hotels'|'translations'} - Ruta de firebase a la que atacar
 * @returns {Promise<DataSnapshot>} - Promise que, cuando finalice devuelve un DataSnapshot, con .val() podemos ver
 * el contenido de la respuesta.
 * @export
 */
/**
 * Devuelve los sagas con los que podemos obtener
 * @type {{getHotels: ((function(): Generator<*, void, *>)|*), getRooms: ((function(): Generator<SimpleEffect<"CALL",
 * CallEffectDescriptor<DataSnapshot>>, void, *>)|*)}}
 */
const TranslationsSagas = {
    getTranslations,
};

export default TranslationsSagas;
