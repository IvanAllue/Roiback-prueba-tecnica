import moment from 'moment';

const STORE = {
    EMPTY_STORE: {
        translationReducerGetTranslations: {
            translations: null,
        },
        hotelReducerGetHotelList: {
            hotels: [],
        },
        translationReducerGetCurrentLanguage: {
            copys: null,
            language: null,
        },
        hotelReducerGetAvailableRooms: {
            rooms: [],
        },
    },
    CURRENT_LANGUAGE_COPYS: {
        copys: {
            checkAvailability: 'CHECK AVAILABILITY',
            checkIn: 'Check in',
            checkOut: 'Check out',
            from: 'from',
            hotel: 'Hotel',
            language: 'Language:',
            languages: {
                english: 'English',
                spanish: 'Spanish',
            },
            noResultsWarning: {
                afterSearch: 'Sorry, we do not have availability for the indicated hotel on the selected dates, '
                    + 'please try again with a new search.',
                beforeSearch: 'Select a hotel and two dates and you will receive magical results',
            },
            queryResume: {
                night: 'night',
                nights: 'nights',
                typeOfRooms: 'Types of rooms available at',
            },
            selectAHotel: 'Select a hotel',
            to: 'to',
        },
        language: 'en-EN',
    },
    ROOMS: [{
        roomName: 'room_1',
        roomRateList: [
            {
                rateName: 'rate_1',
                totalPrice: 90.24,
                breakdown: [
                    {
                        date: '2022-01-01T00:00:00+01:00',
                        breakdownData: {
                            allotment: 3,
                            price: 45.12,
                        },
                    },
                ],
            },
        ],
    }],
    HOTELS: [{
        code: 'hotel_1',
        name: 'hotel_1_name',
    }, {
        code: 'hotel_2',
        name: 'hotel_2_name',
    }],
    TRANSLATIONS: {
        en: {
            checkAvailability: 'CHECK AVAILABILITY',
            checkIn: 'Check in',
            checkOut: 'Check out',
            from: 'from',
            hotel: 'Hotel',
            language: 'Language:',
            languages: {
                english: 'English',
                spanish: 'Spanish',
            },
            noResultsWarning: {
                afterSearch: 'Sorry, we do not have availability for the indicated hotel on the selected dates, '
                    + 'please try again with a new search.',
                beforeSearch: 'Select a hotel and two dates and you will receive magical results',
            },
            queryResume: {
                night: 'night',
                nights: 'nights',
                typeOfRooms: 'Types of rooms available at',
            },
            selectAHotel: 'Select a hotel',
            to: 'to',
        },
        es: {
            checkAvailability: 'CONSULTAR DISPONIBILIDAD',
            checkIn: 'Fecha de entrada',
            checkOut: 'Fecha de salida',
            from: 'Desde',
            hotel: 'Hotel',
            language: 'Idioma: ',
            languages: {
                english: 'Ingles',
                spanish: 'Espa??ol',
            },
            noResultsWarning: {
                afterSearch: 'Lo sentimos, no tenemos disponibilidad para el hotel indicado en las fechas seleccionadas, intente '
                    + 'nuevamente con una nueva b??squeda.',
                beforeSearch: 'Selecciona un hotel y dos fechas y obtendr??s resultados m??gicos',
            },
            queryResume: {
                night: 'noche',
                nights: 'noches',
                typeOfRooms: 'Tipos de habitaciones disponibles en',
            },
            selectAHotel: 'Seleccione un hotel',
            to: 'hasta',
        },
    },

};

const MOCKS = {
    SPANISH_COPYS: {
        copys: {
            checkAvailability: 'CONSULTAR DISPONIBILIDAD',
            checkIn: 'Fecha de entrada',
            checkOut: 'Fecha de salida',
            from: 'Desde',
            hotel: 'Hotel',
            language: 'Idioma: ',
            languages: {
                english: 'Ingles',
                spanish: 'Espa??ol',
            },
            noResultsWarning: {
                afterSearch: 'Lo sentimos, no tenemos disponibilidad para el hotel indicado en las fechas seleccionadas,'
                    + ' intente nuevamente con una nueva b??squeda.',
                beforeSearch: 'Selecciona un hotel y dos fechas y obtendr??s resultados m??gicos',
            },
            queryResume: {
                night: 'noche',
                nights: 'noches',
                typeOfRooms: 'Tipos de habitaciones disponibles en',
            },
            selectAHotel: 'Seleccione un hotel',
            to: 'hasta',
        },
        language: 'es-ES',
    },
};

const FILTER_ELEMENTS = {
    STATE: {
        hotelSelected: false,
        error: false,
        checkInDate: moment().startOf('day'),
        checkOutDate: moment().startOf('day').add(1, 'd'),
    },
    PROPS: {
        onSendAvailability: jest.fn(),
    },
    COPYS: {
        dropdownLabel: 'Dropdown Label',
        firstDatePickerLabel: 'Check In Datepicker Label',
        secondDatePickerLabel: 'Check Out Datepicker Label',
        buttonLabel: 'Button Text',
    },
};

const ROOM_LIST = {
    SEARCH_QUERY: {
        hotelSelected: 'Hotel',
        checkInDate: moment('21/02/2022', 'DD/MM/YYYY').startOf('d'),
        checkOutDate: moment('25/02/2022', 'DD/MM/YYYY').startOf('d'),
    },
};

