import {FilterElements} from "../components/FilterElements";
import {fireEvent, screen, render, prettyDOM} from "@testing-library/react";
import moment from "moment";
import {Button} from "../components/Button";
import {Dropdown} from "../components/Dropdown";
import {TESTING_CONSTANTS} from "./testingConstants";


/**
 * Test del componente {@link FilterElements}
 */
describe('Filter Element Visuales', () => {
    /**
     * FilterElements: DatePicker checkIn tiene la fecha de hoy por defecto.
     */
    it('DatePicker checkIn tiene la fecha de hoy por defecto', () => {
        const today = moment().format('DD/MM/YYYY');

        render(
            <FilterElements onSendAvailability={() => {
            }} hotels={TESTING_CONSTANTS.STORE.HOTELS} copys={TESTING_CONSTANTS.FILTER_ELEMENTS.COPYS}/>
        )

        expect(screen.getByDisplayValue(today)).toBeTruthy()
    })

    /**
     * FilterElements: DatePicker checkOut tiene la fecha de mañana por defecto.
     */
    it('FilterElements: DatePicker checkOut tiene la fecha de mañana por defecto.', () => {
        const tomorrow = moment().add(1, 'd').format('DD/MM/YYYY');

        render(
            <FilterElements onSendAvailability={() => {
            }} hotels={TESTING_CONSTANTS.STORE.HOTELS} copys={TESTING_CONSTANTS.FILTER_ELEMENTS.COPYS}/>
        )

        expect(screen.getByDisplayValue(tomorrow)).toBeTruthy()
    })

    /**
     * Filters Element: Los copys enviados en los props son los que se renderizan
     */
    it('Los copys enviados en los props son los que se renderizan', () => {
        render(
            <FilterElements onSendAvailability={() => {
            }} hotels={TESTING_CONSTANTS.STORE.HOTELS} copys={TESTING_CONSTANTS.FILTER_ELEMENTS.COPYS}/>
        )

        let allCopysRendered = true
        Object.keys(TESTING_CONSTANTS.FILTER_ELEMENTS.COPYS).forEach((copyKey) => {
            const copyValue = TESTING_CONSTANTS.FILTER_ELEMENTS.COPYS[copyKey]
            if (allCopysRendered && !screen.getByText(copyValue)) {
                allCopysRendered = false;
            }
        })
        expect(allCopysRendered).toBeTruthy()
    })

    /**
     * Filter Elements: Comprueba que si enviamos solo algunos copys no falla.
     */
    it('Comprueba que si enviamos solo algunos copys no falla.', () => {
        const newCopys = TESTING_CONSTANTS.FILTER_ELEMENTS.COPYS;
        delete newCopys.firstDatePickerLabel
        delete newCopys.dropdownLabel

        render(
            <FilterElements onSendAvailability={() => {
            }} hotels={TESTING_CONSTANTS.STORE.HOTELS} copys={newCopys}/>
        )
        expect(screen.getByText(newCopys.secondDatePickerLabel)).toBeInTheDocument()
    })

    /**
     * Filter Elements: Comprueba que si no tiene copys no falla
     */
    it('Comprueba que si no tiene copys no falla', () => {
        render(
            <FilterElements onSendAvailability={() => {
            }} hotels={TESTING_CONSTANTS.STORE.HOTELS}/>
        )
        expect(screen.getByText(TESTING_CONSTANTS.STORE.HOTELS[0].name)).toBeInTheDocument()
    })

    /**
     * Filter Elements: Comprueba que si no tiene copys ni hotels no falla
     */
    it('Comprueba que si no tiene copys ni hotels no falla', () => {
        render(
            <FilterElements onSendAvailability={() => {
            }}/>
        )

        console.log(prettyDOM(screen.container))

        expect(screen.getByDisplayValue(moment().format('DD/MM/YYYY'))).toBeInTheDocument()
    })

    /**
     * Comprueba que se renderiza bien  sin recibir ningun parametro
     */
    it('Comprueba que se renderiza bien  sin recibir ningun parametro', () => {
        render(
            <FilterElements/>
        )
        expect(screen.getByRole('combobox')).toBeInTheDocument()
    })


})

/**
 * Funcionalidades de Filter Elments
 */
