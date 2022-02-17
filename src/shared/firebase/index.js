import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBbOrVtDq7H-aU-MI0IAGu_xUX3HQduHUc",
    authDomain: "roiback-prueba-tecnica.firebaseapp.com",
    databaseURL: "https://roiback-prueba-tecnica-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "roiback-prueba-tecnica",
    storageBucket: "roiback-prueba-tecnica.appspot.com",
    messagingSenderId: "318836639554",
    appId: "1:318836639554:web:fc299c1f9b6a7f0fff2adb",
    measurementId: "G-7KNJ7V9KYE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/**
 * Funcion para utilizar las herramientas y utilidades de Firebase utilizando el tipo de DB Realtime
 * @type {Database}
 */
export const database = getDatabase(app)
