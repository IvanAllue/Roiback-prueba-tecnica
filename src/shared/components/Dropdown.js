import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import styled, {css} from "styled-components";
import {COLORS} from "../../config/Colors";

const StyledFormControl = styled(FormControl)`
  min-width: 14rem !important;

  & .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after {
    border-color: ${COLORS.PRIMARY_COLOR};
  }


  & > label {
    color: ${COLORS.PRIMARY_COLOR} !important;
  }

  ${({error}) => error && css`
    & > label {
      color: ${COLORS.RED } !important;
    }
  `}
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
        <StyledFormControl variant="filled" sx={{m: 1, minWidth: 140}} error={props.error}>
            <InputLabel id="demo-simple-select-filled-label">{props.label}</InputLabel>

            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={props.value ? props.value : ''}
                onChange={props.onOptionSelected}
            >
                {dropdownOptions(props.options)}
            </Select>
        </StyledFormControl>
    )
}