describe('Filter Elements Funcionalidades', () => {
    let filterElementContext
    beforeEach(() => {
        filterElementContext = {
            filterElementsState: TESTING_CONSTANTS.FILTER_ELEMENTS.STATE,
            filterElementsProps: TESTING_CONSTANTS.FILTER_ELEMENTS.PROPS
        }
    })
    /**
     * Validacion de funcionalidad del click del boton
     * @example:
     * // Funcionamiento del boton.
     * Si se ha marcado un hotel en el dropdown ejecuta una funcion en el padre (comprobado por este test).
     * Si no se ha marcado un hotel cambia el state a error = true
     */
    it('Validacion de funcionalidad del click del boton (Si hay un hotel seleccionado)', () => {
        filterElementContext.filterElementsState.hotelSelected = true;

        const buttonAction = jest.fn(() => {
            if (filterElementContext.filterElementsState.hotelSelected) {
                if (filterElementContext.filterElementsProps.onSendAvailability) {
                    filterElementContext.filterElementsProps.onSendAvailability()
                }
            } else {
                filterElementContext.filterElementsState.error = true;
            }
        })

        render(<Button onClick={buttonAction}>Boton check availability</Button>)

        fireEvent.click(screen.getByRole('button'))

        expect(filterElementContext.filterElementsProps.onSendAvailability.mock.calls.length).toBe(1)
    })

    /**
     * Validacion de funcionalidad del click del boton
     * @example:
     * // Funcionamiento del boton.
     * Si se ha marcado un hotel en el dropdown ejecuta una funcion en el padre (comprobado por este test).
     * Si no se ha marcado un hotel cambia el state a error = true
     */
    it('Validacion de funcionalidad del click del boton (Si NO hay un hotel seleccionado)',
        () => {
            filterElementContext.filterElementsState.hotelSelected = false;

            const buttonAction = jest.fn(() => {
                if (filterElementContext.filterElementsState.hotelSelected) {
                    if (filterElementContext.filterElementsProps.onSendAvailability) {
                        filterElementContext.filterElementsProps.onSendAvailability()
                    }
                } else {
                    filterElementContext.filterElementsState.error = true;
                }
            })
            render(<Button onClick={buttonAction}>Boton check availability</Button>)

            fireEvent.click(screen.getByRole('button'))

            const validator = filterElementContext.filterElementsProps.onSendAvailability.mock.calls.length === 0 &&
                filterElementContext.filterElementsState.error

            expect(validator).toBeTruthy()
        })

    /**
     * Validacion de funcionalidad del dropdown.
     * Cuando en el dropdown se cambia algo se guarda en hotelSelected
     */
    it('Dropdown change ejecuta la accion enviada', () => {
        const onHotelSelected = jest.fn(() => {
            filterElementContext.filterElementsState.hotelSelected = true
        })
       render(<Dropdown
            label={'Dropdown'}
            options={TESTING_CONSTANTS.STORE.HOTELS}
            onOptionSelected={onHotelSelected}
            value={''}
            error={false}>

        </Dropdown>)

        fireEvent.change(screen.getByRole('combobox'))

        const validator = onHotelSelected.mock.calls.length > 0 && filterElementContext.filterElementsState.hotelSelected;

        expect(validator).toBeTruthy()
    })

    /**
     * Funcionalidad datePicker
     * Cuando algo cambia en el checkIn ejecuta su funcion y si checkIn es mayor que checkOut este ultimo
     * se modifica para que sea al dia siguiente del checkIn
     */
    it('Comprueba la funcionalidad del DatePicker check in', () => {
        let {checkOutDate, checkInDate} = filterElementContext.filterElementsState

        const onCheckInChange = (newCheckInDate) => {
            if (moment(newCheckInDate).startOf("day").add(1, "h").isAfter(checkOutDate)) {
                checkInDate = moment(newCheckInDate).startOf('day')
                checkOutDate = moment(newCheckInDate).startOf('day').add(1, 'd')
            } else {
                checkInDate = moment(newCheckInDate).startOf('day')
            }
        }

        const fakeDatePickerEventParam = moment('15/06/2022', 'DD/MM/YYYY')

        onCheckInChange(fakeDatePickerEventParam.format())

        expect(checkOutDate.isAfter(checkInDate)).toBeTruthy()
    })

})
