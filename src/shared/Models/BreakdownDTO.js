/**
 * Rate object
 * @class
 * @property {string} date - Nombre del Rate.
 * @property {{
 *    price: number,
 *    allotment: number
 * }} breakdownData - Precio del dia y habitaciones restantes.
 */
class BreakdownDTO {
    date;

    breakdownData;

    /**
     * Constructor BreakdownDTO
     * @param attributes {{
     *     date: string;
     *     breakdownData: {
     *         price: number;
     *         allotment: number;
     *     };
     * }}
     */
    constructor(attributes) {
        Object.assign(this, attributes);
    }
}
export default BreakdownDTO;
