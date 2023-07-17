import { styled } from 'styled-components';
import { useState, useRef } from 'react';
import { useRecommendSearchState } from '../store/SuggestedSearch-context';
import { AiOutlineSearch } from 'react-icons/ai';

import Container from '../styles/Container';

const ResultWrap = styled.div`
  width: 100vw;
  margin: 50px 0;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .wrap {
    display: flex;
    align-items: center;
    background: #fff;

    .icon {
      background: #fff;
      padding: 2px 0px 2px 10px;
    }
  }

  .title {
    background: #fff;
    padding: 5px 0px;
    width: 32%;
    border-radius: 30px 30px 0 0;

    div {
      background: #fff;
      padding: 10px 15px;
      color: gray;
      font-size: 15px;
    }
  }
`;

const ResultUl = styled.ul`
  width: 32%;
  list-style: none;
  margin: 0px 0 20px 0;
  background: #fff;
  border-radius: 30px;
  border-radius: 0 0 30px 30px;
`;

const ResultListItem = styled.li<{ isfocus?: string }>`
  padding: 15px 0;
  background: ${props => (props.isfocus ? '#fff' : '#f3f3f3')};
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
    background: #fff;
    padding: 2px 10px 2px 10px;
  }

  .inner {
    padding: 5px 0px;
    background: #fff;
  }

  .innerTitle {
    font-size: 15px;
    color: gray;
    background: #fff;
  }
`;

const SearchIcon = styled(AiOutlineSearch)`
  background: #fff;
  padding-top: 5px;
`;

const SearchResult = () => {
  const [idx, setIndex] = useState(-1);

  const refIndex = useRef<HTMLUListElement>(null);
  console.log(refIndex);

  const recommendSearchData = useRecommendSearchState();

  return (
    <Container>
      <ResultWrap>
        <div className='title'>
          <div>추천 검색어</div>
        </div>
        <ResultUl ref={refIndex}>
          {recommendSearchData.length === 0 && (
            <div className='wrap'>
              <div className='icon'>
                <SearchIcon size='25' color='gray' />
              </div>
              <div className='title'>
                <div>검색어 없음</div>
              </div>
            </div>
          )}
          {recommendSearchData.map((item: any, index: number) => (
            <ResultListItem key={item.sickCd} isfocus={index === idx ? 'true' : 'false'}>
              <div className='icon'>
                <SearchIcon size='27' color='gray' />
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
