import { render, screen } from '@testing-library/react';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sagaGenerator from '../redux/sagas/sagas';
import App from '../../App';
import TESTING_CONSTANTS from './testingConstants';

/**
 * Lanza los test de App.
 * @see {@link App}
 */
describe('Test del componente App', () => {
    const sagaMiddleware = createSagaMiddleware();
    const mockStore = configureStore([sagaMiddleware]);
    let store = mockStore(TESTING_CONSTANTS.STORE.EMPTY_STORE);
    sagaMiddleware.run(sagaGenerator);

    /**
     * Si no falla es que se ha renderizado el componente App.
     */
    it('App render HotelSearchList', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );
    });

    /**
     * Comprobamos las reglas para mostrar la progress bar:
     * @description Reglas: No tener translations, no tener copys y no tener hotels
     */
    it('Comprobamos las reglas para mostrar la progress bar:', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    /**
     * Comprobamos las reglas para mostrar la progress bar (TRANSLATIONS):
     * @description Reglas: No tener translations, no tener copys y no tener hotels
     */
    it('Comprobamos las reglas para mostrar la progress bar (TRANSLATIONS):', () => {
        const testStore = TESTING_CONSTANTS.STORE.EMPTY_STORE;
        testStore.translationReducerGetTranslations.translations = TESTING_CONSTANTS.STORE.TRANSLATIONS;
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    /**
     * Comprobamos las reglas para mostrar la progress bar (TRANSLATIONS + COPYS):
     * @description Reglas: No tener translations, no tener copys y no tener hotels
     */
    it('Comprobamos las reglas para mostrar la progress bar (TRANSLATIONS + COPYS):', () => {
        const testStore = TESTING_CONSTANTS.STORE.EMPTY_STORE;
        testStore.translationReducerGetTranslations.translations = TESTING_CONSTANTS.STORE.TRANSLATIONS;
        testStore.translationReducerGetCurrentLanguage = TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS;

        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    /**
     * Comprobamos las reglas para mostrar el dropdown selector de lenguajes:
     * @description Reglas: COPYS, TRANSLATIONS y HOTELS no debe  estar vacio.
     */
    it('Comprobamos las reglas para mostrar el dropdown selector de lenguajes:', () => {
        const testStore = TESTING_CONSTANTS.STORE.EMPTY_STORE;
        testStore.translationReducerGetTranslations.translations = TESTING_CONSTANTS.STORE.TRANSLATIONS;
        testStore.translationReducerGetCurrentLanguage = TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS;
        store = mockStore(testStore);
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    /**
     * Comprobamos que al cambiar de idiomas cambian los textos en el dropdown (Español):
     */
    it('Comprobamos que al cambiar de idiomas cambian los textos en el dropdown (Español):', () => {
        const testStore = TESTING_CONSTANTS.STORE.EMPTY_STORE;
        testStore.translationReducerGetTranslations.translations = TESTING_CONSTANTS.STORE.TRANSLATIONS;
        testStore.translationReducerGetCurrentLanguage = TESTING_CONSTANTS.MOCKS.SPANISH_COPYS;
        store = mockStore(testStore);
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );
        expect(screen.getByText('Español')).toBeInTheDocument();
    });

    /**
     * Comprobamos que al cambiar de idiomas cambian los textos en el dropdown (Ingles):
     */
    it('Comprobamos que al cambiar de idiomas cambian los textos en el dropdown (Ingles):', () => {
        const testStore = TESTING_CONSTANTS.STORE.EMPTY_STORE;
        testStore.translationReducerGetTranslations.translations = TESTING_CONSTANTS.STORE.TRANSLATIONS;
        testStore.translationReducerGetCurrentLanguage = TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS;
        store = mockStore(testStore);
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );
        expect(screen.getByText('Spanish')).toBeInTheDocument();
    });

    /**
     * Si tenemos TRANSLATIONS, COPYS y HOTELS renderizamos los filtros.
     * @description El dropdown dentro de filtros tendra la label de selectAHotel, por lo que comprobamos
     * que el texto este renderizado.
     */
    it('Si tenemos TRANSLATIONS, COPYS Y HOTELS Se renderiza HotelSearchList', () => {
        const testStore = TESTING_CONSTANTS.STORE.EMPTY_STORE;
        testStore.translationReducerGetTranslations.translations = TESTING_CONSTANTS.STORE.TRANSLATIONS;
        testStore.translationReducerGetCurrentLanguage = TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS;
        testStore.hotelReducerGetHotelList.hotels = TESTING_CONSTANTS.STORE.HOTELS;
        store = mockStore(testStore);
        render(
            <Provider store={store}>
                <App />
            </Provider>,
        );
        const labelDropdown = TESTING_CONSTANTS.STORE.CURRENT_LANGUAGE_COPYS.copys.selectAHotel;

        expect(screen.getByText(labelDropdown)).toBeInTheDocument();
    });
});
