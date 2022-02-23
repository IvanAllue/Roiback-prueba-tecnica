import styled from 'styled-components';
import { useSelector } from 'react-redux';
import COLORS from '../../../config/Colors';
import Room from './Room';

/**
 * Muestra con estilos el parrafo donde pintamos la queryText; un texto resumen con las fechas seleccionadas y la diferencia entre fechas.
 * @type {StyledComponent<"p", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
export const QueryText = styled.p`
  color: ${COLORS.BLACK};
  font-size: 1.2rem;
  font-weight: 500;
  max-width: 27rem;
  text-align: center;
`;

export const StyledRoomList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/**
 * Muestra con estilos el contenedor que contendra una lista de {@link Room}
 * @type {StyledComponent<"div", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
export const List = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

/**
 * Renderiza cada una de las habitaciones extraidas de la roomList
 * @param roomList {Array.<RoomDTO>}
 * @returns {JSX.Element<Room> | Array}
 */
const getRooms = (roomList) => roomList.map((roomData, roomIndex) => (
    <Room key={roomIndex.toString()} roomData={roomData} />
));

/**
 * Renderiza {@link QueryText}, que resume la query enviada y la lista de habitaciones obtenidas de firebase
 * @param props {{
 *         roomList: Array.<RoomDTO>,
 *         searchQuery: {
 *             hotelSelected: string,
 *             checkInDate: moment.Moment,
 *             checkOutDate: moment.Moment,
 *         }
 * }} - **roomList** seria el listado de habitaciones a mostrar y **searchQuery** un objeto que contiene el hotel seleccionado,
 * la fechad e entrada y de salida (en moment.js).
 *
 * @example
 * const roomArray = [RoomDTO, RoomDTO];
 *
 * <RoomsList roomList={roomArray}
 *            searchQuery={{
 *                   hotelSelected:"Hotel", // Nombre del hotel
 *                   checkInDate:"fecha(moment)", // Fecha check in moment
 *                   checkOutDate:"fecha(moment)" // Fecha check out moment
 *            }}
 * />
 * @returns {JSX.Element<StyledRoomList>}
 * @function
 */
function RoomsList({ searchQuery, roomList }) {
    const copys = useSelector((state) => state.translationReducerGetCurrentLanguage.copys);

    let queryText = '';
    if (searchQuery) {
        const { hotelSelected, checkInDate, checkOutDate } = searchQuery;
        const nightsDiff = checkOutDate.diff(checkInDate, 'd');
        queryText = `${roomList.length} ${copys.queryResume.typeOfRooms} ${hotelSelected} ${copys.from} 
                ${checkInDate.format('DD/MM/YYYY')} ${copys.to} ${checkOutDate.format('DD/MM/YYYY')} 
                (${nightsDiff} ${nightsDiff > 1 ? copys.queryResume.nights : copys.queryResume.night})`;
    }

    return (
        <StyledRoomList>
            <QueryText>
                {queryText}
            </QueryText>
            <List>
                {getRooms(roomList)}
            </List>
        </StyledRoomList>
    );
}

export default RoomsList;
