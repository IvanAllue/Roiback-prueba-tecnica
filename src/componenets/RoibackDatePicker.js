import * as React from 'react';

import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {ThemeProvider} from "@material-ui/styles";
import {useEffect, useState} from "react";
import moment from "moment";
import styled from "styled-components";
import {COLORS} from "../config/Colors";
import {es} from "date-fns/locale";

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


export default function RoibackDatePicker(props = {
    onDateSelected: () => {
    },
    placeholder: 'dd/mm/yyyy',
    minDate: moment(),
    label: '',
    value: moment()
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
