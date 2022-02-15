import {Button} from "./Button";
import {Dropdown} from "./Dropdown";
import RoibackDatePicker from "./RoibackDatePicker";
import moment from "moment";
import styled from "styled-components";
import {useState} from "react";

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-top: 2.5rem;

  @media (max-width: 950px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export function FilterElements(props) {
    const [hotelSelected, setHotelSelected] = useState(null);
    const [checkInDate, changeCheckInState] = useState(moment().startOf('day'));
    const [checkOutDate, changeCheckOutState] = useState(moment().startOf('day').add(1, 'day'));
    const [error, changeErrorState] = useState(false);


    const onHotelSelected = (dropdownEvent) => {
        console.log(dropdownEvent.target.value)
        setHotelSelected(dropdownEvent.target.value)
        changeErrorState(false)
    }

    const onCheckInChange = (newCheckInDate) => {
        const {checkOutDate} = this.state;
        if (moment(newCheckInDate).isAfter(checkOutDate)) {
            changeCheckInState(moment(newCheckInDate).startOf('day'))
            changeCheckOutState(moment(newCheckInDate).startOf('day').add(1, 'd'))
        } else {
            changeCheckInState(moment(newCheckInDate).startOf('day'))
        }
    }

    const onCheckOutChange = (newCheckOutDate) => {
        changeCheckOutState(moment(newCheckOutDate).startOf('day'))
    }

    const onCheckAvailability = () => {
        if (hotelSelected) {
            if (props.onSendAvailability) {
                props.onSendAvailability({
                    hotelSelected,
                    checkInDate,
                    checkOutDate,
                })
            }
        } else {
            changeErrorState(true)
        }
    }


    return (

        <FiltersContainer>
            <Dropdown
                label="Select a hotel"
                options={props.hotels}
                onOptionSelected={onHotelSelected}
                value={hotelSelected}
                error={error}>

            </Dropdown>

            <RoibackDatePicker
                label="Check in"
                value={checkInDate}
                minDate={moment()}
                onDateSelected={onCheckInChange}>
            </RoibackDatePicker>

            <RoibackDatePicker
                label="Check out"
                value={checkOutDate}
                minDate={moment(checkInDate.format()).add(1, 'd')}
                onDateSelected={onCheckOutChange}>
            </RoibackDatePicker>

            <Button onClick={onCheckAvailability}>
                CHECK AVAILABILITY
            </Button>
        </FiltersContainer>
    )

}
