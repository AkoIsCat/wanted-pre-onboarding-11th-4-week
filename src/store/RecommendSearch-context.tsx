import React, { createContext, useReducer, Dispatch, useContext } from 'react';

interface RecommendSearchAction {
  type: string;
  payload: RecommnedData[];
}

interface RecommnedData {
  sickCd: string;
  sickNm: string;
}

interface Children {
  children: React.ReactNode;
}

const recommendSearchReducer = (state: Array<RecommnedData>, action: RecommendSearchAction) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload;
    default:
      return state;
  }
};

export const RecommendSearchStateContext = createContext<RecommnedData[]>([]);
export const RecommendSearchDispatchContext = createContext<Dispatch<RecommendSearchAction>>(
  () => {}
);

const initialState: RecommnedData[] = [];

const RecommenedSearchProvider = ({ children }: Children) => {
  const [suggestedSearchList, dispatch] = useReducer(recommendSearchReducer, initialState);

  return (
    <RecommendSearchStateContext.Provider value={suggestedSearchList}>
      <RecommendSearchDispatchContext.Provider value={dispatch}>
        {children}
      </RecommendSearchDispatchContext.Provider>
    </RecommendSearchStateContext.Provider>
  );
};

export default RecommenedSearchProvider;

export const useRecommendSearchState = () => {
  return useContext(RecommendSearchStateContext);
};

export const useRecommendSearchDispatch = () => {
  return useContext(RecommendSearchDispatchContext);
};
