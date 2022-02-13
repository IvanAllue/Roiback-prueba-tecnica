import {FilterElements} from "../../componenets/FilterElements";
import {SearchFailed} from "../../componenets/NoResultsComponent";
import styled from "styled-components";

const Results = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: center;
  
  @media (max-width: 950px) {
    padding-top: 2rem;
  }
`

export const HotelSearchList = () => {

    return (
        <div>
            <FilterElements></FilterElements>
            <Results>
                <SearchFailed title="CHECK AVAILABILITY"
                              subtitle="Select a hotel and two dates and you will receive magical results"></SearchFailed>
            </Results>
        </div>

    )
}
