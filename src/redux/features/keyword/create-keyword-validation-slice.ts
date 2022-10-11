// Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { ICreateKeywordValidation } from "./interface";

const initialState: ICreateKeywordValidation = {
  keywordName: "",
  keywordNameEligibility: "",
};

export const createKeywordValidationSlice = createSlice({
  initialState,
  name: "createKeywordValidation",
  reducers: {
    SET_KEYWORD_VALIDATION: (
      state,
      { payload }: PayloadAction<ICreateKeywordValidation>
    ) => {
      state.keywordName = payload.keywordName ?? state.keywordName;
      state.keywordNameEligibility =
        payload.keywordNameEligibility ?? state.keywordNameEligibility;
    },
  },
});

// Mutations
export const { SET_KEYWORD_VALIDATION } = createKeywordValidationSlice.actions;

export default createKeywordValidationSlice.reducer;
