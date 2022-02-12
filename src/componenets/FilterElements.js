import {Button} from "./Button";
import {Dropdown} from "./Dropdown";
import {Component} from "react";
import RoibackDatePicker from "./RoibackDatePicker";
import moment from "moment";
import styled from "styled-components";

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

export class FilterElements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotelSelected: null,
            checkInDate: moment(),
            checkOutDate: moment().add(1, 'day')
        };
    }

    onHotelSelected(dropdownEvent) {
        this.setState({
            hotelSelected: dropdownEvent.target.value
        })
    }

    onCheckInChange = (newCheckInDate) => {
        const {checkOutDate} = this.state;
        if (moment(newCheckInDate).isAfter(checkOutDate)) {
            this.setState({
                checkInDate: moment(newCheckInDate),
                checkOutDate: moment(newCheckInDate).add(1, 'd')
            })
        } else {
            this.setState({
                checkInDate: moment(newCheckInDate)
            })
        }
    }

    onCheckOutChange = (newCheckOutDate) => {
        this.setState({
            checkOutDate: moment(newCheckOutDate)
        })
    }

    onCheckAvailability() {
        //TODO: On button click event
    }


    render() {
        const pruebaOpciones = [
            {code: 'Hotel 1', name: 'Nombre 1'},
            {code: 'Hotel 2', name: 'Nombre 2'},
            {name: 'Nombre 3'},
            {code: 'Hotel 4'},
        ];
        const {checkInDate, checkOutDate} = this.state;

        return (
            <FiltersContainer>
                <Dropdown label="Select a hotel" options={pruebaOpciones} onOptionSelected={this.onHotelSelected}>

                </Dropdown>

                <RoibackDatePicker
                    label="Check in"
                    value={checkInDate}
                    minDate={moment()}
                    onDateSelected={this.onCheckInChange}>
                </RoibackDatePicker>

                <RoibackDatePicker
                    label="Check out"
                    value={checkOutDate}
                    minDate={moment(checkInDate.format()).add(1, 'd')}
                    onDateSelected={this.onCheckOutChange}>
                </RoibackDatePicker>

                <Button onClick={this.onCheckAvailability}>
                    CHECK AVAILABILITY
                </Button>
            </FiltersContainer>
        )
    }
}
