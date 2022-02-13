import styled from "styled-components";
import {COLORS} from "../config/Colors";

const StyledRoom = styled.div`
  max-width: 95rem;
  width: 100%;
  box-shadow: 1px 1px 4px 1px ${COLORS.GREY};
  @media (max-width: 950px) {
    max-width: 100%;
    margin-left: 2rem;
    margin-right: 2rem;
  }
`
const RoomName = styled.p`
  padding: 1rem;
  height: 2.5rem;
  color: white;
  display: flex;
  align-items: center;
  margin: 0;
  background-color: ${COLORS.BLACK};
`

const Fare = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem 1.5rem 1.5rem;
  border-top: solid 1px ${COLORS.LIGHT_GREY};

  & > p {
    margin: 0;
  }
`


function getFareList(rates) {
    return rates.map((rate, rateIndex) => {
        const rateName = Object.keys(rate)[0]

        return (
            <Fare key={rateIndex}>
                <p>{rateName}</p>
                <p>{rate[rateName].total_price}</p>
            </Fare>
        )
    })
}

export function Room(props) {
    const roomName = Object.keys(props.roomData)[0]
    return (
        <StyledRoom>
            <RoomName>
                {roomName}
            </RoomName>
            <div>
                {getFareList(props.roomData[roomName].rates)}
            </div>
        </StyledRoom>
    )
}
