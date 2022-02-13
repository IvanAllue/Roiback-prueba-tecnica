import {FilterElements} from "../../componenets/FilterElements";
import {SearchFailed} from "../../componenets/NoResultsComponent";
import styled from "styled-components";
import {Component} from "react";

const Results = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: center;

  @media (max-width: 950px) {
    padding-top: 2rem;
  }
`

export class HotelSearchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomList: [],
            searchQuery: null
        }
    }

    onSendAvailability = (searchQuery) => {
        this.setState({
            searchQuery
        })
    }

    getResultsComponent() {
        if (this.state && this.state.roomList && this.state.roomList.length > 0) {

        } else if (this.state.searchQuery) {
            return (
                <SearchFailed
                    title="CHECK AVAILABILITY"
                    subtitle="Sorry, we do not have availability for the indicated hotel on the selected
                    dates, please try again with a new search."
                />
            )
        } else {
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
                <FilterElements onSendAvailability={this.onSendAvailability}></FilterElements>
                <Results>
                    {this.getResultsComponent()}
                </Results>
            </div>

        )
    }
}
