import {hotelReducerGetAvailableRooms, hotelReducerGetHotelList} from "../redux/reducers/HotelReducers";
import {REDUX_CONSTANTS} from "../redux/constants/constants";
import {RoomDTO} from "../Models/RoomDTO";
import {getDataFromFirebase} from "../firebase";
import {TESTING_CONSTANTS} from "./testingConstants";

/**
 * Comprueba las funcionalidades de los reducers hotel
 */
describe('Hotel reducers', () => {
    /**
     * Validador de procesamiento de datos desde firebase hasta forma final
     */
    it('Validador de procesamiento de datos desde firebase hasta forma final (HOTELS)', () => {
        const reducerResponse = hotelReducerGetHotelList(null, {
            type: REDUX_CONSTANTS.SET_HOTELS_BY_FIREBASE,
            hotels: TESTING_CONSTANTS.FIREBASE.HOTELS
        })
        expect(reducerResponse).toEqual({
            hotels: TESTING_CONSTANTS.STORE.HOTELS
        })
    })

    /**
     * Validador de procesamiento de datos desde firebase hasta forma final
     */
    it('Validador de procesamiento de datos desde firebase hasta forma final (ROOMS)', () => {
        const reducerResponse = hotelReducerGetAvailableRooms([], {
            type: REDUX_CONSTANTS.SET_AVAILABLE_ROOMS_BY_FIREBASE,
            rooms: TESTING_CONSTANTS.FIREBASE.ROOMS
        })
        const response = new RoomDTO({
            roomName: "room_1",
            roomRateList: [{
                "rate_1": {
                    "breakdown": [{
                        "2022-01-01": {
                            "allotment": 3,
                            "price": 45.12
                        },
                        "2022-01-02": {
                            "allotment": 2,
                            "price": 45.12
                        }
                    }],
                    "total_price": 90.24
                }
            }]
        })


        expect({rooms: [response]}).toEqual(reducerResponse)
    })

    /**
     * Validador de procesamiento de datos desde firebase hasta forma final.
     * No se compara contra el JSON mockeado de rooms porque la idea es que en firebase se
     * añadan mas datos y este test siga funcionando, asi que solo comprobamos que no pete.
     */
    it('Validador de procesamiento de datos desde firebase hasta forma final (FIREBASE (ROOMS))', async () => {
        let workingFine = false
        try {
            const apiCall = await getDataFromFirebase('rooms')
            const reducerResponse = hotelReducerGetAvailableRooms(null, {
                type: REDUX_CONSTANTS.SET_AVAILABLE_ROOMS_BY_FIREBASE,
                rooms: apiCall.val()
            })
            if (reducerResponse) {
                workingFine = true
            }
        } catch (error) {

        }

        expect(workingFine).toBeTruthy()

    })
})
