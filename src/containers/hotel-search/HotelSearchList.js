import {FilterElements} from "../../shared/components/FilterElements";
import {SearchFailed} from "../../shared/components/NoResultsComponent";
import styled from "styled-components";
import {Component} from "react";
import {RoomsList} from "./components/RoomsList";

const Results = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: center;

  @media (max-width: 950px) {
    padding-top: 2rem;
  }
`

export class HotelSearchList extends Component {
    mockedAvailabilityResponse = {
        "rooms": [
            {
                "room_1": {
                    "rates": [
                        {
                            "rate_1": {
                                "total_price": 90.24,
                                "breakdown": [
                                    {
                                        "2022-01-01": {
                                            "price": 45.12,
                                            "allotment": 3
                                        },
                                        "2022-01-02": {
                                            "price": 45.12,
                                            "allotment": 2
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "room_2": {
                    "rates": [
                        {
                            "rate_1": {
                                "total_price": 103.24,
                                "breakdown": [
                                    {
                                        "2022-01-01": {
                                            "price": 45.12,
                                            "allotment": 3
                                        },
                                        "2022-01-02": {
                                            "price": 45.12,
                                            "allotment": 2
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "rate_2": {
                                "total_price": 128.24,
                                "breakdown": [
                                    {
                                        "2022-01-01": {
                                            "price": 45.12,
                                            "allotment": 3
                                        },
                                        "2022-01-02": {
                                            "price": 45.12,
                                            "allotment": 2
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }

    constructor(props) {
        super(props);

        this.state = {
            roomList: [],
            searchQuery: null
        }
    }

    onSendAvailability = (searchQuery) => {
        this.setState({
            searchQuery,
            roomList: this.mockedAvailabilityResponse.rooms
        })
    }

    getResultsComponent() {
        if (this.state && this.state.roomList && this.state.roomList.length > 0) {
            // Tenemos resultados.
            return <RoomsList roomList={this.state.roomList} searchQuery={this.state.searchQuery}/>
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
                <FilterElements onSendAvailability={this.onSendAvailability}/>
                <Results>
                    {this.getResultsComponent()}
                </Results>
            </div>

        )
    }
}
