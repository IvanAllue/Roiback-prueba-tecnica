import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import styled from "styled-components";


const StyledFormControl = styled(FormControl)`
  min-width: 14rem !important;
  max-height: 5.7rem !important;

  & .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after {
    border-color: #019592;
  }


  & > label {
    color: #019592 !important;
  }
`

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: #e5f4f4 !important;
  }
`

function dropdownOptions(params) {
    return params.map((option) => {
        const optionName = option.name ? option.name : option.code ? option.code : '';
        const optionCode = option.code ? option.code : optionName;

        return (
            <StyledMenuItem key={optionCode} value={optionName}>
                {optionName}
            </StyledMenuItem>
        )
    })
}

export function Dropdown(props) {
    return (
        <StyledFormControl variant="filled" sx={{m: 1, minWidth: 140}}>
            <InputLabel id="demo-simple-select-filled-label">{props.label}</InputLabel>

            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue=''
                onChange={props.onOptionSelected}
            >
                {dropdownOptions(props.options)}
            </Select>
        </StyledFormControl>
    )
}
