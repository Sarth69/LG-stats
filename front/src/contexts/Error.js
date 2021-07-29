import React, { useState, createContext } from "react";
import ErrorDialog from "../components/ErrorDialog/ErrorDialog";

const ErrorContext = createContext({
  error: "",
  setError: (msg) => console.error(msg),
  setAxiosError: (err) => console.log(JSON.stringify(err)),
});

export function ErrorProvider({ children }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const newErrorMessage = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  const newAxiosError = (err) => {
    if (err.response) {
      setMessage(err.response.data.message);
    } else {
      setMessage("no connection");
    }
    setOpen(true);
  };

  return (
    <ErrorContext.Provider
      value={{
        error: message,
        setError: newErrorMessage,
        setAxiosError: newAxiosError,
      }}
    >
      <ErrorDialog message={message} open={open} setOpen={setOpen} />
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorContext;
