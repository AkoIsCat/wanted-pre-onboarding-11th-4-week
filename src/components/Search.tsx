import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { getData } from '../api/api';
import useDebounce from '../hooks/useDebounce';
import {
  useRecommendSearchDispatch,
  useRecommendSearchState,
} from '../store/RecommendSearch-context';

import { AiOutlineSearch } from 'react-icons/ai';
import SearchResult from './SearchResult';

const Search = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [idx, setIndex] = useState<number>(-1);
  const dispatch = useRecommendSearchDispatch();

  const debouncedSearchInput = useDebounce(searchInput, 350);
  const recommendData = useRecommendSearchState();

  const searchItems = async (search: string) => {
    if (search === '') {
      dispatch({ type: 'UPDATE', payload: [] });
    } else {
      const response = await getData(search.trim());
      if (response.length > 7) {
        const sliceResponse = response.slice(0, 7);
        dispatch({ type: 'UPDATE', payload: sliceResponse });
      } else {
        dispatch({ type: 'UPDATE', payload: response });
      }
    }
  };

  useEffect(() => {
    if (debouncedSearchInput.trim().length !== 0) {
      searchItems(debouncedSearchInput);
    } else {
      searchItems('');
      setIndex(-1);
    }
  }, [debouncedSearchInput]);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        setIndex(prevIdx => (prevIdx + 1) % recommendData.length);
        break;
      case 'ArrowUp':
        setIndex(prevIdx => (prevIdx - 1 + 7) % recommendData.length);
        break;
      case 'Escape':
        searchItems('');
        setSearchInput('');
        setIndex(-1);
        break;
      case 'Enter':
        if (idx !== -1 && recommendData[idx]) {
          const data = recommendData[idx].sickNm;
          searchItems(data);
          setSearchInput(data);
        }
        break;
    }
  };

  return (
    <InputWrap>
      <InputBox
        placeholder={`질환명을 입력해 주세요.`}
        onChange={event => setSearchInput(event.target.value)}
        onKeyDown={keyDownHandler}
        value={searchInput}
      />
      <SearchIcon>
        <AiOutlineSearch size='30' />
      </SearchIcon>
      <SearchResult focusIndex={idx} />
    </InputWrap>
  );
};

export default Search;

const InputWrap = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const InputBox = styled.input`
  width: 30%;
  height: 7vh;
  padding-left: 30px;
  font-size: 20px;
  background: #fff;
  border: 1px solid black;
  border-radius: 30px;
`;

const SearchIcon = styled.div`
  width: 2.7vw;
  height: 5.4vh;
  position: absolute;
  left: 62.5%;
  top: 9px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
