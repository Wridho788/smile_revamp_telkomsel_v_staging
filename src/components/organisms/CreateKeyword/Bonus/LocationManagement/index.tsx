import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Divider, Grid, Stack } from "@mui/material";
import {
  OutlinedTextField,
  BodyCopy,
  SmallCopy,
  Subtitle,
} from "../../../../atoms";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";

interface INotificationLuckyDrawProps {
  bonusType: string,
  keywordCreateState: any,
  keywordCreate: any,
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const LocationManagement: React.FunctionComponent<
  INotificationLuckyDrawProps
> = ({
  bonusType,
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger
}) => {
  const index = keywordCreate.bonus.findIndex(
      ({ bonus_type }: any) => bonus_type === bonusType
  );

  return (
    <Box>
      <Divider textAlign="left" sx={{ pt: "1vw" }}>
        <Subtitle textTransform="uppercase">
          stock per location management
        </Subtitle>
      </Divider>
      <Stack>
        <Grid container>
          <Grid
              item
              xs={5}
              border="0.1vw solid rgba(0,0,0,0.1)"
              p="0.8vw"
          >
            <BodyCopy
                align="center"
                textTransform="uppercase"
                fontWeight="bold"
            >
              Location
            </BodyCopy>
          </Grid>
          <Grid
              item
              xs={7}
              border="0.1vw solid rgba(0,0,0,0.1)"
              p="0.8vw"
          >
            <BodyCopy
                align="center"
                textTransform="uppercase"
                fontWeight="bold"
            >
              Stock Per Location
            </BodyCopy>
          </Grid>
        </Grid>
        {/* TODO: Handle response locations */}
        {(keywordCreateState.bonus[index]?.locations && index !== -1) && (
            keywordCreateState.bonus[index].locations.map((location: any, idx: any) => {
              return (
                  <Grid key={`location__${idx}`} container>
                    <Grid
                        item
                        xs={5}
                        border="0.1vw solid rgba(0,0,0,0.1)"
                        p="0.8vw"
                    >
                      <BodyCopy textTransform="uppercase">
                        {location.name}
                      </BodyCopy>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        border="0.1vw solid rgba(0,0,0,0.1)"
                        p="0.8vw"
                    >
                      <OutlinedTextField
                          isRequired={false}
                          type="number"
                          variant="outlined"
                          InputProps={{ inputProps: { min: 0 } }}
                          value={keywordCreateState.bonus[index].locations[
                              idx
                              ].stock.toString()}
                          handleChange={(value: number) => {
                            keywordCreateState.bonus[index].locations[idx].stock =
                                Number(value);
                            setStateTrigger(!stateTrigger);
                          }}
                      />
                    </Grid>
                  </Grid>
              );
            })
        )}

        {/* TODO: Handle response return stock_location */}
        {(keywordCreateState.bonus[index]?.stock_location && index !== -1) && (
            keywordCreateState.bonus[index].stock_location.map((location: any, idx: any) => {
              return (
                  <Grid key={`location__${idx}`} container>
                    <Grid
                        item
                        xs={5}
                        border="0.1vw solid rgba(0,0,0,0.1)"
                        p="0.8vw"
                    >
                      <BodyCopy textTransform="uppercase">
                        {location.name}
                      </BodyCopy>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        border="0.1vw solid rgba(0,0,0,0.1)"
                        p="0.8vw"
                    >
                      <OutlinedTextField
                          isRequired={false}
                          type="number"
                          variant="outlined"
                          InputProps={{ inputProps: { min: 0 } }}
                          value={keywordCreateState.bonus[index].stock_location[
                              idx
                              ].stock.toString()}
                          handleChange={(value: number) => {
                            keywordCreateState.bonus[index].stock_location[idx].stock =
                                Number(value);
                            setStateTrigger(!stateTrigger);
                          }}
                      />
                    </Grid>
                  </Grid>
              );
            })
        )}

        <SmallCopy color="primary" mt="1vw">
          ** If you don't want set stock, please leave it blank
        </SmallCopy>
      </Stack>
    </Box>
  );
};

export default LocationManagement;
