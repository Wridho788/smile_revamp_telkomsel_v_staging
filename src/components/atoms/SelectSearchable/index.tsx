import { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  Grid,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import * as React from "react";
import { BodyCopy } from "../Typography";
import { ISelectProps } from "./types";
import AddIcon from "@mui/icons-material/Add";

import AddProgramGroup from "components/organisms/ProgramGroup/AddProgramGroup";
import ModalAddProgramGroup from "components/organisms/ProgramGroup/ModalAddProgramGroup";
import { options } from "../../../mocks/options";

const Index: React.FunctionComponent<ISelectProps> = ({
  label,
  placeholder,
  options,
  optionLabel = "set_value",
  optionValue = "_id",
  value,
  handleChange,
  totalColumn = 10,
  leftColumn = 4,
  rightColumn = 6,
  direction = "row",
  isRequired = true,
  handleRefetch,
  ...props
}) => {
  const [showInput, setShowInput] = useState<boolean>(false);

  return (
    <Grid
      container
      columns={!label || direction === "column" ? rightColumn : totalColumn}
      alignItems={"center"}
    >
      {showInput && (
        <ModalAddProgramGroup
          options={options}
          open={showInput}
          handleClose={() => setShowInput(false)}
          handleRefetch={handleRefetch}
          handleChange={handleChange}
        />
      )}
      <Grid
        item
        xs={!label ? 0 : direction === "column" ? rightColumn : leftColumn}
        pt={0.8}
      >
        <Grid container>
          <Grid>
            <BodyCopy>{label}</BodyCopy>
          </Grid>
          {isRequired && (
            <Grid>
              <BodyCopy color={"red"} sx={{ marginLeft: "5px" }}>
                *
              </BodyCopy>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={rightColumn} mt={direction === "column" ? "0.3vw" : 0}>
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Autocomplete
            id="country-select-demo"
            size="small"
            sx={
              label === "Program Group" ? { width: "90%" } : { width: "100%" }
            }
            options={options || []}
            getOptionLabel={(option: any) => option[optionLabel]}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {option.group_name}
              </Box>
            )}
            onChange={(event: any, value: any) =>
              handleChange(value[optionValue])
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
          {label === "Program Group" && (
            <div
              style={{ padding: "0.5rem", cursor: "pointer" }}
              onClick={() => setShowInput(true)}
            >
              <AddIcon />
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Index;
