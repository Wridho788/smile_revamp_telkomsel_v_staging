import * as React from "react";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { useAutocomplete } from "@mui/base";
import { Box } from "@mui/material";

const Input = styled("input")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
  borderRadius: 10,
  border: "1px solid rgb(133,133,133)",
  padding: "8.5px 14px",
  fontSize: "16px",
  lineHeight: "13px",

  "&:active": {
    border: "1px solid red",
    outline: "none",
  },
  "&:hover": {
    border: "1px solid rgba(0,0,0, .87)",
    outline: "none",
  },
  "&:focus": {
    borderRadius: "10px",
  },
  "&:focus-visible": {
    border: "2px solid red",
    outline: "none",
    borderRadius: "10px",
  },
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: "100%",
  margin: 0,
  padding: 10,
  zIndex: 2,
  position: "absolute",
  top: "2.5em",
  overflow: "auto",
  maxHeight: 200,
  backgroundColor: "rgb(255, 255, 255)",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  borderRadius: 4,
  boxShadow:
    "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontWeight: "400",
  color: "rgba(0, 0, 0, 0.6)",
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

interface InitialOptions {
  name: string;
}
interface IProps<T> {
  label: string;
  options: T[];
}
const InputSearchable = <T extends Pick<InitialOptions, "name">>({
  label,
  options,
}: IProps<T>) => {
  const {
    getRootProps,
    // getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: options,
    // getOptionLabel: (option) => option.name,
  });

  return (
    <Box
      sx={{ width: "100%", display: "flex", position: "relative" }}
      {...getRootProps()}
    >
      <Input placeholder={label} {...getInputProps()} />
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof options).map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.name}</li>
          ))}
        </Listbox>
      ) : null}
    </Box>
  );
};
export default InputSearchable;
