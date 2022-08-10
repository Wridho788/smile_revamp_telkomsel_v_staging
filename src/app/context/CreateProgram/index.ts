import React from "react";
import { createContext, SetStateAction } from "react";
import { IProgramData } from "./types";

interface ICreateProgramContextValues {
  programData: IProgramData;
  setProgramData: SetStateAction<any>;
}

export const CreateProgramContext = createContext<
  ICreateProgramContextValues | undefined
>(undefined);
