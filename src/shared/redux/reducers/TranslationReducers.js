import {REDUX_CONSTANTS} from "../constants/constants";

/**
 * Creado en {@link reducerList}, almacena en el store el listado de translations de firebase. Ejecutado a traves
 * de {@link getTranslations}.
 *
 * @param state {{ translations:null | any}} - State en Redux, valor inicial de translations: null.
 *
 * @param action {{type: REDUX_CONSTANTS, [translations]: any}} - Accion de redux. Action debe contener translations
 * cuando venga del saga.
 *
 * @returns  {{translations: [] | any[]}} - Devuelve null por defecto o las traducciones es o en cuando viene del saga
 *
 * @see Ver constantes disponibles: {@link REDUX_CONSTANTS}
 *
 *
 */
export const translationReducerGetTranslations = (state = {translations: null}, action) => {
    if (action.type === REDUX_CONSTANTS.SET_TRANSLATIONS_BY_FIREBASE) {
        return {
            translations:  action.translations
        }
    }
    return state

}
