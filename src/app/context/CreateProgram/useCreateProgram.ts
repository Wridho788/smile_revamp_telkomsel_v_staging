import React from "react";
import { CreateProgramContext } from ".";

const useCreateProgram = () => {
  const context = React.useContext(CreateProgramContext);
  if (!context) {
    throw new Error("Should be called inside provider");
  }
  return context;
};

export default useCreateProgram;
