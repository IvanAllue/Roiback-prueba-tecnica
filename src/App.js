import './App.css';
import HotelSearchList from "./containers/hotel-search/HotelSearchList";
import {useSelector, useDispatch} from "react-redux";
import {REDUX_CONSTANTS} from "./shared/redux/constants/constants";

/**
 * Lanza las peticiones para obtener las traducciones y renderiza el componente {@link HotelSearchList}
 * @example
 * //Funcionamiento:
 * 1.- Si no tenemos traducciones las conseguimos. (En App.js porque serian para toda la aplicacion).
 * 2.- Si tenemos las traducciones lanzamos el reducer para guardar en el store los copys del pais elegido.
 * 3.- Renderizamos HotelSearchList
 * @returns {JSX.Element}
 * @constructor
 *
 * @see - Listado de constantes redux: {@link REDUX_CONSTANTS}
 */
function App() {
    const dispatch = useDispatch()

    const translations = useSelector(state => {
        return state.translationReducerGetTranslations.translations
    })

    if (!translations) {
        dispatch({type: REDUX_CONSTANTS.GET_TRANSLATIONS})
    } else {
        dispatch({
            type: REDUX_CONSTANTS.GET_CURRENT_LANGUAGE_COPYS, data: {
                translations,
                language: navigator.language
            }
        })
    }

    return (
        <div>
            <HotelSearchList>

            </HotelSearchList>
        </div>
    );
}

export default App;
