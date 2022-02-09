import {Button} from "./Button";
import {Dropdown} from "./Dropdown";
import {Component} from "react";


export class FilterElements extends Component {
    onOptionSelected(event) {
        console.log(event.target.value)
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
            </div>
        )
    }
}
