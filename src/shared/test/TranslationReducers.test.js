import {translationReducerGetCurrentLanguage, translationReducerGetTranslations} from "../redux/reducers/TranslationReducers";
import {REDUX_CONSTANTS} from "../redux/constants/constants";
import {TESTING_CONSTANTS} from "./testingConstants";

const spanishJSON = TESTING_CONSTANTS.MOCKS.SPANISH_COPYS
const englishJson = TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS

/**
 * Validacion que los reducers de traducciones funcionan bien
 */
describe('Validacion que los reducers de traducciones funcionan bien', () => {

    it('SET_TRANSLATIONS_BY_FIREBASE Procesamiento de translations desde firebase', () => {
        const dispatchSimulate = translationReducerGetTranslations(null, {
            type: REDUX_CONSTANTS.SET_TRANSLATIONS_BY_FIREBASE,
            translations: TESTING_CONSTANTS.FIREBASE.TRANSLATIONS
        })

        expect(dispatchSimulate).toEqual({
            translations: TESTING_CONSTANTS.STORE.TRANSLATIONS
        })

    })


    it('GET_CURRENT_LANGUAGE_COPYS  Procesamiento de copys (ES) desde translations', () => {
        const dispatchSimulate = translationReducerGetCurrentLanguage(null, {
            type: REDUX_CONSTANTS.GET_CURRENT_LANGUAGE_COPYS, data: {
                translations: TESTING_CONSTANTS.STORE.TRANSLATIONS,
                language: "es-ES"
            }
        })
        expect(dispatchSimulate).toEqual(TESTING_CONSTANTS.MOCKS.SPANISH_COPYS)
    })

    it('GET_CURRENT_LANGUAGE_COPYS  Procesamiento de copys (EN) desde translations', () => {
        const dispatchSimulate = translationReducerGetCurrentLanguage(null, {
            type: REDUX_CONSTANTS.GET_CURRENT_LANGUAGE_COPYS, data: {
                translations: TESTING_CONSTANTS.STORE.TRANSLATIONS,
                language: "en-EN"
            }
        })
        expect(dispatchSimulate).toEqual(TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS)
    })

    it('GET_CURRENT_LANGUAGE_COPYS  Procesamiento de copys (EN) desde translations (language No ES/EN)', () => {
        const dispatchSimulate = translationReducerGetCurrentLanguage(null, {
            type: REDUX_CONSTANTS.GET_CURRENT_LANGUAGE_COPYS, data: {
                translations: TESTING_CONSTANTS.STORE.TRANSLATIONS,
                language: "pt-PT"
            }
        })
        expect(dispatchSimulate).toEqual(TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS)
    })

});
