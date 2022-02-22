import styled from 'styled-components';
import { useSelector } from 'react-redux';
import COLORS from '../../../config/Colors';
import Room from './Room';

export const InformationParagraph = styled.p`
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

export const List = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

/**
 * Pinta cada una de las habitaciones extraidas de la roomList
 * @param roomList {RoomDTO[]}
 * @returns {JSX.Element<Room> | []}
 */
const getRooms = (roomList) => roomList.map((roomData, roomIndex) => (
    <Room key={roomIndex.toString()} roomData={roomData} />
));

/**
 * Pinta la query utilizada en la busqueda de forma comprensible y la lista de habitaciones con sus detalles-
 * @param props {{
 *     roomList: RoomDTO[]
 * }}
 * @returns {JSX.Element<StyledRoomList>}
 * @constructor
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
            <InformationParagraph>
                {queryText}
            </InformationParagraph>
            <List>
                {getRooms(roomList)}
            </List>
        </StyledRoomList>
    );
}

export default RoomsList;
