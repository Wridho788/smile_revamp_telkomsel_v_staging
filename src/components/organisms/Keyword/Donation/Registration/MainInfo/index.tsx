import { Box, Divider, Grid, Stack, Switch } from "@mui/material";
import * as React from "react";
import { BodyCopy, H2, OutlinedTextField } from "../../../../../atoms";
import { IMainInfoProps } from "./type";

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [firstTitle, setFirstTitle] = React.useState("");
  const [secondTitle, setSecondTitle] = React.useState("");
  const [story, setStory] = React.useState("");
  const [termCondition, setTermCondition] = React.useState("");
  const [minimumPoint, setMinimumPoint] = React.useState("");
  const [targetPoint, setTargetPoint] = React.useState("");
  const [donationCategory, setDonationCategory] = React.useState("");
  const [partner1, setPartner1] = React.useState("");
  const [partner2, setPartner2] = React.useState("");
  const [partner3, setPartner3] = React.useState("");

  return (
    <Box pt="2vw">
      <Divider textAlign="left">
        <H2 textTransform="uppercase">
          donation specific main info configuration
        </H2>
      </Divider>
      <Grid container columns={9} columnSpacing="3vw" pt="3vw">
        <Grid item xs={4}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="end"
            width="100%"
          >
            <Switch {...label} defaultChecked />
          </Stack>
          <Stack spacing="1.5vw">
            <OutlinedTextField
              direction="column"
              label="First Title"
              placeholder="First Title"
              variant="outlined"
              value={firstTitle}
              handleChange={setFirstTitle}
            />
            <OutlinedTextField
              direction="column"
              label="Second Title"
              placeholder="Second Title"
              variant="outlined"
              value={secondTitle}
              handleChange={setSecondTitle}
            />
            <OutlinedTextField
              direction="column"
              label="Story"
              placeholder="Story"
              variant="outlined"
              value={story}
              handleChange={setStory}
              multiline
              rows={3}
            />
            <OutlinedTextField
              direction="column"
              label="Term & Condition"
              placeholder="Term & Condition"
              variant="outlined"
              value={termCondition}
              handleChange={setTermCondition}
              multiline
              rows={3}
            />
            <Grid container>
              <Grid item xs={7}>
                <Box mt="1vw">
                  <BodyCopy mb="0.5vw">Donation Image</BodyCopy>
                  <img
                    src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                    width="100%"
                    alt=""
                  />
                </Box>
              </Grid>
            </Grid>
            <Box mt="1vw">
              <BodyCopy mb="0.5vw">Donation Image Large</BodyCopy>
              <img
                src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                width="100%"
                alt=""
              />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing="1vw">
            <Grid item xs={6}>
              <OutlinedTextField
                direction="column"
                label="Minimum Point"
                placeholder="Minimum Point"
                variant="outlined"
                value={minimumPoint}
                handleChange={setMinimumPoint}
              />
            </Grid>
            <Grid item xs={6}>
              <OutlinedTextField
                direction="column"
                label="Target Point"
                placeholder="Target Point"
                variant="outlined"
                value={targetPoint}
                handleChange={setTargetPoint}
              />
            </Grid>
          </Grid>
          <Grid container spacing="1vw" mt="1vw">
            <Grid item xs={6}>
              <OutlinedTextField
                direction="column"
                label="Donation Category"
                placeholder="Donation Category"
                variant="outlined"
                value={donationCategory}
                handleChange={setDonationCategory}
              />
            </Grid>
          </Grid>
          <Grid container spacing="1vw" mt="1vw">
            <Grid item xs={6}>
              <OutlinedTextField
                direction="column"
                label="Partner 1"
                placeholder="Partner 1"
                variant="outlined"
                value={partner1}
                handleChange={setPartner1}
              />
            </Grid>
            <Grid item xs={6}>
              <OutlinedTextField
                direction="column"
                label="Partner 2"
                placeholder="Partner 2"
                variant="outlined"
                value={partner2}
                handleChange={setPartner2}
              />
            </Grid>
          </Grid>
          <Stack spacing="1vw" mt="1vw">
            <Grid container columnSpacing="1vw">
              <Grid item xs={6}>
                <Box mt="1vw">
                  <img
                    src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                    width="100%"
                    alt=""
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box mt="1vw">
                  <img
                    src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                    width="100%"
                    alt=""
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <OutlinedTextField
                  direction="column"
                  label="Partner 3"
                  placeholder="Partner 3"
                  variant="outlined"
                  value={partner3}
                  handleChange={setPartner3}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Box mt="1vw">
                  <img
                    src="https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"
                    width="100%"
                    alt=""
                  />
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainInfo;
