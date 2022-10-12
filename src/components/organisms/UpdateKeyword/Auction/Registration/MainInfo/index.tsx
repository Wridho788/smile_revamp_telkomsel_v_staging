import { Box, Button, Divider, Grid, Stack } from "@mui/material";
import * as React from "react";
import { optionsObj } from "../../../../../../mocks/options";
import {
  BodyCopy,
  H2,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  Select,
} from "../../../../../atoms";
import BasicFormCard from "../../../../../atoms/BasicFormCard";
import BasicFormCardWithRightSwitch from "../../../../../atoms/BasicFormCardWithRightSwitch";
import { IMainInfoProps } from "./type";
import AddIcon from "@mui/icons-material/Add";

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const [outbit, setOutbit] = React.useState("");
  const [winning, setWinning] = React.useState("");
  const [bidding, setBidding] = React.useState("");
  const [poinRefund, setPoinRefund] = React.useState("");
  const [keywordBidding, setKeywordBidding] = React.useState("");
  const [startBidding, setStartBidding] = React.useState("");
  const [endBidding, setEndBidding] = React.useState("");
  const [minBiddingPoin, setMinBiddingPoin] = React.useState("");
  const [multipliePoin, setMultipliePoin] = React.useState("");
  const [winnerPhase, setWinnerPhase] = React.useState("");
  const [maxWinnerInAPhase, setMaxWinnerInAPhase] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [prizeName, setPrizeName] = React.useState("");
  const [prizeDescription, setPrizeDescription] = React.useState("");

  return (
    <Box pt="2vw">
      <Divider textAlign="left">
        <H2 textTransform="uppercase">
          auction specific main info configuration
        </H2>
      </Divider>
      <Grid container columns={9} columnSpacing="3vw" pt="3vw">
        <Grid item xs={4}>
          <BasicFormCard title="notification configuration">
            <Stack direction="column" spacing="1vw">
              <Select
                direction="column"
                label="Outbid"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={outbit}
                handleChange={setOutbit}
              />
              <Select
                direction="column"
                label="Winning"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={winning}
                handleChange={setWinning}
              />
              <Select
                direction="column"
                label="Bidding"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={bidding}
                handleChange={setBidding}
              />
              <Select
                direction="column"
                label="Poin Refund"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={poinRefund}
                handleChange={setPoinRefund}
              />
            </Stack>
          </BasicFormCard>
          <Stack direction="column" spacing="1vw" mt="3vw">
            <Select
              direction="column"
              label="Keyword Bidding"
              placeholder="Option"
              options={optionsObj}
              optionLabel="set_value"
              value={keywordBidding}
              handleChange={setKeywordBidding}
            />
            <ResponsiveDateTimePicker
              direction="column"
              label="Start Bidding"
              placeholder="Start Bidding"
              value={startBidding}
              handleChange={setStartBidding}
            />
            <ResponsiveDateTimePicker
              direction="column"
              label="End Bidding"
              placeholder="End Bidding"
              value={endBidding}
              handleChange={setEndBidding}
            />
            <OutlinedTextField
              direction="column"
              label="Min Bidding Poin"
              placeholder="Min Bidding Poin"
              variant={"outlined"}
              value={minBiddingPoin}
              handleChange={setMinBiddingPoin}
            />
            <OutlinedTextField
              direction="column"
              label="Multiplie Poin"
              placeholder="Multiplie Poin"
              variant={"outlined"}
              value={multipliePoin}
              handleChange={setMultipliePoin}
            />
            <Select
              direction="column"
              label="Winner Phase"
              placeholder="Option"
              options={optionsObj}
              optionLabel="set_value"
              value={winnerPhase}
              handleChange={setWinnerPhase}
            />
            <OutlinedTextField
              direction="column"
              label="Max Winner in a Phase"
              placeholder="Max Winner in a Phase"
              variant={"outlined"}
              value={maxWinnerInAPhase}
              handleChange={setMaxWinnerInAPhase}
            />
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <BasicFormCardWithRightSwitch title="how to redeem">
            <Stack direction="column" spacing="1vw">
              <OutlinedTextField
                direction="column"
                label="Title"
                placeholder="Title"
                variant={"outlined"}
                value={title}
                handleChange={setTitle}
              />
              <OutlinedTextField
                direction="column"
                label="Description"
                placeholder="Description"
                variant={"outlined"}
                value={description}
                handleChange={setDescription}
                multiline
                rows={3}
              />
            </Stack>
          </BasicFormCardWithRightSwitch>
          <BasicFormCardWithRightSwitch title="term & condition" mt="3vw">
            <Stack direction="column" spacing="1vw">
              <OutlinedTextField
                direction="column"
                label="Title"
                placeholder="Title"
                variant={"outlined"}
                value={title}
                handleChange={setTitle}
              />
              <OutlinedTextField
                direction="column"
                label="Description"
                placeholder="Description"
                variant={"outlined"}
                value={description}
                handleChange={setDescription}
                multiline
                rows={3}
              />
              <Box display="flex" justifyContent="center">
                <Button variant="contained" startIcon={<AddIcon />}>
                  <BodyCopy textTransform="capitalize">add more</BodyCopy>
                </Button>
              </Box>
            </Stack>
          </BasicFormCardWithRightSwitch>
          <Divider textAlign="left" sx={{ mt: "3vw" }}>
            <H2 textTransform="uppercase">prize configuration</H2>
          </Divider>
          <Stack direction="row" spacing="1vw" mt="1vw">
            <OutlinedTextField
              direction="column"
              label="Prize Name"
              placeholder="Prize Name"
              variant={"outlined"}
              value={prizeName}
              handleChange={setPrizeName}
            />
            <OutlinedTextField
              direction="column"
              label="Prize Name"
              placeholder="Prize Name"
              variant={"outlined"}
              value={prizeDescription}
              handleChange={setPrizeDescription}
            />
          </Stack>
          <Box mt="1vw">
            <BodyCopy mb="0.5vw">Prize Image</BodyCopy>
            <img
              src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
              width="120px"
              height="120px"
              alt=""
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainInfo;
