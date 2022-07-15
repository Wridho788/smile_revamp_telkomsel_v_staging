import React from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "./StyledComponents";
import SearchIcon from "@mui/icons-material/Search";

const KeywordSearch = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default KeywordSearch;
