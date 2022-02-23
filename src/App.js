import './App.css';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Component } from 'react';
import REDUX_CONSTANTS from './shared/redux/constants/constants';
import Dropdown from './shared/components/Dropdown';
import LoadingComponent from './shared/components/LoadingComponent';
import HotelSearchList from './containers/hotel-search/HotelSearchList';

/**
 * Renderiza el contenedor del dropdown para seleccionar idiomas.
 * @description En el dropdown, si no se ha seleccionado ningun idioma (Estado inicial), se seleccionara el idioma del navegador
 * por defecto.
 * @type {StyledComponent<"div", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
const LanguageSelector = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

/**
 * Renderizxa el contenedor de la linea de progreso (Cargando)
 * @type {StyledComponent<"div", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
const LoadingContainer = styled.div`
  margin: 5px
`;

/**
 * Se conecta con el store para obtener las traducciones de firebase y los copys. Despues renderiza {@link HotelSearchList} y un dropdown
 * selector de idiomas: {@link LanguageSelector}
 * @class
 * @returns {JSX.Element} - Elementos JSX que, en resumen, forman toda la aplicacion.
 * @see - Listado de constantes redux: {@link REDUX_CONSTANTS}
 */
class App extends Component {
    /**
     * Constructor
     * @description Obtiene los states asi como los dispartch del store y ejecuta el dispatch: {@link translationReducerGetTranslations}
     * @method
     * @param props {{
     *   rooms: Array|Array.<RoomDTO>,
     *  hotels: Array|Array.<{code: string, name: string}>,
     *  translations: any,
     *  copys: any,
     *  getTranslations: function(),
     *  getHotels: function()
     * }}
     *
     * @see {@link REDUX_CONSTANTS}
     */
    constructor(props) {
        super(props);
        props.getTranslations();
        props.getHotels();
    }

    /**
     * comprueba que sea necesario obtener la lista de copys y de ser asi lanza: {@link translationReducerGetCurrentLanguage }
     * @see {@link REDUX_CONSTANTS}
     */
    componentDidUpdate() {
        const { props } = this;
        if (props && props.translations && !props.translatedCopys.copys) {
            props.getCopys({
                translations: props.translations,
                language: props.language ? props.language : navigator.language,
            });
        }
    }

    /**
     * crea las opciones del dropdown para elegir paises segun los idiomas de firebase.
     * @returns {Array.<{code: string, name:string}>} - Opciones del dropdown donde code sera el codigo del idioma seleccionado y name
     * su nombre.
     */
    getDropdownOptionsByTranslations() {
        const { translations, translatedCopys } = this.props;
        const dropdownOptions = [];
        Object.keys(translations).forEach((translationCountry) => {
            switch (translationCountry) {
            case 'en':
                dropdownOptions.push({
                    code: 'en-EN', name: translatedCopys.copys.languages.english,
                });
                break;
            case 'es':
                dropdownOptions.push({
                    code: 'es-ES', name: translatedCopys.copys.languages.spanish,
                });
                break;
            default:
            }
        });

        return dropdownOptions;
    }

    /**
     * Metodo que se ejecuta en {@link LanguageSelector} cada vez que se selecciona un nuevo idioma, lanzando el reducer
     * {@link translationReducerGetCurrentLanguage} con el nuevo idioma.
     * @param dropdownOptionSelected - Opcion del dropdown seleccionada.
     */
    onSelectOtherLanguage = (dropdownOptionSelected) => {
        const { props } = this;
        props.getCopys({
            translations: props.translations,
            language: dropdownOptionSelected.target.value,
        });
    };

    /**
     * Renderiza el selector de lenguajes siempre que se den las condiciones adecuadas (Hotels, translations y copus).
     * Sino renderiza {@link LoadingContainer}.
     * @returns {JSX.Element|*}
     */
    showLanguageSelector = () => {
        const dropdownOptions = this.getDropdownOptionsByTranslations();
        const { translatedCopys } = this.props;

        return (
            <LanguageSelector>
                <Dropdown
                  options={dropdownOptions}
                  label={translatedCopys.copys.language}
                  onOptionSelected={this.onSelectOtherLanguage}
                  value={translatedCopys.language}
                />
            </LanguageSelector>
        );
    };

    /**
     * Renderiza App.
     * @returns {JSX.Element}
     */
    render() {
        const { translations, translatedCopys, hotels } = this.props;
        if (
            translations && translatedCopys && translatedCopys.copys && hotels.length > 0
        ) {
            return (
                <div>
                    {this.showLanguageSelector()}
                    <HotelSearchList />
                </div>
            );
        }
        return (
            <LoadingContainer id="linearLoading">
                <LoadingComponent type="linear" size={7} />
            </LoadingContainer>
        );
    }
}

/**
 * Obtiene del Store los hoteles, copys, traducciones y rooms.
 * @param state {{
 *      hotelReducerGetHotelList: {hotels: Array |Array.<HotelDTO>},
 *      hotelReducerGetAvailableRooms: {rooms: Array |Array.<RoomsDTO>},
 *      translationReducerGetTranslations: {translations: any},
 *      translationReducerGetCurrentLanguage: {copys: any},
 * }}
 * @returns {{
 * rooms: Array|Array.<RoomDTO>,
 * hotels: Array|Array.<{code: string, name: string}>,
 * translations: any,
 * copys: any}}
 * @see - Listado de reducers: {@link reducerList}
 */
const mapStateToProps = (state) => ({
    hotels: state.hotelReducerGetHotelList.hotels,
    rooms: state.hotelReducerGetAvailableRooms.rooms,
    translatedCopys: state.translationReducerGetCurrentLanguage,
    translations: state.translationReducerGetTranslations.translations,
});

const mapDispatchToProps = (dispatch) => ({
    getTranslations: () => dispatch({ type: REDUX_CONSTANTS.GET_TRANSLATIONS }),
    getCopys: ({ translations, language }) => dispatch({
        type: REDUX_CONSTANTS.GET_CURRENT_LANGUAGE_COPYS,
        data: {
            translations,
            language,
        },
    }),
    getHotels: () => dispatch({ type: REDUX_CONSTANTS.GET_HOTELS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
