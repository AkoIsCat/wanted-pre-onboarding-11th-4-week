import { useQuery } from '@tanstack/react-query';
import { getData } from '../api/api';
import { AxiosError } from 'axios';

export interface Result {
  sickCd: string;
  sickNm: string;
}

export const useSearchResult = (string: string) => {
  return useQuery<Result[], AxiosError, Result[], [string, string]>(
    ['result', string],
    () => getData(string.trim()),
    {
      enabled: !!string,
      select: data => (data.length > 7 ? data.slice(0, 7) : data),
      staleTime: 60000,
    }
  );
};
