import React, { Dispatch, SetStateAction } from "react";
import { Box, Divider, Grid, Stack } from "@mui/material";
import {
  OutlinedTextField,
  BodyCopy,
  SmallCopy,
  Subtitle,
} from "../../../../atoms";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";

interface INotificationLuckyDrawProps {
  initialName: any;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const LocationManagement: React.FunctionComponent<
  INotificationLuckyDrawProps
> = ({ initialName, stateTrigger, setStateTrigger }) => {
  const { data: locationOptions = { data: [] } } =
    useLocationTemplateQuery(FilterInitial);
  return (
    <Box>
      <Divider textAlign="left" sx={{ pt: "1vw" }}>
        <Subtitle textTransform="uppercase">
          stock per location management
        </Subtitle>
      </Divider>
      <Stack>
        <Grid container>
          <Grid item xs={5} border="0.1vw solid rgba(0,0,0,0.1)" p="0.8vw">
            <BodyCopy
              align="center"
              textTransform="uppercase"
              fontWeight="bold"
            >
              Location
            </BodyCopy>
          </Grid>
          <Grid item xs={7} border="0.1vw solid rgba(0,0,0,0.1)" p="0.8vw">
            <BodyCopy
              align="center"
              textTransform="uppercase"
              fontWeight="bold"
            >
              Stock Per Location
            </BodyCopy>
          </Grid>
        </Grid>
        {/*{initialName.map((currItem: any, idx: number) => {*/}
        {/*  const locationName = locationOptions.data.find(*/}
        {/*    (e) => e["_id"] === currItem.location_id*/}
        {/*  )?.name;*/}
        {/*  return (*/}
        {/*    <Grid key={`location__${idx}`} container>*/}
        {/*      <Grid item xs={5} border="0.1vw solid rgba(0,0,0,0.1)" p="0.8vw">*/}
        {/*        <BodyCopy textTransform="uppercase">{locationName}</BodyCopy>*/}
        {/*      </Grid>*/}
        {/*      <Grid item xs={7} border="0.1vw solid rgba(0,0,0,0.1)" p="0.8vw">*/}
        {/*        <OutlinedTextField*/}
        {/*          isRequired={false}*/}
        {/*          type="number"*/}
        {/*          variant="outlined"*/}
        {/*          InputProps={{ inputProps: { min: 0 } }}*/}
        {/*          value={String(initialName[idx].stock)}*/}
        {/*          handleChange={(value: string) => {*/}
        {/*            initialName[idx].stock = Number(value);*/}
        {/*            setStateTrigger(!stateTrigger);*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  );*/}
        {/*})}*/}
        <SmallCopy color="primary" mt="1vw">
          ** If you don't want set stock, please leave it blank
        </SmallCopy>
      </Stack>
    </Box>
  );
};

export default LocationManagement;
