/**
 * Objeto HotelDTO
 * @param attributes {{
 *     code: string;
 *     name: string;
 * }}
 */
class HotelDTO {
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
        Object.assign(this, attributes);
    }
}

export default HotelDTO;
