import {FilterElements} from "../../shared/components/FilterElements";
import {SearchFailed} from "../../shared/components/NoResultsComponent";
import styled from "styled-components";
import {Component} from "react";
import {RoomsList} from "./components/RoomsList";
import {connect} from "react-redux";
import {REDUX_CONSTANTS} from "../../shared/redux/constants";

const Results = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: center;

  @media (max-width: 950px) {
    padding-top: 2rem;
  }
`

class HotelSearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomList: [],
            searchQuery: null
        }
    }

    onSendAvailability = (searchQuery) => {
        this.props.getAvailableRooms()
        this.setState({
            searchQuery,
            roomList: []
        })
    }

    getResultsComponent() {
        if (this.props.rooms && this.props.rooms.length > 0) {
            // Tenemos resultados.
            return <RoomsList roomList={this.props.rooms} searchQuery={this.state.searchQuery}/>
        } else if (this.state.searchQuery) {
            // No tenemos resultados y hemos ejecutado una query.
            return (
                <SearchFailed
                    title="CHECK AVAILABILITY"
                    subtitle="Sorry, we do not have availability for the indicated hotel on the selected
                    dates, please try again with a new search."
                />
            )
        } else {
            // No tenemos resultados y aun no hemos buscado nada.
            return (
                <SearchFailed
                    title="CHECK AVAILABILITY"
                    subtitle="Select a hotel and two dates and you will receive magical results"
                />
            )
        }
    }

    render() {

        return (
            <div>
                <FilterElements onSendAvailability={this.onSendAvailability} hotels={this.props.hotels}/>
                <Results>
                    {this.getResultsComponent()}
                </Results>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        hotels: state.hotelReducerGetHotelList.hotels,
        rooms: state.hotelReducerGetAvailableRooms.rooms
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAvailableRooms: () => dispatch({type: REDUX_CONSTANTS.GET_AVAILABLE_ROOMS})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchList);
