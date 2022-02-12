import * as React from 'react';

import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {ThemeProvider} from "@material-ui/styles";
import {useState} from "react";
import moment from "moment";
import styled from "styled-components";
import {COLORS} from "../config/Colors";

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
`

export default function RoibackDatePicker(props) {
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
    const todayString = moment().format()

    const {
        onDateSelected = () => {
        },
        placeholder = todayString,
        minDate = todayString,
        label = ''
    } = props;

    const [dateSelected, changeDateSelected] = useState(minDate);

    const onChangeDatepicker = (event) => {
        changeDateSelected(event)
        onDateSelected(event)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={materialTheme}>
                <StyledDatePicker
                    disableToolbar
                    inputVariant="filled"
                    format="dd/MM/yyyy"
                    placeholder={placeholder}
                    label={label}
                    value={dateSelected}
                    minDate={minDate}
                    onChange={onChangeDatepicker}
                />
            </ThemeProvider>

        </MuiPickersUtilsProvider>
    );
}
