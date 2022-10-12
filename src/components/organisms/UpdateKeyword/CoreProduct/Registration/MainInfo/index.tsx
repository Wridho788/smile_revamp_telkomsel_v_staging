import { Box, Divider, Grid, Stack } from "@mui/material";
import * as React from "react";
import { optionsObj } from "../../../../../../mocks/options";
import { H2, OutlinedTextField, Select } from "../../../../../atoms";
import { IMainInfoProps } from "./type";

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const [productName, setProductName] = React.useState("");
  const [KeywordTaskBid, setKeywordTaskBid] = React.useState("");
  const [confirmationNotification, setConfirmationNotification] =
    React.useState("");
  const [apiConfiguration, setApiConfiguration] = React.useState("");

  return (
    <Box pt="2vw">
      <Divider textAlign="left">
        <H2 textTransform="uppercase">
          core product specific main info configuration
        </H2>
      </Divider>
      <Grid container columns={9} columnSpacing="3vw" pt="3vw" pl="2vw">
        <Grid item xs={4}>
          <Stack direction="column" spacing="1vw">
            <OutlinedTextField
              direction="column"
              label="Product Name"
              placeholder="Product Name"
              variant={"outlined"}
              value={productName}
              handleChange={setProductName}
            />
            <Select
              direction="column"
              label="Keyword Task BID"
              placeholder="Option"
              options={optionsObj}
              optionLabel="set_value"
              value={KeywordTaskBid}
              handleChange={setKeywordTaskBid}
            />
            <Select
              direction="column"
              label="Confirmation Notification"
              placeholder="Option"
              options={optionsObj}
              optionLabel="set_value"
              value={confirmationNotification}
              handleChange={setConfirmationNotification}
            />
            <OutlinedTextField
              direction="column"
              label="Max Winner in a Phase"
              placeholder="Max Winner in a Phase"
              variant={"outlined"}
              value={apiConfiguration}
              handleChange={setApiConfiguration}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainInfo;
