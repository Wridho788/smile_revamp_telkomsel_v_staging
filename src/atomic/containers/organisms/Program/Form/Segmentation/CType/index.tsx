import React, { FC } from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import TextFieldApp from "../../../../../../components/atoms/TextFieldApp";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import useCtypeLogic from "./useCtypeLogic";
import DeleteIcon from "@mui/icons-material/Delete";

const CType: FC = () => {
  const { selectedList, addToSelectedList, removeFromSelectedList } =
    useCtypeLogic();
  const dummy = [
    {
      id: 1,
      value: "Loyal Customer",
    },
    {
      id: 2,
      value: "Gold Customer",
    },
    {
      id: 3,
      value: "Platinum Customer",
    },
  ];
  return (
    <Grid container justifyContent={"space-between"}>
      <Box item component={Grid} xs={5} p={1}>
        <Box>
          <TextFieldApp label={"Search"} />
        </Box>
        {dummy.map((item: any) => {
          return (
            <Box key={item.id} display={"flex"}>
              <Checkbox
                value={item.value}
                onChange={(e) => {
                  e.target.checked
                    ? addToSelectedList(item)
                    : removeFromSelectedList(item);
                }}
              />
              <Typography variant={"body1"} mt={1}>
                {item.value}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box item component={Grid} xs={5} p={1}>
        <Box>
          <TextFieldApp label={"Search"} />
        </Box>
        {selectedList.map((item: any) => {
          return (
            <Box key={item.id} display={"flex"}>
              <IconButton
                style={{ marginTop: "6px" }}
                onClick={() => {
                  removeFromSelectedList(item);
                }}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon color={"primary"} fontSize="inherit" />
              </IconButton>
              <Typography variant={"body1"} mt={1}>
                {item.value}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
};

export default CType;
