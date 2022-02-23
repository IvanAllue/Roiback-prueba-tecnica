import styled from 'styled-components';
import COLORS from '../../../config/Colors';

/**
 * Renderiza con estilos el contenedor que muestra los datos de una room: {@link RoomDTO}
 * @type {StyledComponent<"div", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
const StyledRoom = styled.div`
  max-width: 95rem;
  width: 100%;
  box-shadow: 1px 1px 4px 1px ${COLORS.GREY};
  @media (max-width: 950px) {
    max-width: 100%;
    margin-left: 2rem;
    margin-right: 2rem;
  }
`;

/**
 * Muestra con estilos el parrafo que muestra el nombre de la habitacion
 * @type {StyledComponent<"p", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
const RoomName = styled.p`
  padding: 1rem;
  height: 2.5rem;
  color: white;
  display: flex;
  align-items: center;
  margin: 0;
  background-color: ${COLORS.BLACK};
`;

/**
 * Elemento contenedor donde se rendizaran el rate de una habitacion {@link RateDTO}
 * @type {StyledComponent<"div", AnyIfEmpty<DefaultTheme>, {}, never>}
 */
const Fare = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem 1.5rem 1.5rem;
  border-top: solid 1px ${COLORS.LIGHT_GREY};

  & > p {
    margin: 0;
  }
`;

/**
 * Renderiza una lista de rates de la room.
 * @param rates {Array.<RateDTO>} - Lista de Rates dentro de RoomDTO
 * @returns {Array.<JSX.Element<Fare>>} - Lista de Fare que contiene los rateName y totalPrice del rateName de la RoomDTO
 */
function getFareList(rates) {
    return rates.map((rate) => (
        <Fare key={rate}>
            <p>{rate.rateName}</p>
            <p>{rate.totalPrice}</p>
        </Fare>
    ));
}

/**
 * Pinta la room y sus detalles
 * @param props{{
 *     roomData: RoomDTO
 * }} - Habitacion a pintar
 * @returns {JSX.Element<StyledRoom>} - Room y sus detalles
 */
function Room({ roomData }) {
    return (
        <StyledRoom>
            <RoomName>
                {roomData.roomName}
            </RoomName>
            <div>
                {getFareList(roomData.roomRateList)}
            </div>
        </StyledRoom>
    );
}

export default Room;
