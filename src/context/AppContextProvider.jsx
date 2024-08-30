import { useState } from "react";
import AppContext from "./app-context";

function AppContextProvider(props) {
  const { children } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalCalories, setTotalCalories] = useState(0);
  const updateCurrentDate = (date) => {
    setCurrentDate(new Date(date));
  };
  const currentDateStr = !!currentDate
    ? currentDate.toISOString().split("T")[0]
    : "";
  return (
    <AppContext.Provider
      value={{
        currentDate,
        setCurrentDate: updateCurrentDate,
        totalCalories,
        setTotalCalories,
        currentDateStr,
        isValidDate: !!currentDateStr,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
