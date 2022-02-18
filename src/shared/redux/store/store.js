import {applyMiddleware, createStore} from "redux";
import {reducerList} from "../reducers/reducers";
import createSagaMiddleware from 'redux-saga'
import sagaGenerator from "../sagas/sagas";

const sagaMiddleware = createSagaMiddleware()

/**
 * Store con los reducers listados en: {@link reducerList} y los sagas listados en {@link sagaGenerator}.
 * @type {Store<EmptyObject & StateFromReducersMapObject<{hotelReducerGetHotelList: function(): {hotels: HotelDTO[]}, hotelReducerGetAvailableRooms: function(*=, *): {rooms: *[]}}> & S, A> & Store<S, A> & {dispatch: {}}}
 */
const store = createStore(reducerList, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagaGenerator)

export default store;
