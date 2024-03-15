import { createContext, useReducer } from "react";

const INITAL_CONTEXT = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const serachContext = createContext(INITAL_CONTEXT);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SERACH":
      return action.payload;
    case "RESEST_SEARCH":
      return INITAL_CONTEXT; // Hier den Initialzustand zurückgeben
    default:
      return state;
  }
};

export const SerachContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITAL_CONTEXT);
  return (
    <serachContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </serachContext.Provider>
  );
};
