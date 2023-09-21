import { styled } from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

import Container from '../styles/Container';
import { Result } from '../hooks/useSearchResult';

interface Props {
  focusIndex: number;
  data: Result[] | undefined;
}

const SearchResult = ({ focusIndex, data }: Props) => {
  return (
    <Container>
      <ResultWrap>
        <ResultWrapTitle>
          <ResultWrapTitleInDiv>추천 검색어</ResultWrapTitleInDiv>
        </ResultWrapTitle>
        <ResultUl>
          {(!data || data === undefined || data.length === 0) && (
            <ResultWrapWrap>
              <ResultWrapIcon>
                <SearchIcon size='25' color='gray' />
              </ResultWrapIcon>
              <ResultWrapTitle>
                <ResultWrapTitleInDiv>검색어 없음</ResultWrapTitleInDiv>
              </ResultWrapTitle>
            </ResultWrapWrap>
          )}
          {data &&
            data.map((item: any, idx: number) => (
              <ResultListItem key={item.sickCd} $isfocus={focusIndex === idx ? 'true' : 'false'}>
                <div className='icon'>
                  <SearchIcon
                    size='27'
                    color='gray'
                    $isfocus={focusIndex === idx ? 'true' : 'false'}
                  />
                </div>
                <div className='inner'>{item.sickNm}</div>
              </ResultListItem>
            ))}
        </ResultUl>
      </ResultWrap>
    </Container>
  );
};

export default SearchResult;

const ResultWrapWrap = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
`;

const ResultWrapIcon = styled.div`
  background: #fff;
  padding: 2px 0px 2px 10px;
`;

const ResultWrapTitle = styled.div`
  background: #fff;
  padding: 5px 0px;
  width: 32%;
  border-radius: 30px 30px 0 0;
`;

const ResultWrapTitleInDiv = styled.div`
  background: #fff;
  padding: 10px 15px;
  color: gray;
  font-size: 15px;
`;

const ResultWrap = styled.div`
  width: 100vw;
  margin: 30px 0;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultUl = styled.ul`
  width: 32%;
  list-style: none;
  margin: 0px 0 20px 0;
  background: #fff;
  border-radius: 30px;
  border-radius: 0 0 30px 30px;
`;

const ResultListItem = styled.li<{ $isfocus?: string }>`
  padding: 10px 0;
  background: ${props => (props.$isfocus === 'true' ? '#f3f3f3' : '#fff')};
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #f3f3f3;

    .icon,
    .icon *,
    .innerTitle,
    .inner {
      background: #f3f3f3;
    }
  }

  .icon {
    padding: 2px 10px 2px 10px;
    background: ${props => (props.$isfocus === 'true' ? '#f3f3f3' : '#fff')};
  }

  .inner {
    padding: 5px 0px;
    background: ${props => (props.$isfocus === 'true' ? '#f3f3f3' : '#fff')};
  }

  .innerTitle {
    font-size: 15px;
    color: gray;
    background: ${props => (props.$isfocus === 'true' ? '#f3f3f3' : '#fff')};
  }
`;

const SearchIcon = styled(AiOutlineSearch)<{ $isfocus?: string }>`
  padding-top: 5px;
  background: ${props => (props.$isfocus === 'true' ? '#f3f3f3' : '#fff')};
`;
