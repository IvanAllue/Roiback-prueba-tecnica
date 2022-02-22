import {FilterElements} from "../../shared/components/FilterElements";
import {SearchFailed} from "../../shared/components/NoResultsComponent";
import styled from "styled-components";
import {Component} from "react";
import {RoomsList} from "./components/RoomsList";
import {connect} from "react-redux";
import {REDUX_CONSTANTS} from "../../shared/redux/constants/constants";
import {LoadingComponent} from "../../shared/components/LoadingComponent";

const Results = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: center;

  @media (max-width: 950px) {
    padding-top: 2rem;
  }
`

const LoadingContainer = styled.div`
  margin: 5px
`

/**
 * Componente para buscar habitaciones el los hoteles obtenidos por backend y muestra la respuesta obtenida.
 * @class
 * @property onSendAvailability - {@link onSendAvailability}
 * @property getResultsComponent - {@link getResultsComponent}
 * @property render - {@link render}
 */
class HotelSearchList extends Component {
    /** @lends HotelSearchList.prototype */
    /**
     * @constructor
     * @param props {{
     *      copys: any;
     *      getAvailableRooms: function();
     *      getHotels: function();
     *      hotels: HotelDTO[];
     *      rooms: RoomDTO[];
     * }}
     */
    constructor(props) {
        super(props);

        this.state = {
            roomList: [],
            loading: false,
            searchQuery: null
        }
    }

    componentDidMount() {
        this.props.getHotels()
    }

    /**
     * Comprueba si loading esta a true y si las rooms ya han cargado para poner loading a false.
     * @param prevProps - Anterior version de props
     * @param prevState - Anterior version del estado
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.loading && this.props.rooms && this.props.rooms.length > 0) {
            this.setState({
                loading: false
            })
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
        this.props.getAvailableRooms()
        this.setState({
            searchQuery,
            loading: true,
            roomList: []
        })
    }

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
        const {copys} = this.props
        if (!this.state.loading) {
            if (this.props.rooms && this.props.rooms.length > 0) {
                return <RoomsList roomList={this.props.rooms} searchQuery={this.state.searchQuery}/>
            } else if (this.state.searchQuery) {
                return (
                    <SearchFailed
                        title={copys.checkAvailability}
                        subtitle={copys.noResultsWarning.afterSearch}
                    />
                )
            } else {
                return (
                    <SearchFailed
                        title={copys.checkAvailability}
                        subtitle={copys.noResultsWarning ? copys.noResultsWarning.beforeSearch : ''}
                    />
                )
            }
        } else {
            return <LoadingComponent/>
        }
    }

    /**
     * Muestra los componentes en pantalla.
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
        if (
            this.props.hotels &&
            this.props.hotels.length > 0 &&
            this.props.copys
        ) {
            return (
                <div role='hotelSearchList'>
                    <FilterElements onSendAvailability={this.onSendAvailability} hotels={this.props.hotels} copys={{
                        dropdownLabel: this.props.copys.selectAHotel,
                        firstDatePickerLabel: this.props.copys.checkIn,
                        secondDatePickerLabel: this.props.copys.checkOut,
                        buttonLabel: this.props.copys.checkAvailability,
                    }}/>
                    <Results>
                        {this.getResultsComponent()}
                    </Results>
                </div>

            )
        } else {
            return (
                <LoadingContainer id={"linearLoading"}>
                    <LoadingComponent type={"linear"} size={7}/>
                </LoadingContainer>
            )
        }

    }
}

/**
 * Obtiene del Store los hoteles, rooms y habitaciones.
 * @param state
 * @returns {{rooms: ([]|RoomDTO[]|*[]|*), hotels: ([]|{code: string, name: string}[]|*[]|[*, *, *, *]|*), copys: ({dropdownLabel: string, firstDatePickerLabel: string, secondDatePickerLabel: string, buttonLabel: string}|*)}}
 * @see - Listado de reducers: {@link reducerList}
 */
const mapStateToProps = (state) => {
    return {
        hotels: state.hotelReducerGetHotelList.hotels,
        rooms: state.hotelReducerGetAvailableRooms.rooms,
        copys: state.translationReducerGetCurrentLanguage.copys,
    }
}

/**
 * Inyecta en los props del componente los dispatch de los sagas: {@link getHotels} y {@link getAvailableRooms}
 * @param dispatch
 * @returns {{getHotels: (function(): *), getAvailableRooms: (function(): *)}}
 *
 * @see - Types disponibles: {@link REDUX_CONSTANTS}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        getHotels: () => dispatch({type: REDUX_CONSTANTS.GET_HOTELS}),
        getAvailableRooms: () => dispatch({type: REDUX_CONSTANTS.GET_AVAILABLE_ROOMS}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchList);
