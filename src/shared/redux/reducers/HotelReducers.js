import {REDUX_CONSTANTS} from "../constants/constants";
import {HotelDTO} from "../../Models/HotelDTO";
import {RoomDTO} from "../../Models/RoomDTO";

/**
 * Creado en {@link reducerList}, almacena en el store el listado de rooms de firebase. Ejecutado a traves
 * de {@link getHotels}.
 *
 * @param state {{ hotels: any[]}} - State en Redux, valor inicial [].
 *
 * @param action {{type: string, [hotels]: any[]}} - Accion de redux. Action debe contener hotels cuando viene del saga.
 *
 * @returns  {{hotels: [] | HotelDTO[]}} - Devuelve un array vacio por defecto o el listado de hoteles tras obtenerlos
 * de firebase.
 *
 * @see Ver constantes disponibles: {@link REDUX_CONSTANTS}
 *
 *
 */
export const hotelReducerGetHotelList = (state = {hotels: []}, action) => {
    return {
        hotels: [
            new HotelDTO({"code": "hotel_1", "name": "HotelDTO 1"}),
            new HotelDTO({"code": "hotel_2", "name": "HotelDTO 2"}),
            new HotelDTO({"code": "hotel_3", "name": "HotelDTO 3"}),
            new HotelDTO({"code": "hotel_4", "name": "HotelDTO 4"}),
        ]
    }

}

/**
 * Creado en {@link reducerList}, almacena en el store el listado de rooms de firebase. Ejecutado a traves
 * de {@link getRooms}.
 *
 * @param state {{ rooms: RoomDTO[]}} - State en Redux, valor inicial [].
 *
 * @param action {{type: string, [rooms]: any[]}} - Accion de redux. CAction debe contener rooms cuando viene del saga.
 *
 * @returns  {{rooms: [] | RoomDTO[]}} - Devuelve un array vacio por defecto o el listado de habitaciones si hemos
 * obtenido los datos de firebase.
 *
 *  @see Ver constantes disponibles: {@link REDUX_CONSTANTS}
 */
export const hotelReducerGetAvailableRooms = (state = {rooms: []}, action) => {
    if (action.type === REDUX_CONSTANTS.SET_AVAILABLE_ROOMS_BY_FIREBASE) {
        const roomList = []
        action.rooms.forEach((room) => {
            const roomName = Object.keys(room)[0];
            const roomRateList = room[roomName].rates;
            roomList.push(new RoomDTO({roomName, roomRateList}))
        })

        return {
            rooms: roomList
        }
    }

    return state;
}
