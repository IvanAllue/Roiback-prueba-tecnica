import {REDUX_CONSTANTS} from "../constants";
import {HotelDTO} from "../../Models/HotelDTO";
import {RoomDTO} from "../../Models/RoomDTO";

/**
 * Devuelve una lista de hoteles mockeados.
 * @returns {{
 *     hotels: HotelDTO[]
 * }}
 */
export const hotelReducerGetHotelList = () => {
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
 *
 * @param state
 * @param action
 * @returns {{
 *     rooms: RoomDTO[]
 * }}
 */
export const hotelReducerGetAvailableRooms = (state = {rooms: []}, action) => {
    const fakeDataFromBack = [
        {
            "room_1": {
                "rates": [
                    {
                        "rate_1": {
                            "total_price": 90.24,
                            "breakdown": [
                                {
                                    "2022-01-01": {
                                        "price": 45.12,
                                        "allotment": 3
                                    },
                                    "2022-01-02": {
                                        "price": 45.12,
                                        "allotment": 2
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "room_2": {
                "rates": [
                    {
                        "rate_1": {
                            "total_price": 103.24,
                            "breakdown": [
                                {
                                    "2022-01-01": {
                                        "price": 45.12,
                                        "allotment": 3
                                    },
                                    "2022-01-02": {
                                        "price": 45.12,
                                        "allotment": 2
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "rate_2": {
                            "total_price": 128.24,
                            "breakdown": [
                                {
                                    "2022-01-01": {
                                        "price": 45.12,
                                        "allotment": 3
                                    },
                                    "2022-01-02": {
                                        "price": 45.12,
                                        "allotment": 2
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
    if (action.type === REDUX_CONSTANTS.GET_AVAILABLE_ROOMS) {
        const roomList = []
        fakeDataFromBack.forEach((room) => {
            const roomName = Object.keys(room)[0];
            const roomRateList = room[roomName].rates;
            roomList.push(new RoomDTO({roomName, roomRateList}))
        })

        console.log(roomList)
        return {
            rooms: roomList
        }
    }

    return state.rooms;
}
