import styled from "styled-components";
import {COLORS} from "../../../config/Colors";

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

/**
 * Pinta la lista de Rates
 * @param rates {RateDTO[]} - Lista de Rates dentro de la RoomDTO
 * @returns {JSX.Element<Fare>[]} - Lista de Fare que contiene los rateName y totalPrice del rateName de la RoomDTO
 */
function getFareList(rates) {
    return rates.map((rate, rateIndex) => {
        return (
            <Fare key={rateIndex}>
                <p>{rate.rateName}</p>
                <p>{rate.totalPrice}</p>
            </Fare>
        )
    })
}

/**
 * Pinta la room y sus detalles
 * @param props{{
 *     roomData: RoomDTO
 * }} - Habitacion a pintar
 * @returns {JSX.Element<StyledRoom>} - Room y sus detalles
 */
export function Room(props) {
    return (
        <StyledRoom>
            <RoomName>
                {props.roomData.roomName}
            </RoomName>
            <div>
                {getFareList(props.roomData.roomRateList)}
            </div>
        </StyledRoom>
    )
}
