import RateDTO from './RateDTO';

/**
 * Room object
 * @property {string} roomName - Nombre de la habitacion
 * @property {RateDTO} roomRateList - Lista de rates de la habitacion
 */
class RoomDTO {
    roomName;

    roomRateList;

    /**
     * Constructor HotelDTO
     * @param attributes {{
     *     roomName: string;
     *     roomRateList: any[];
     * }}
     */
    constructor(attributes) {
        this.roomName = attributes.roomName;
        this.roomRateList = attributes.roomRateList.map((rate) => {
            const rateName = Object.keys(rate)[0];
            const rateData = rate[rateName];
            return new RateDTO({ rateName, rateData });
        });
    }
}

export default RoomDTO;
