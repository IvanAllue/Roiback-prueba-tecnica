import moment from "moment";
import {BreakdownDTO} from "./BreakdownDTO";
/**
 * Rate object
 * @property {string} rateName - Nombre del Rate
 * @property {number} totalPrice - Precio total del Rate (Suma de todos los price de los breackdowns)
 * @property {BreakdownDTO} breakdown - Lista de los breakdown
 */
export class RateDTO {
    rateName;
    totalPrice;
    breakdown;

    /**
     * Constructor HotelDTO
     * @param attributes {{
     *     rateName: string;
     *     rateData: {
     *         total_price: number;
     *         breakdown: any[]
     *     };
     * }}
     */
    constructor(attributes) {
        this.rateName = attributes.rateName;
        this.totalPrice = attributes.rateData.total_price;
        this.breakdown = attributes.rateData.breakdown.map((breakdown) => {
            const dateString = Object.keys(breakdown)[0]
            const date = moment(dateString).startOf('day').format()
            const breakdownData = breakdown[dateString];
            return new BreakdownDTO({date, breakdownData})
        })
    }
}
