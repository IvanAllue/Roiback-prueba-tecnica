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
 * Pinta cada una de las habitaciones extraidas de la roomList
 * @param roomList {RoomDTO[]}
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
 * Pinta la query utilizada en la busqueda de forma comprensible y la lista de habitaciones con sus detalles-
 * @param props {{
 *     roomList: RoomDTO[]
 * }}
 * @returns {JSX.Element<StyledRoomList>}
 * @constructor
 */
export function RoomsList(props) {
    const {hotelSelected, checkInDate, checkOutDate} = props.searchQuery
    const nightsDiff = checkOutDate.diff(checkInDate, 'd')
    return (
        <StyledRoomList>
            <InformationParagraph>
                {props.roomList.length} Types of rooms available
                at {hotelSelected} From {checkInDate.format('DD/MM/YYYY')} to {checkOutDate.format('DD/MM/YYYY')} ({nightsDiff} {nightsDiff > 1 ? 'nights' : 'night'})
            </InformationParagraph>
            <List>
                {getRooms(props.roomList)}
            </List>
        </StyledRoomList>
    )
}
