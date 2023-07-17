import React, { createContext, useReducer, Dispatch, useContext } from 'react';

interface recommendSearchAction {
  type: string;
  payload: string[];
}

interface Children {
  children: React.ReactNode;
}

const recommendSearchReducer = (state: string[], action: recommendSearchAction) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload;
    default:
      return state;
  }
};

export const RecommendSearchStateContext = createContext<string[]>([]);
export const RecommendSearchDispatchContext = createContext<Dispatch<recommendSearchAction>>(
  () => {}
);

const initialState: string[] = [];

const SuggestedSearchProvider = ({ children }: Children) => {
  const [suggestedSearchList, dispatch] = useReducer(recommendSearchReducer, initialState);

  return (
    <RecommendSearchStateContext.Provider value={suggestedSearchList}>
      <RecommendSearchDispatchContext.Provider value={dispatch}>
        {children}
      </RecommendSearchDispatchContext.Provider>
    </RecommendSearchStateContext.Provider>
  );
};

export default SuggestedSearchProvider;

export const useRecommendSearchState = () => {
  return useContext(RecommendSearchStateContext);
};

export const useRecommendSearchDispatch = () => {
  return useContext(RecommendSearchDispatchContext);
};
