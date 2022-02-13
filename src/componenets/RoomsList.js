import styled from "styled-components";
import {COLORS} from "../config/Colors";
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
  justify-content: center
`


const getRooms = (roomList) => {
    return roomList.map((roomData, roomIndex) => {
        return (
            <Room key={roomIndex} roomData={roomData}/>
        )
    })
}

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
