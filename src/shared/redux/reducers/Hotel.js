export const getHotelList = (state = {hotels: []}, actions) => {
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
