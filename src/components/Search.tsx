import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { getData } from '../api/api';
import useDebounce from '../hooks/useDebounce';
import { useRecommendSearchDispatch } from '../store/SuggestedSearch-context';

import { AiOutlineSearch } from 'react-icons/ai';

const Search = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const dispatch = useRecommendSearchDispatch();

  const debouncedSearchInput = useDebounce(searchInput, 350);

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
    }
  }, [debouncedSearchInput]);

  return (
    <InputWrap>
      <InputBox
        placeholder={`질환명을 입력해 주세요.`}
        onChange={event => setSearchInput(event.target.value)}
      />
      <SearchIcon>
        <AiOutlineSearch size='30' />
      </SearchIcon>
    </InputWrap>
  );
};

export default Search;

const InputWrap = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
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
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
