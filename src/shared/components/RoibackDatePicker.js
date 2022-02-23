import * as React from 'react';

import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import moment from 'moment';
import styled from 'styled-components';
import { es } from 'date-fns/locale';
import COLORS from '../../config/Colors';

const StyledDatePicker = styled(DatePicker)`
  & .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after {
    border-color: ${COLORS.PRIMARY_COLOR};
  }

  & > label {
    color: ${COLORS.PRIMARY_COLOR} !important;
  }

  & .MuiFilledInput-underline:after {
    border-color: ${COLORS.PRIMARY_COLOR};
  }
`;

/**
 * Aplica los estilos de Material en el DatePicker.
 */
const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersDay: {
            day: {
                color: COLORS.BLACK,
            },
            daySelected: {
                backgroundColor: COLORS.PRIMARY_COLOR,
            },
            dayDisabled: {
                color: COLORS.PRIMARY_COLOR_DISABLED,
            },
            current: {
                color: COLORS.BLACK,
            },
        },
    },
});

/**
 *
 * @param props {{
 *     placeholder: string;
 *     label: string;
 *     value: moment.Moment;
 *      minDate: moment.Moment;
 *     onDateSelected: function();
 * }}
 * @returns {JSX.Element<MuiPickersUtilsProvider>} - DatePicker Material UI/Pickers
 * @constructor
 * @example
 *  <RoibackDatePicker
 *      label={"Texto de la label"}
 *      value={"Fecha por defecto"} // En string, formato "DD/MM/YYYY"
 *      minDate={moment()} // Fecha minima posible
 *      onDateSelected={onCheckInChange} // Evento a lanzar cuando se seleccione una fecha.
 * />
 * @function
 */
export default function RoibackDatePicker(props = {
    onDateSelected: () => {
    },
    placeholder: 'dd/mm/yyyy',
    minDate: moment(),
    label: '',
    value: moment(),
}) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
            <ThemeProvider theme={materialTheme}>
                <StyledDatePicker
                  disableToolbar
                  inputVariant="filled"
                  format="dd/MM/yyyy"
                  placeholder={props.placeholder}
                  label={props.label}
                  value={props.value.format()}
                  minDate={props.minDate}
                  onChange={props.onDateSelected}
                />
            </ThemeProvider>

        </MuiPickersUtilsProvider>
    );
}
