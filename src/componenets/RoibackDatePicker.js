import * as React from 'react';

import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {ThemeProvider} from "@material-ui/styles";
import {useState} from "react";

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersDay: {
            day: {
                color: '#212121',
            },
            daySelected: {
                backgroundColor: '#019592',
            },
            dayDisabled: {
                color: '#b2dfde',
            },
            current: {
                color: '#006866',
            },
        },
    },
});

export default function RoibackDatePicker(props) {
    const today = new Date()

    const {
        onDateSelected = () => {
        },
        placeholder = today.toString(),
        minDate = today.toString(),
        label = ''
    } = props
    const [selectedDate] = useState(minDate);
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={materialTheme}>
                <DatePicker
                    disableToolbar
                    inputVariant="filled"
                    placeholder={placeholder}
                    label={label}
                    format="dd/MM/yyyy"
                    helperText="No year selection"
                    value={selectedDate}
                    minDate={minDate}
                    onChange={onDateSelected}
                />
            </ThemeProvider>

        </MuiPickersUtilsProvider>
    );
}
