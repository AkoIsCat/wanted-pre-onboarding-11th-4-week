import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

import { AiOutlineSearch } from 'react-icons/ai';
import SearchResult from './SearchResult';
import { useSearchResult } from '../hooks/useSearchResult';

const Search = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [idx, setIndex] = useState<number>(-1);

  const debouncedSearchInput = useDebounce(searchInput, 350);

  const { data } = useSearchResult(debouncedSearchInput);

  useEffect(() => {
    if (debouncedSearchInput.trim().length === 0) {
      setIndex(-1);
    }
  }, [debouncedSearchInput]);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        data && setIndex(prevIdx => (prevIdx + 1) % data!.length);
        break;
      case 'ArrowUp':
        data && setIndex(prevIdx => (prevIdx - 1 + data!.length) % data!.length);
        break;
      case 'Escape':
        setSearchInput('');
        setIndex(-1);
        break;
      case 'Enter':
        if (idx !== -1 && data![idx]) {
          const enterData = data![idx].sickNm;
          setSearchInput(enterData);
        }
        break;
    }
  };

  return (
    <InputWrap>
      <InputBox
        placeholder='질환명을 입력해 주세요.'
        onChange={event => setSearchInput(event.target.value)}
        onKeyDown={keyDownHandler}
        value={searchInput}
      />
      <SearchIcon>
        <AiOutlineSearch size='30' />
      </SearchIcon>
      <SearchResult focusIndex={idx} data={data} />
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
