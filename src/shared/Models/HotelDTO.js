/**
 * Objeto HotelDTO
 * @param attributes {{
 *     code: string;
 *     name: string;
 * }}
 */
export class HotelDTO {
    code;
    name;

    /**
     * Constructor HotelDTO
     * @param attributes {{
     *     code: string;
     *     name: string;
     * }}
     */
    constructor(attributes) {
        Object.assign(this, attributes)
    }
}
