import {REDUX_CONSTANTS} from "../constants";

export const hotelReducerGetHotelList = (state = {hotels: []}, action) => {
    state.hotels = {
        hotels: [
            {"code": "hotel_1", "name": "Hotel 1"},
            {"code": "hotel_2", "name": "Hotel 2"},
            {"code": "hotel_3", "name": "Hotel 3"},
            {"code": "hotel_4", "name": "Hotel 4"}
        ]
    }

    return state.hotels;
}

export const hotelReducerGetAvailableRooms = (state = {rooms: []}, action) => {
    if (action.type === REDUX_CONSTANTS.GET_AVAILABLE_ROOMS) {
        state.rooms = {
            "rooms": [
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
        }
    }

    return state.rooms;
}
