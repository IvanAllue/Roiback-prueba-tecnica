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
            translations: action.translations
        }
    }
    return state

}

/**
 * Creado en {@link reducerList}, obtiene todas las traducciones y guarda en el Storage como copys los textos de
 * toda la aplicacion en un idioma en especifico.
 *
 * @param state {{copys: {}}} - State en Redux, valor inicial un objeto vacio.
 *
 * @param action {{type: REDUX_CONSTANTS, [data]: {
 *     language: "es-ES" | "en-EN" | string;
 *     translations: {
 *         es: any;
 *         en: any;
 *     }
 * }}} - Accion de redux. En data obtiene todos los textos traducidos y el idioma en especifico deseado.
 *
 * @returns  {{copys: any}} - Devuelve uun objeto vacio si no tenemos traducciones o un JSON con las traducciones del
 * pais en especifico
 *
 * @see Ver constantes disponibles: {@link REDUX_CONSTANTS}
 *
 *
 */
export const translationReducerGetCurrentLanguage = (state = {copys: {}}, action) => {
    if (action.type === REDUX_CONSTANTS.GET_CURRENT_LANGUAGE_COPYS) {
        const {language, translations} = action.data;

        switch (language) {
            case 'en-EN':
                return {
                    copys: translations.en
                }
            case 'es-ES':
                return {
                    copys: translations.es
                }
            default:
                return {
                    copys: translations.en
                }
        }
    }
    return state

}
