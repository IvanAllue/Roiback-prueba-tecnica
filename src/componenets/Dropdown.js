import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function dropdownOptions(params) {
    return params.map((option) => {
        const optionName = option.name ? option.name : option.code ? option.code : '';
        const optionCode = option.code ? option.code : optionName;
        return (
            <MenuItem key={optionCode} value={optionName}>
                {optionName}
            </MenuItem>
        )
    })
}

export function Dropdown(props) {
    return (
        <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="demo-simple-select-filled-label">{props.label}</InputLabel>

            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue=''
                onChange={props.onOptionSelected}
            >
                {dropdownOptions(props.options)}
            </Select>
        </FormControl>
    )
}
