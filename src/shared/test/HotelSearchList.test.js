import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import HotelSearchList from '../../containers/hotel-search/HotelSearchList';
import sagaGenerator from '../redux/sagas/sagas';
import TESTING_CONSTANTS from './testingConstants';

/**
 * Comprueba los distintos estados de HotelSearchList
 */
describe('Hotel search list validaciones', () => {
    const sagaMiddleware = createSagaMiddleware();
    const mockStore = configureStore([sagaMiddleware]);
    let store = mockStore(TESTING_CONSTANTS.STORE.EMPTY_STORE);
    sagaMiddleware.run(sagaGenerator);

    beforeEach(() => {
        store = mockStore(TESTING_CONSTANTS.STORE.EMPTY_STORE);
    });

    /**
     * Validacion hotelSearchList renderiza NoResultsComponent si tiene COPYS y HOTELS pero no rooms.
     * Esto ocurriria antes de ralizar una busqueda.
     */
    it('Validacion hotelSearchList renderiza NoResultsComponent', () => {
        const newStore = TESTING_CONSTANTS.STORE.EMPTY_STORE;
        newStore.hotelReducerGetHotelList.hotels = TESTING_CONSTANTS.STORE.HOTELS;
        newStore.translationReducerGetCurrentLanguage = TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS;
        store = mockStore(newStore);
        render(
            <Provider store={store}>
                <HotelSearchList />
            </Provider>,
        );
        expect(
            screen.getByText(TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS.copys.noResultsWarning.beforeSearch),
        ).toBeInTheDocument();
    });

    /**
     * Validacion hotelSearchList renderiza las Rooms si tiene:
     * COPYS, HOTELS Y ROOMS
     */
    it('COPYS, HOTELS, ROOMS = ROOM LIST', () => {
        const newStore = TESTING_CONSTANTS.STORE.EMPTY_STORE;
        newStore.hotelReducerGetHotelList.hotels = TESTING_CONSTANTS.STORE.HOTELS;
        newStore.translationReducerGetCurrentLanguage = TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS;
        newStore.hotelReducerGetAvailableRooms.rooms = TESTING_CONSTANTS.STORE.ROOMS;
        store = mockStore(newStore);

        render(
            <Provider store={store}>
                <HotelSearchList />
            </Provider>,
        );

        expect(screen.getByText(TESTING_CONSTANTS.STORE.ROOMS[0].roomName)).toBeInTheDocument();
    });
});
