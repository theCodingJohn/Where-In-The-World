import React, { createContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = (props) => {
  const [data, setData] = useState([]);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {props.children}
    </DataContext.Provider>
  );
};
