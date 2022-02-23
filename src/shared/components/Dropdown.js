import {
    FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import styled, { css } from 'styled-components';
import COLORS from '../../config/Colors';

const StyledFormControl = styled(FormControl)`
  min-width: 14rem !important;

  & .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after {
    border-color: ${COLORS.PRIMARY_COLOR};
  }


  & > label {
    color: ${COLORS.PRIMARY_COLOR} !important;
  }

  ${({ error }) => error && css`
    & > label {
      color: ${COLORS.RED} !important;
    }
  `}
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0.5rem !important;

  &:hover {
    background-color: ${COLORS.PRIMARY_COLOR_LIGHT} !important;
  }

  &:active {
    background-color: ${COLORS.PRIMARY_COLOR} !important;
  }
`;

/**
 * Devuelve cada una de las opciones del Dropdown.
 * @param params {{code: string; name:string;}[]} - Lista de opciones formadas por {code} (return) y {name} (pintar).
 * @returns {JSX.Element<StyledMenuItem[]>|[]} - Opciones del dropdown.
 */
function dropdownOptions(params) {
    return params.map(({ name, code }) => {
        const optionName = name || '';
        const optionCode = code || optionName;

        return (
            <StyledMenuItem key={optionCode} value={optionCode}>
                {optionName}
            </StyledMenuItem>
        );
    });
}

/**
 * Renderiza un dropdown configurable hecho con Material UI.
 * @param props {{
 *     error: boolean;
 *     label: string;
 *     value: string;
 *     onOptionSelected: function();
 *     options: {code: string; name:string;}[]
 * }} - Opciones configurables del Dropdown.
 * @returns {JSX.Element<StyledFormControl>} - Dropdown de Material UI con estilos.
 * @event onOptionSelected - Opcion seleccionada, para acceder a los datos ves a event.target.value
 * @example
 *  const options = [{code:"valor a recibir", name:"valor a mostrar"}];
 *
 *  <Dropdown
 *      options={options} // Opciones a mostrar en la lista
 *      label={"Texto a mostrar en la label"} // Texto de la label
 *      onOptionSelected={function()} // Funcion a ejecutar cuando se selecciona una opcion
 *      value={"Codigo marcado por defecto"} // Valor inicial del dropdown.
 *      error={true/false} // Si es true se mostrara rodeado en rojo
 * />
 * @function
 */
function Dropdown({
    value, onOptionSelected, label, error, options,
}) {
    return (
        <StyledFormControl variant="filled" sx={{ m: 1, minWidth: 140 }} error={error}>
            <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>

            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={value || ''}
              onChange={onOptionSelected}
            >
                {dropdownOptions(options)}
            </Select>
        </StyledFormControl>
    );
}

export default Dropdown;
