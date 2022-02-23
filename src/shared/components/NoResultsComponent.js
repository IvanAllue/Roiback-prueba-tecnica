import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import COLORS from '../../config/Colors';

const SearchFailedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25rem;
`;

const SearchFailedIcon = styled(SearchIcon)`
  font-size: 12rem !important;
  color: ${COLORS.LIGHT_GREY};
`;

const SearchFailedTitle = styled.p`
  color: ${COLORS.BLACK};
  margin: 0;
  font-size: 1.6rem;
`;

const SearchFailedSubtitle = styled.p`
  color: ${COLORS.GREY};
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
`;

/**
 * Muestra un elemento configurable que indica que no hay hoteles. Se puede cambiar el titulo y subtitulo para
 * notificar el motivo.
 * @param props {{
 *     title: string;
 *     subtitle:string;
 * }}
 * @returns {JSX.Element<SearchFailedContainer>}
 * @constructor
 * @example
 * <SearchFailed
 *      title={"Texto mas grande bajo la lupa"}
 *      subtitle={"Texto mas pequeñito y explicativo"}
 * />
 *
 * @function
 */
function SearchFailed(props = {
    title: '',
    subtitle: '',
}) {
    return (
        <SearchFailedContainer>
            <SearchFailedIcon />
            <SearchFailedTitle>
                {props.title}
            </SearchFailedTitle>
            <SearchFailedSubtitle>
                {props.subtitle}
            </SearchFailedSubtitle>
        </SearchFailedContainer>
    );
}

export default SearchFailed;
