import { getDataFromFirebase } from '../firebase';

/**
 * Comprueba las peticiones a firebase
 */
describe('Peticiones firebase', () => {
    /**
     * Validador peticion hotels recibe datos
     */
    it('Validador peticion hotels recibe datos', async () => {
        const apiCall = await getDataFromFirebase('hotels');
        expect(apiCall.exists()).toBe(true);
    });

    /**
     * Validador peticion rooms recibe datos
     */
    it('Validador peticion rooms recibe datos', async () => {
        const apiCall = await getDataFromFirebase('rooms');
        expect(apiCall.exists()).toBeTruthy();
    });

    /**
     * Validacion peticion translations recibe datos
     */
    it('Validacion peticion translations recibe datos', async () => {
        const apiCall = await getDataFromFirebase('translations');
        expect(apiCall.exists()).toBeTruthy();
    });
});
