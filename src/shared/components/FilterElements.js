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

/**
 * Devuelve un sistema de filtrado configurable que consta de 1 dropdown, 2 datePicker y 1 boton para confirmar cambios.
 * @param props {{
 *     onSendAvailability: function(),
 *     hotels: {code: string; name: string} [],
 *     [copys]:{
 *          dropdownLabel: string;
 *          firstDatePickerLabel: string;
 *          secondDatePickerLabel:  string;
 *          buttonLabel:  string;
 *     }
 * }} - Hoteles a mostrar en el dropdown y funcion a ejecutar cuando se pulsa el boton.
 * @returns {JSX.Element<FiltersContainer>}
 * @constructor
 * @description Metodos: {@link onHotelSelected},  {@link onCheckInChange}, {@link onCheckOutChange} ,
 * {@link onCheckAvailability}
 *
 * @example
 * //Filtros SIN copys:
 * <FilterElements onSendAvailability={[funcion a ejecutar]} hotels={[Opciones del dropdown]} />
 * //Filtros CON copys:
 * <FilterElements onSendAvailability={[funcion a ejecutar]} hotels={[Opciones del dropdown]}  copys={{
 *                       dropdownLabel: "Label dropdown",
 *                       firstDatePickerLabel:  "Label 1º Datepicker",
 *                       secondDatePickerLabel: "Label 2º Datepicker",
 *                       buttonLabel: "Texto boton",
 * }}/>
 *
 */
export function FilterElements(props) {
    const [hotelSelected, setHotelSelected] = useState(null);
    const [checkInDate, changeCheckInState] = useState(moment().startOf('day'));
    const [checkOutDate, changeCheckOutState] = useState(moment().startOf('day').add(1, 'day'));
    const [error, changeErrorState] = useState(false);

    /**
     * Pone error como falso para quitar el efecto rojo y guarda en el estado el hotel seleccionado.
     * @param dropdownEvent {any} - Objeto de Material UI que contiene el valor seleccionado en el Dropdown
     */
    const onHotelSelected = (dropdownEvent) => {
        setHotelSelected(dropdownEvent.target.value)
        changeErrorState(false)
    }

    /**
     * Se ejecuta cuando el usuario cambia la fecha de check in en el DatePicker. Si la fecha de checkIn es mayor que
     * la de checkOut aplazamos la fecha de checkOut un dia despues de la de checkIn.
     * @param newCheckInDate {string} - Nueva fecha en formato String
     */
    const onCheckInChange = (newCheckInDate) => {
        if (moment(newCheckInDate).startOf("day").add(1, "h").isAfter(checkOutDate)) {
            changeCheckInState(moment(newCheckInDate).startOf('day'))
            changeCheckOutState(moment(newCheckInDate).startOf('day').add(1, 'd'))
        } else {
            changeCheckInState(moment(newCheckInDate).startOf('day'))
        }
    }

    /**
     * Se ejecuta cuando el usuario cambia la fecha de check out en el DatePicker. Almacena la nueva fecha para el
     * checkOut
     * @param newCheckOutDate {string} - Nueva fecha en formato String
     */
    const onCheckOutChange = (newCheckOutDate) => {
        changeCheckOutState(moment(newCheckOutDate).startOf('day'))
    }

    /**
     * Se ejecuta cuando se pulsa el boton de check availability. Si se selecciono un hotel se envia la query, sino se
     * indica al usuario que debe seleccionar un hotel poniendo error a true
     */
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
                label={props.copys && props.copys.dropdownLabel ? props.copys.dropdownLabel : ''}
                options={props.hotels ? props.hotels : []}
                onOptionSelected={onHotelSelected}
                value={hotelSelected}
                error={error}>

            </Dropdown>

            <RoibackDatePicker
                label={props.copys && props.copys.firstDatePickerLabel ? props.copys.firstDatePickerLabel : ''}
                value={checkInDate}
                minDate={moment()}
                onDateSelected={onCheckInChange}>
            </RoibackDatePicker>

            <RoibackDatePicker
                label={props.copys && props.copys.secondDatePickerLabel ? props.copys.secondDatePickerLabel : ''}
                value={checkOutDate}
                minDate={moment(checkInDate.format()).add(1, 'd')}
                onDateSelected={onCheckOutChange}>
            </RoibackDatePicker>

            <Button onClick={onCheckAvailability}>
                {props.copys && props.copys.buttonLabel ? props.copys.buttonLabel : 'CLICK'}
            </Button>
        </FiltersContainer>
    )

}
