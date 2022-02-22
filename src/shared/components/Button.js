import styled from 'styled-components';
import COLORS from '../../config/Colors';

/**
 * Boton con estilos y hover.
 */
const Button = styled.button`
  background-color: ${COLORS.PRIMARY_COLOR};
  border: solid 1px ${COLORS.PRIMARY_COLOR_LIGHT};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #008683;
    border: solid 1px ${COLORS.PRIMARY_COLOR};
  }
`;

export default Button;