const FIREBASE = {
    HOTELS: [{
        code: 'hotel_1',
        name: 'hotel_1_name',
    }, {
        code: 'hotel_2',
        name: 'hotel_2_name',
    }],
    ROOMS: [{
        room_1: {
            rates: [{
                rate_1: {
                    breakdown: [{
                        '2022-01-01': {
                            allotment: 3,
                            price: 45.12,
                        },
                        '2022-01-02': {
                            allotment: 2,
                            price: 45.12,
                        },
                    }],
                    total_price: 90.24,
                },
            }],
        },
    }],
    TRANSLATIONS: {
        en: {
            checkAvailability: 'CHECK AVAILABILITY',
            checkIn: 'Check in',
            checkOut: 'Check out',
            from: 'from',
            hotel: 'Hotel',
            language: 'Language:',
            languages: {
                english: 'English',
                spanish: 'Spanish',
            },
            noResultsWarning: {
                afterSearch: 'Sorry, we do not have availability for the indicated hotel on the selected dates, please try again with a '
                    + 'new search.',
                beforeSearch: 'Select a hotel and two dates and you will receive magical results',
            },
            queryResume: {
                night: 'night',
                nights: 'nights',
                typeOfRooms: 'Types of rooms available at',
            },
            selectAHotel: 'Select a hotel',
            to: 'to',
        },
        es: {
            checkAvailability: 'CONSULTAR DISPONIBILIDAD',
            checkIn: 'Fecha de entrada',
            checkOut: 'Fecha de salida',
            from: 'Desde',
            hotel: 'Hotel',
            language: 'Idioma: ',
            languages: {
                english: 'Ingles',
                spanish: 'Espa??ol',
            },
            noResultsWarning: {
                afterSearch: 'Lo sentimos, no tenemos disponibilidad para el hotel indicado en las fechas seleccionadas, intente '
                    + 'nuevamente con una nueva b??squeda.',
                beforeSearch: 'Selecciona un hotel y dos fechas y obtendr??s resultados m??gicos',
            },
            queryResume: {
                night: 'noche',
                nights: 'noches',
                typeOfRooms: 'Tipos de habitaciones disponibles en',
            },
            selectAHotel: 'Seleccione un hotel',
            to: 'hasta',
        },
    },

};

/**
 * Constantes para mockear stores y props
 * @type {{FIREBASE: {ROOMS: [{room_1: {rates: [{rate_1: {total_price: number, breakdown: [{"2022-01-01": {price: number, allotment: number}
 * , "2022-01-02": {price: number, allotment: number}}]}}]}}], TRANSLATIONS: {en: {checkIn: string,
 * languages: {spanish: string, english: string}, noResultsWarning: {beforeSearch: string, afterSearch: string}, hotel: string, from: string
 * , language: string, checkAvailability: string, queryResume: {nights: string, night: string, typeOfRooms: string},
 * to: string, checkOut: string, selectAHotel: string}, es: {checkIn: string, languages: {spanish: string, english: string},
 * noResultsWarning: {beforeSearch: string, afterSearch: string}, hotel: string, from: string, language: string, checkAvailability: string,
 * queryResume: {nights: string, night: string, typeOfRooms: string}, to: string, checkOut: string, selectAHotel: string}},
 * HOTELS: [{code: string, name: string}, {code: string, name: string}]}, STORE: {ROOMS: [{roomRateList: [{rateName: string,
 * totalPrice: number, breakdown: [{date: string, breakdownData: {price: number, allotment: number}}]}], roomName: string}],
 * TRANSLATIONS: {en: {checkIn: string, languages: {spanish: string, english: string},
 * noResultsWarning: {beforeSearch: string, afterSearch: string}, hotel: string, from: string,
 * language: string, checkAvailability: string, queryResume: {nights: string, night: string, typeOfRooms: string},
 * to: string, checkOut: string, selectAHotel: string}, es: {checkIn: string, languages: {spanish: string, english: string},
 * noResultsWarning: {beforeSearch: string, afterSearch: string}, hotel: string, from: string, language: string, checkAvailability: string,
 * queryResume: {nights: string, night: string, typeOfRooms: string}, to: string, checkOut: string, selectAHotel: string}},
 * HOTELS: [{code: string, name: string}, {code: string, name: string}], CURRENT_LANGUAGE_COPYS:{copys: {checkIn: string,
 * languages: {spanish: string, english: string}, noResultsWarning: {beforeSearch: string, afterSearch: string}, hotel: string,
 * from: string, language: string, checkAvailability: string, queryResume: {nights: string, night: string, typeOfRooms: string},
 * to: string, checkOut: string, selectAHotel: string}, language: string}, EMPTY_STORE: {hotelReducerGetHotelList: {hotels: *[]},
 * translationReducerGetTranslations: {translations: null}, translationReducerGetCurrentLanguage: {copys: null, language: null},
 * hotelReducerGetAvailableRooms: {rooms: *[]}}}, FILTER_ELEMENTS: {STATE: {hotelSelected: boolean, checkOutDate: moment.Moment,
 * error: boolean, checkInDate: moment.Moment}, COPYS: {firstDatePickerLabel: string, dropdownLabel: string,
 * secondDatePickerLabel: string, buttonLabel: string}, PROPS: {onSendAvailability: jest.Mock}},
 * ROOM_LIST: {SEARCH_QUERY: {hotelSelected: string, checkOutDate: moment.Moment, checkInDate: moment.Moment}},
 * MOCKS: {SPANISH_COPYS: {copys: {checkIn: string, languages: {spanish: string, english: string},
 * noResultsWarning: {beforeSearch: string, afterSearch: string}, hotel: string, from: string, language: string, checkAvailability: string,
 * queryResume: {nights: string, night: string, typeOfRooms: string}, to: string, checkOut: string, selectAHotel: string},
 * language: string}}}}
 */
const TESTING_CONSTANTS = {
    STORE,
    MOCKS,
    FIREBASE,
    FILTER_ELEMENTS,
    ROOM_LIST,
};

export default TESTING_CONSTANTS;
