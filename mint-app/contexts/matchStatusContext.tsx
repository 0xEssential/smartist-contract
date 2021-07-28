import React, {
  createContext,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

export enum MatchStatus {
  Loading,
  Pending,
  Active,
  Complete,
}

const defaultValue = {
  matchStatus: MatchStatus.Pending,
  setMatchStatus: undefined,
};

const MatchStatusContext = createContext(defaultValue);

const MatchStatusContextProvider = ({ children }: any): ReactElement => {
  const [matchStatus, setMatchStatus] = useState(MatchStatus.Pending);

  const value = {
    matchStatus,
    setMatchStatus,
  };

  return (
    <MatchStatusContext.Provider value={value}>
      {children}
    </MatchStatusContext.Provider>
  );
};

export default MatchStatusContextProvider;
export { MatchStatusContext };
