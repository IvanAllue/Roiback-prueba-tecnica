import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'react-redux';
import FilterElements from '../../shared/components/FilterElements';
import SearchFailed from '../../shared/components/NoResultsComponent';
import RoomsList from './components/RoomsList';
import REDUX_CONSTANTS from '../../shared/redux/constants/constants';
import LoadingComponent from '../../shared/components/LoadingComponent';

const Results = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: center;

  @media (max-width: 950px) {
    padding-top: 2rem;
  }
`;

/**
 * Componente con el filtro para buscar habitaciones {@link FilterElements}. Muestra el resultado: {@link Results} o, si la busqueda
 * falla o no se ha hecho ninguna muestra {@link SearchFailed}.
 * @description (Requiere acceso al Storage).
 * @class
 * @example
 * <HotelSearchList />
 */
class HotelSearchList extends Component {
    /**
     * @constructor
     * @param props {{
     *      copys: any;
     *      getAvailableRooms: function();
     *      hotels: Array.<HotelDTO>;
     *      rooms: Array.<RoomDTO>;
     * }}
     */
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            searchQuery: null,
        };
    }

    /**
     * Comprueba si loading esta a true y si las rooms ya han cargado para poner loading a false.
     */
    componentDidUpdate() {
        const { state, props } = this;
        if (state.loading && props.rooms && props.rooms.length > 0) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                loading: false,
            });
        }
    }

    /**
     * Se ejecuta cuando el usuario pulsa el boton CHECK AVAILABILITY en el componente {@link FilterElements}.
     * @method
     * @param searchQuery {{
     *     hotelSelected: string,
     *     checkInDate: moment.Moment,
     *     checkOutDate: moment.Moment,
     * }} - Query a realizar con el codigo del hotel, fecha de entrada y de salida..
     */
    onSendAvailability = (searchQuery) => {
        const { props } = this;
        props.getAvailableRooms();
        this.setState({
            searchQuery,
            loading: true,
        });
    };

    /**
     * Devuelve un componente JSX en funcion del estado actual:
     *  @method
     *
     * @example
     * Caso 1: El usuario SI realizo una busqueda y esta SI arrojo datos mostramos
     *
     * Caso 2: El usuario realizo una busqueda y esta NO arrojo datos mostramos
     * indicando que la busqueda que hizo fallo.
     *
     * Caso 3: El usuario NO realizo una busqueda y entonces NO hay datos mostramos
     * indicando que haga una busqueda.
     *
     * Caso 4: Cargando
     *
     * @see - Caso 1: {@link RoomsList}. Caso 2 y 3: {@link SearchFailed}
     *
     * @returns {JSX.Element}
     */
    getResultsComponent() {
        const { state, props } = this;
        const { copys } = props;
        if (!state.loading) {
            if (props.rooms && props.rooms.length > 0) {
                return <RoomsList roomList={props.rooms} searchQuery={state.searchQuery} />;
            }
            if (state.searchQuery) {
                return (
                    <SearchFailed
                      title={copys.checkAvailability}
                      subtitle={copys.noResultsWarning.afterSearch}
                    />
                );
            }
            return (
                <SearchFailed
                  title={copys.checkAvailability}
                  subtitle={copys.noResultsWarning ? copys.noResultsWarning.beforeSearch : ''}
                />
            );
        }
        return <LoadingComponent />;
    }

    /**
     * Renderiza HotelSearchList
     * @method
     * @example:
     * Caso 1: No hay hoteles o traducciones en el store (props.hotels): Mostramos spinner
     *
     * Caso 2: Hay hoteles en el store (props.hotels) Mostramos FilterElements y getResultsComponent
     *
     * @see - Componente filtros: {@link FilterElements}, componente resultados: {@link getResultsComponent}
     *
     * @returns {JSX.Element}
     */
    render() {
        const { props } = this;
        if (
            props.hotels
            && props.hotels.length > 0
            && props.copys
        ) {
            return (
                <div>
                    <FilterElements
                      onSendAvailability={this.onSendAvailability}
                      hotels={props.hotels}
                      copys={{
                            dropdownLabel: props.copys.selectAHotel,
                            firstDatePickerLabel: props.copys.checkIn,
                            secondDatePickerLabel: props.copys.checkOut,
                            buttonLabel: props.copys.checkAvailability,
                        }}
                    />
                    <Results>
                        {this.getResultsComponent()}
                    </Results>
                </div>

            );
        }
        return (<div />);
    }
}

/**
 * Obtiene del Store los hoteles, rooms y habitaciones.
 * @param state
 * @returns {{
 * rooms: Array|Array.<RoomDTO>,
 * hotels: Array|Array.<{code: string, name: string}>,
 * copys: any}}
 * @see - Listado de reducers: {@link reducerList}
 */
const mapStateToProps = (state) => ({
    hotels: state.hotelReducerGetHotelList.hotels,
    rooms: state.hotelReducerGetAvailableRooms.rooms,
    copys: state.translationReducerGetCurrentLanguage.copys,
});

/**
 * Inyecta en los props del componente los dispatch del saga {@link getAvailableRooms}
 * @param dispatch
 * @returns {{ getAvailableRooms: (function(): *)}}
 *
 * @see - Types disponibles: {@link REDUX_CONSTANTS}
 */
const mapDispatchToProps = (dispatch) => ({
    getAvailableRooms: () => dispatch({ type: REDUX_CONSTANTS.GET_AVAILABLE_ROOMS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchList);
