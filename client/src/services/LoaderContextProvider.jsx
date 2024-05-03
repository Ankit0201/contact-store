import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

const LoaderContext = createContext();

export const useLoader = () => {
  return useContext(LoaderContext);
};

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const showToaster = (msg, type = "success") => {
    toast(msg, {
      type: type,
      autoClose: 1000,
    });
  };

  return (
    <LoaderContext.Provider
      value={{ isLoading, showLoader, hideLoader, showToaster }}
    >
      {children}
    </LoaderContext.Provider>
  );
};
