import React, { createContext, useContext, ReactNode } from "react";
import { useSearchParamsState } from "react-use-search-params-state";

// Define the type for your filter state
type SearchParamsStateType = {
  chatId: { type: "string"; default: string | null };
};

// Create the context type
type ParamsContextType = {
  filterParams: any;
  setFilterParams: (newValues: Record<string, any>) => void;
};

// Default values for the context
const filtersDefaults: SearchParamsStateType = {
  chatId: { type: "string", default: null },
};

// Create the context
const ParamsContext = createContext<ParamsContextType | undefined>(undefined);

// Create the provider component
export const ParamsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterParams, setFilterParams] = useSearchParamsState(filtersDefaults);

  return (
    <ParamsContext.Provider value={{ filterParams, setFilterParams }}>
      {children}
    </ParamsContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useParamsContext = () => {
  const context = useContext(ParamsContext);
  if (!context) {
    throw new Error("useParamsContext must be used within a ParamsProvider");
  }
  return context;
};