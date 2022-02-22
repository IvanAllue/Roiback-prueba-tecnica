import styled from 'styled-components';
import { CircularProgress, LinearProgress } from '@mui/material';
import COLORS from '../../config/Colors';

const StyledLinearProgress = styled(LinearProgress)`
  height: ${(props) => (props.size ? `${props.size}px` : '0.5rem')} !important;
  background-color: ${COLORS.PRIMARY_COLOR_DISABLED} !important;

  .MuiLinearProgress-bar1Indeterminate {
    background-color: ${COLORS.PRIMARY_COLOR} !important;
  }

  .MuiLinearProgress-bar2Indeterminate {
    background-color: ${COLORS.PRIMARY_COLOR} !important;
  }
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: ${COLORS.PRIMARY_COLOR} !important;
  height: ${(props) => (props.size ? `${props.size}px` : '4rem')} !important;
  width: ${(props) => (props.size ? `${props.size}px` : '4rem')} !important;
`;

/**
 * Renderiza un componente de loading progresivo configurable.
 * @param props {{
 *     [type]: 'circular' | 'linear',
 *     [size]: number
 * }} - Tipo de componente a mostrar y tamaño del mismo. Si no se añaden se pintan por defecto.
 *
 * @description - Tipo por defecto: Circular
 *
 * @description - Tamaño por defecto: 5px(Linear) , 40px (Circular)
 *
 *@example
 * // Circular tamaño por defecto:
 * <LoadingComponent></LoadingComponent>
 * // Linear con 10px de alto
 * <LoadingComponent type={"linear"} size={10}></LoadingComponent>
 * // Linear tamaño por defecto
 * <LoadingComponent type={"linear"}></LoadingComponent>
 * // Circular con 100px de alto
 * <LoadingComponent type={"circular"} size={100}></LoadingComponent>
 * <LoadingComponent size={100}></LoadingComponent>
 * @constructor
 */
function LoadingComponent({ type, size }) {
    if (type === 'linear') {
        return <StyledLinearProgress size={size} />;
    }

    return <StyledCircularProgress size={size} />;
}

export default LoadingComponent;
