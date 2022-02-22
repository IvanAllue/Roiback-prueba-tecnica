import styled from "styled-components";
import {COLORS} from "../../../config/Colors";
import {Room} from "./Room";
import {useSelector} from "react-redux";

export const InformationParagraph = styled.p`
  color: ${COLORS.BLACK};
  font-size: 1.2rem;
  font-weight: 500;
  max-width: 27rem;
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


    const copys = useSelector(state => {
        return state.translationReducerGetCurrentLanguage.copys
    })

    let queryText = ''
    if (props.searchQuery) {
        const {hotelSelected, checkInDate, checkOutDate} = props.searchQuery
        const nightsDiff = checkOutDate.diff(checkInDate, 'd')
        queryText = `${props.roomList.length} ${copys.queryResume.typeOfRooms} ${hotelSelected} ${copys.from} 
                ${checkInDate.format('DD/MM/YYYY')} ${copys.to} ${checkOutDate.format('DD/MM/YYYY')} 
                (${nightsDiff} ${nightsDiff > 1 ? copys.queryResume.nights : copys.queryResume.night})`
    }


    return (
        <StyledRoomList>
            <InformationParagraph>
                {queryText}
            </InformationParagraph>
            <List>
                {getRooms(props.roomList)}
            </List>
        </StyledRoomList>
    )
}
