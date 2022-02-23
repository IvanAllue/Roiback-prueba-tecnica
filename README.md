
# Roiback-prueba-tecnica
# Descargar la aplicacion:
Copiar y pegar los siguientes comandos y ejecutarlos en una carpeta a la que git tenga acceso:
```
git clone https://github.com/IvanAllue/Roiback-prueba-tecnica.git
cd Roiback-prueba-tecnica
npm i
```
**Importante**: La aplicacion es compatible con versiones NPM 7.X o superior, en un PC con NPM 6.14 me he visto obligado a actualizar la version. Testeado en la version 8.1.2 su correcto funcionamiento.

## Comandos

Una vez descargada y actualizada la aplicacion, y dentro de la carpeta del proyecto:

### `npm start`

Esto lanzara la aplicacion en la direccion [http://localhost:3000](http://localhost:3000) (Si el puerto 3000 no esta disponible usara el 3001).

### `npm test`

Lanza toda la bateria de test que podras encontrar en la siguiete carpeta: [test](https://github.com/IvanAllue/Roiback-prueba-tecnica/tree/main/src/shared/test)

### `npm run build`

Hace un build de la aplicacion.

## Informacion de la aplicacion: 
- NPM Version: 8.1.2
- Node Version: 16.13.1
- React Version: 17.0.2
- Este proyecto utiliza Firebase como backend, se ha utilizado la version 9.6.6 de su libreria.
- Redux 4.1.2
- Redux (Saga) 1.1.3
- Material UI (Varias versiones, segun dependencias).
- Styled-components: ^5.3.3

En la carpeta: out archivo index.html podeis encontrar documentacion del proyecto.
<img width="920" alt="image" src="https://user-images.githubusercontent.com/50440904/155393028-6843fcb7-4229-4c0c-aa08-214cf95f3851.png">


### Estructura base de datos.
Para ser fiel al maximo a los datos que me adjuntasteis en el documento he diseñado la base de datos de firebase en realtime, y este es su contenido:
```json
{
  "hotels" : [ {
    "code" : "hotel_1",
    "name" : "hotel_1_name"
  }, {
    "code" : "hotel_2",
    "name" : "hotel_2_name"
  } ],
  "rooms" : [ {
    "room_1" : {
      "rates" : [ {
        "rate_1" : {
          "breakdown" : [ {
            "2022-01-01" : {
              "allotment" : 3,
              "price" : 45.12
            },
            "2022-01-02" : {
              "allotment" : 2,
              "price" : 45.12
            }
          } ],
          "total_price" : 90.24
        }
      } ]
    }
  } ],
  "translations" : {
    "en" : {
      "checkAvailability" : "CHECK AVAILABILITY",
      "checkIn" : "Check in",
      "checkOut" : "Check out",
      "from" : "from",
      "hotel" : "Hotel",
      "language" : "Language:",
      "languages" : {
        "english" : "English",
        "spanish" : "Spanish"
      },
      "noResultsWarning" : {
        "afterSearch" : "Sorry, we do not have availability for the indicated hotel on the selected dates, please try again with a new search.",
        "beforeSearch" : "Select a hotel and two dates and you will receive magical results"
      },
      "queryResume" : {
        "night" : "night",
        "nights" : "nights",
        "typeOfRooms" : "Types of rooms available at"
      },
      "selectAHotel" : "Select a hotel",
      "to" : "to"
    },
    "es" : {
      "checkAvailability" : "CONSULTAR DISPONIBILIDAD",
      "checkIn" : "Fecha de entrada",
      "checkOut" : "Fecha de salida",
      "from" : "Desde",
      "hotel" : "Hotel",
      "language" : "Idioma: ",
      "languages" : {
        "english" : "Ingles",
        "spanish" : "Español"
      },
      "noResultsWarning" : {
        "afterSearch" : "Lo sentimos, no tenemos disponibilidad para el hotel indicado en las fechas seleccionadas, intente nuevamente con una nueva búsqueda.",
        "beforeSearch" : "Selecciona un hotel y dos fechas y obtendrás resultados mágicos"
      },
      "queryResume" : {
        "night" : "noche",
        "nights" : "noches",
        "typeOfRooms" : "Tipos de habitaciones disponibles en"
      },
      "selectAHotel" : "Seleccione un hotel",
      "to" : "hasta"
    }
  }
}
```

## ¿Que haria si?
Bueno lo cierto es que he estado intentando desarrollar y sacarle el maximo jugo a la aplicacion sin embargo por falta de tiempo no me ha sido posible. Mis puntos a mejorar a futuro serian los siguientes:
- Jsdoc: No se ha terminado de exprimir al maximo esta herramienta, aun faltan mas detalles a explicar asi como terminar de pulir las descripciones.
- Testing: En esta parte me he quedado bastante cortito, es principalmente debido a que he estado aprendiendo sobre la marcha.
- MobX: De no haber sido por la falta de tiempo me habria gustado incorporar MobX en alguna otra rama, es otro muy buen gestor de estados, aunque como me habia percatado de que me iba a ser imposible he decidido apostar por la que mas suele utilizarse.
- De haber utilizado firestore en lugar de realtime (no quise por ser fiel a la estructura) se podria realmente haber filtrado en las peticiones y haber hecho que los datos cambiaran. Con realtime el filtrado es manual (jugando con array) y tambien habria estado bien, pero la gracia era hacerlo con firestore ya que por como esta redactado el ejercicio esos datos los obtiene de back, no los procesa el front.
- En la query del hotel (cuando mostramos results) puse el id del hotel en lugar del name

Y lo mas importante: ProtoType, que me sonaba pero no me acordaba de este y cuando instale eslint se me volvio loco a exigirmelo.
