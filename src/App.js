import './App.css';
import HotelSearchList from "./containers/hotel-search/HotelSearchList";
import {useSelector, useDispatch} from "react-redux";
import {REDUX_CONSTANTS} from "./shared/redux/constants/constants";
import styled from "styled-components";
import {Dropdown} from "./shared/components/Dropdown";

const LanguageSelector = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`




/**
 * Obtiene la lista de traducciones de firebase para formar los copys y lanza {@link HotelSearchList}.
 * Tambien controla el lenguaje escogido con un dropdown.
 * @returns {JSX.Element}
 * @constructor
 * @description El lenguaje por defecto sera el del navegador.
 * @see - Listado de constantes redux: {@link REDUX_CONSTANTS}
 */
function App() {
    const storeData = useSelector(state => {
        return {
            translations: state.translationReducerGetTranslations.translations,
            translationsData: state.translationReducerGetCurrentLanguage,
            hotels: state.hotelReducerGetHotelList.hotels
        }

    })
    const dispatch = useDispatch()

    const onSelectOtherLanguage = (dropdownOptionSelected) => {
        getCurrentLanguageCopysDitpatch(dispatch,storeData.translations,dropdownOptionSelected.target.value)
    }

    launchDispatch(storeData, dispatch)

    const showLanguageSelector = () => {
        if (storeData.translations &&
            storeData.translationsData.copys &&
            storeData.hotels
        ) {
            const dropdownOptions = getDropdownOptionsByTranslations(storeData)

            return (
                <LanguageSelector>
                    <Dropdown
                        options={dropdownOptions}
                        label={storeData.translationsData.copys.language}
                        onOptionSelected={onSelectOtherLanguage}
                        value={storeData.translationsData.language}/>
                </LanguageSelector>
            )
        }
    }

    return (
        <div>
            {showLanguageSelector()}
            <HotelSearchList>
            </HotelSearchList>
        </div>
    );
}

/**
 * Transforma los states de copys en opciones del dropdown para poder escoger idioma.
 * @param storeData {{
 *     hotels: Array.<HotelDTO>,
 *     translations: any,
 *     translationsData: {
 *         copys: any,
 *         language: string
 *     }
 * }} - Datos del store traidos de firebase almacenado en {@link App}.
 * @returns {Array.<{code: string, name:string}>} - Opciones del dropdown
 */
function getDropdownOptionsByTranslations(storeData) {
    const dropdownOptions = []
    Object.keys(storeData.translations).forEach((translationCountry) => {
        switch (translationCountry) {
            case 'en':
                dropdownOptions.push({
                    code: 'en-EN', name: storeData.translationsData.copys.languages.english
                })
                break;
            case 'es':
                dropdownOptions.push({
                    code: 'es-ES', name: storeData.translationsData.copys.languages.spanish
                })
                break;
        }
    })

    return dropdownOptions

}

/**
 * Lanza los dispatch para obtener las traducciones o los copys.
 *   @param storeData - State almacenado en {@link App}
 * @param dispatch - Constante obtenida con useDispatch para poder lanzar los respectivos dispatch.
 * @example
 * //Funcionamiento:
 * 1. Si no tenemos traducciones lanzamos 'GET_TRANSLATIONS' para traerlas.
 * 2. Si tenemos traducciones pero no los copys especificos lanzamos el metodogetCurrentLanguageCopysDitpatch
 * @see - Metodo get copys {@link metodogetCurrentLanguageCopysDitpatch} redux constants {@link REDUX_CONSTANTS}
 */
function launchDispatch(storeData, dispatch) {
    const applicationLanguage = navigator.language === 'es-ES' || navigator.language === 'en-EN' ? navigator.language : navigator.language

    if (!storeData.translations) {
        dispatch({type: REDUX_CONSTANTS.GET_TRANSLATIONS})
    } else {
        if (!storeData.translationsData.copys) {
            getCurrentLanguageCopysDitpatch(dispatch, storeData.translations, applicationLanguage)
        }
    }
}

/**
 * Ejecuta el dispatch GET_CURRENT_LANGUAGE_COPYS para obtener los copys a utilizar en la aplicacion.
 * @param dispatch - Constante dispatch para poder ejecutar el respectivo dispatch
 * @param translations - Traducciones almacenadas en el Store para obtener la del idioma seleccionado
 * @param language - Idioma seleccionado, o en su defecto lenguaje del navegador.
 */
function getCurrentLanguageCopysDitpatch(dispatch, translations, language) {
    dispatch({
        type: REDUX_CONSTANTS.GET_CURRENT_LANGUAGE_COPYS, data: {
            translations: translations,
            language: language
        }
    })
}
export default App;
