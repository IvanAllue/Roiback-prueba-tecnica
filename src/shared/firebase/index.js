import { initializeApp } from 'firebase/app';
import {
    child, get, getDatabase, ref,
} from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBbOrVtDq7H-aU-MI0IAGu_xUX3HQduHUc',
    authDomain: 'roiback-prueba-tecnica.firebaseapp.com',
    databaseURL: 'https://roiback-prueba-tecnica-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'roiback-prueba-tecnica',
    storageBucket: 'roiback-prueba-tecnica.appspot.com',
    messagingSenderId: '318836639554',
    appId: '1:318836639554:web:fc299c1f9b6a7f0fff2adb',
    measurementId: 'G-7KNJ7V9KYE',
};

const app = initializeApp(firebaseConfig);

/**
 * Funcion para utilizar las herramientas y utilidades de Firebase utilizando el tipo de DB Realtime
 * @type {Database}
 * @const
 */
export const database = getDatabase(app);

/**
 * Ejecuta una preticion a Firebase solicitando el path (la query) rooms.
 * @param PATH {'rooms'|'hotels'|'translations'} - Ruta de firebase a la que atacar
 * @returns {Promise<DataSnapshot>} - Promise que, cuando finalice devuelve un DataSnapshot, con .val() podemos ver
 * el contenido de la respuesta.
 * @export
 * @const
 */
export const getDataFromFirebase = (PATH) => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, PATH));
};
