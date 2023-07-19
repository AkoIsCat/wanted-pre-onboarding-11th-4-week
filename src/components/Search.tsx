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

  useEffect(() => {
    if (debouncedSearchInput.trim().length !== 0) {
      searchItems(debouncedSearchInput);
    } else {
      searchItems('');
      setIndex(-1);
    }
  }, [debouncedSearchInput]);

  const cachingLocalstorage = (result: any, input: string, tts: number) => {
    const now = new Date();
    const cachedData = {
      result,
      expiry: now.getTime() + tts,
    };
    localStorage.setItem(input, JSON.stringify(cachedData));
  };

  const removeExpiredCaches = () => {
    const now = new Date();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const cachingData = localStorage.getItem(key);
        if (cachingData) {
          const parseData = JSON.parse(cachingData);
          if (now.getTime() > parseData.expiry) {
            localStorage.removeItem(key);
          }
        }
      }
    }
  };

  if (localStorage.length !== 0) {
    setInterval(() => {
      removeExpiredCaches();
    }, 60000);
  }

  const searchItems = async (search: string) => {
    if (search === '') {
      dispatch({ type: 'UPDATE', payload: { expiry: 0, result: [] } });
      return;
    }

    const trimInput = search.trim();
    const cachingData = localStorage.getItem(trimInput);

    if (cachingData) {
      const parseData = JSON.parse(cachingData);
      dispatch({ type: 'UPDATE', payload: parseData });
    } else {
      try {
        const response = await getData(trimInput);
        const now = new Date();
        const payload =
          response.length > 7
            ? { result: response.slice(0, 7), expiry: now.getTime() }
            : { result: response, expiry: now.getTime() };

        dispatch({ type: 'UPDATE', payload });
        cachingLocalstorage(payload.result, trimInput, 5000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        setIndex(prevIdx => (prevIdx + 1) % recommendData.result.length);
        break;
      case 'ArrowUp':
        setIndex(
          prevIdx => (prevIdx - 1 + recommendData.result.length) % recommendData.result.length
        );
        break;
      case 'Escape':
        searchItems('');
        setSearchInput('');
        setIndex(-1);
        break;
      case 'Enter':
        if (idx !== -1 && recommendData.result[idx]) {
          const data = recommendData.result[idx].sickNm;
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
