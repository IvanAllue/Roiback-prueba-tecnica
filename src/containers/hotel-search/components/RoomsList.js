import styled from "styled-components";
import {COLORS} from "../../../config/Colors";
import {Room} from "./Room";


export const InformationParagraph = styled.p`
  color: ${COLORS.BLACK};
  font-size: 1.2rem;
  font-weight: 500;
  max-width: 25rem;
  text-align: center;
`

export const StyledRoomList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const List = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`

/**
 * Obtiene una lista de rooms y forma un elemento JSX con cada elemento.
 * @param roomList {any[]} - Lista de rooms a mapear
 * @returns {JSX.Element<Room>}
 */
const getRooms = (roomList) => {
    return roomList.map((roomData, roomIndex) => {
        return (
            <Room key={roomIndex} roomData={roomData}/>
        )
    })
}

/**
 * Pinta la query realizada y los resultados arrojados en formato JSX.Element
 * @param props {{
 *     roomList: any[];
 *     searchQuery: {
 *          checkInDate: moment,
 *          checkOutDate: moment,
 *          hotelSelected: string
 *     }
 * }}
 * @returns {JSX.Element<StyledRoomList>} - Componente de resultados
 */
export function RoomsList(props) {
    const {roomList} = props
    const {hotelSelected, checkInDate, checkOutDate} = props.searchQuery
    const nightsDiff = checkOutDate.diff(checkInDate, 'd')
    return (
        <StyledRoomList>
            <InformationParagraph>
                {roomList.length} Types of rooms available
                at {hotelSelected} From {checkInDate.format('DD/MM/YYYY')} to {checkOutDate.format('DD/MM/YYYY')} ({nightsDiff} {nightsDiff > 1 ? 'nights' : 'night'})
            </InformationParagraph>
            <List>
                {getRooms(props.roomList)}
            </List>
        </StyledRoomList>
    )
}
