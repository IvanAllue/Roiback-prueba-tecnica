import {prettyDOM, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import {RoomsList} from "../../containers/hotel-search/components/RoomsList";
import moment from "moment";
import {TESTING_CONSTANTS} from "./testingConstants";
import sagaGenerator from "../redux/sagas/sagas";


/**
 * Valida que la lista de rooms se vea correctamente
 */
describe('Room list visuals', () => {
    const sagaMiddleware = createSagaMiddleware();
    const mockStore = configureStore([sagaMiddleware]);
    let store = mockStore(TESTING_CONSTANTS.STORE.EMPTY_STORE)
    sagaMiddleware.run(sagaGenerator)

    beforeAll(() => {
        const storeObject = TESTING_CONSTANTS.STORE.EMPTY_STORE;
        storeObject.translationReducerGetCurrentLanguage = TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS
        store = mockStore(storeObject)
    })

    /**
     * Comprueba que roomlist se renderiza comprobando que el nombre de la primera habitacion
     * esta en pantalla
     */
    it('Validacion RoomList se ha ejecutado', () => {
        render(
            <Provider store={store}>
                <RoomsList roomList={TESTING_CONSTANTS.STORE.ROOMS}
                           searchQuery={TESTING_CONSTANTS.ROOM_LIST.SEARCH_QUERY}/>
            </Provider>
        )

        console.log(prettyDOM(screen.container))
        expect(screen.getByText(TESTING_CONSTANTS.STORE.ROOMS[0].roomName)).toBeInTheDocument()
    })

    /**
     * Comprueba que la query que se muestra tiene los dias indicados y la diferencia de noches correcta.
     * Son fechas fijas para que el calculo manual sea correcto: 21 al 25: 4 noches
     */
    it('Comprueba que el calculo funcione bien si son varias noches', () => {
        const queryText = `1 Types of rooms available at Hotel from 21/02/2022 to 25/02/2022 (4 nights)`

        const searchQuery = TESTING_CONSTANTS.ROOM_LIST.SEARCH_QUERY;
        searchQuery.checkInDate = moment('21/02/2022', 'DD/MM/YYYY').startOf('d');
        searchQuery.checkOutDate = moment('25/02/2022', 'DD/MM/YYYY').startOf('d');


        render(
            <Provider store={store}>
                <RoomsList roomList={TESTING_CONSTANTS.STORE.ROOMS} searchQuery={searchQuery}/>
            </Provider>
        )

        expect(screen.getByText(queryText)).toBeInTheDocument()
    })

    /**
     * Comprueba que la query que se muestra tiene los dias indicados y la diferencia de noches correcta.
     * Son fechas fijas para que el calculo manual sea correcto: 24 al 25: 1 noche.
     * Noche debe aparecer en singular
     */
    it('Comprueba que el calculo funcione bien si es una noche', () => {
        const queryText = `1 Types of rooms available at Hotel from 28/02/2022 to 01/03/2022 (1 night)`

        const searchQuery = TESTING_CONSTANTS.ROOM_LIST.SEARCH_QUERY;
        searchQuery.checkInDate = moment('28/02/2022', 'DD/MM/YYYY').startOf('d');
        searchQuery.checkOutDate = moment('01/03/2022', 'DD/MM/YYYY').startOf('d');

        render(
            <Provider store={store}>
                <RoomsList roomList={TESTING_CONSTANTS.STORE.ROOMS} searchQuery={searchQuery}/>
            </Provider>
        )

        expect(screen.getByText(queryText)).toBeInTheDocument()
    })

    /**
     * Comprueba que si llega mas de una habitacion se pintan ambas habitaciones.
     * Como duplicamos rooms tendran el mismo room name
     */
    it('Comprueba que se renderiza mas de una habitacion', () => {
        const roomList = [
            ...TESTING_CONSTANTS.STORE.ROOMS,
            ...TESTING_CONSTANTS.STORE.ROOMS
        ]


        render(
            <Provider store={store}>
                <RoomsList roomList={roomList}
                           searchQuery={TESTING_CONSTANTS.ROOM_LIST.SEARCH_QUERY}/>
            </Provider>
        )

        expect(screen.getAllByText(TESTING_CONSTANTS.STORE.ROOMS[0].roomName).length).toBe(2)


    })

})
