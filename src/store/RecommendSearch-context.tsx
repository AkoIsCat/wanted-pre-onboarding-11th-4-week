import React, { createContext, useReducer, Dispatch, useContext } from 'react';

interface RecommendSearchAction {
  type: string;
  payload: RecommnedData;
}

interface RecommnedDataItem {
  sickCd: string;
  sickNm: string;
}

interface RecommnedData {
  expiry: number;
  result: RecommnedDataItem[];
}

interface Children {
  children: React.ReactNode;
}

const recommendSearchReducer = (state: RecommnedData, action: RecommendSearchAction) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload;
    default:
      return state;
  }
};

const initialState: RecommnedData = {
  expiry: 0,
  result: [],
};

export const RecommendSearchStateContext = createContext<RecommnedData>(initialState);
export const RecommendSearchDispatchContext = createContext<Dispatch<RecommendSearchAction>>(
  () => {}
);

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
