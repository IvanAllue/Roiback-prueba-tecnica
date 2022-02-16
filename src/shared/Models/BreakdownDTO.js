/**
 * Rate object
 * @property {string} date - Nombre del Rate.
 * @property {{
 *    price: number,
 *    allotment: number
 * }} breakdownData - Precio del dia y habitaciones restantes.
 */
export class BreakdownDTO {
    date;
    breakdownData

    /**
     * Constructor BreakdownDTO
     * @param attributes {{
     *     date: moment.Moment;
     *     breakdownData: {
     *         price: number;
     *         allotment: number;
     *     };
     * }}
     */
    constructor(attributes) {
        Object.assign(this, attributes)
    }
}
