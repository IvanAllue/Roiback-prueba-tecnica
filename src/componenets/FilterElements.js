import {Button} from "./Button";
import {Dropdown} from "./Dropdown";
import {Component} from "react";
import RoibackDatePicker from "./RoibackDatePicker";
import moment from "moment";


export class FilterElements extends Component {
    onOptionSelected(event) {
        console.log(event.target.value)
    }

    onDateSelected(event) {
        console.log(event)
    }

    render() {
        const pruebaOpciones = [
            {code: 'Hotel 1', name: 'Nombre 1'},
            {code: 'Hotel 2', name: 'Nombre 2'},
            {name: 'Nombre 3'},
            {code: 'Hotel 4'},
        ];

        return (
            <div>
                <Button>
                    CHECK AVAILABILITY
                </Button>

                <Dropdown label="Select a hotel" options={pruebaOpciones} onOptionSelected={this.onOptionSelected}>

                </Dropdown>

                <RoibackDatePicker onDateSelected={this.onDateSelected} label="Check in"></RoibackDatePicker>
                <RoibackDatePicker onDateSelected={this.onDateSelected} label="Check out"
                                   minDate={moment().add(1, 'd').toDate()}></RoibackDatePicker>
            </div>
        )
    }
}
