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
            checkInDate: moment().startOf('day'),
            checkOutDate: moment().startOf('day').add(1, 'day'),
            error: false
        };
    }

    onHotelSelected = (dropdownEvent) => {
        this.setState({
            hotelSelected: dropdownEvent.target.value,
            error: false
        })
    }

    onCheckInChange = (newCheckInDate) => {
        const {checkOutDate} = this.state;
        if (moment(newCheckInDate).isAfter(checkOutDate)) {
            this.setState({
                checkInDate: moment(newCheckInDate).startOf('day'),
                checkOutDate: moment(newCheckInDate).startOf('day').add(1, 'd')
            })
        } else {
            this.setState({
                checkInDate: moment(newCheckInDate).startOf('day')
            })
        }
    }

    onCheckOutChange = (newCheckOutDate) => {
        this.setState({
            checkOutDate: moment(newCheckOutDate).startOf('day')
        })
    }

    onCheckAvailability = () => {
        if (this.state.hotelSelected) {
            if (this.props.onSendAvailability) {
                this.props.onSendAvailability({
                    hotelSelected: this.state.hotelSelected,
                    checkInDate: this.state.checkInDate,
                    checkOutDate: this.state.checkOutDate,
                })
            }

        } else {
            this.setState({
                error: true
            })
        }
    }


    render() {
        const {checkInDate, checkOutDate} = this.state;

        return (
            <FiltersContainer>
                <Dropdown
                    label="Select a hotel"
                    options={this.props.hotels}
                    onOptionSelected={this.onHotelSelected}
                    value={this.state.hotelSelected}
                    error={this.state.error}>

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
