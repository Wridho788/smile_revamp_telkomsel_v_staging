import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {Grid, Stack} from "@mui/material";

import {
  BodyCopy,
  OutlinedTextField,
  Select,
  Subtitle,
} from "../../../../atoms";

import { ICreateKeyword } from "../../interfaces";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { KeywordBonusTelcoProductPrepaid } from "../../initial";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";
import LocationManagement from "../LocationManagement";

interface INotificationTelcoProductPrepaidProps {
  bonusType: string;
  bonusTypeId: any;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const NotificationTelcoProductPrepaid: React.FunctionComponent<
  INotificationTelcoProductPrepaidProps
> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: locationOptions, isFetching  } =
      useLocationTemplateQuery({ type: keywordCreate.eligibility.location_type });

  const options: any = [
    { _id: "True", set_value: "True" },
    { _id: "False", set_value: "False" },
  ];
  const [index, setIndex] = useState<number>(-1);

  // TODO: Get Auction Notification
  useEffect(() => {
    // Initial Keyword Telco Product Postpaid
    const index = keywordCreate.bonus.findIndex(
      ({ bonus_type }) => bonus_type === "telco_prepaid"
    );

    if (index === -1) {
      keywordCreate.bonus.push(KeywordBonusTelcoProductPrepaid);
      const bonusIdx = keywordCreate.bonus.findIndex(
          ({ bonus_type }) => bonus_type === "telco_prepaid"
      );
      setIndex(bonusIdx);

      if (locationOptions) {
        keywordCreateState.eligibility.locations.map((location) =>
            keywordCreateState.bonus[bonusIdx].stock_location.push({
              name: locationOptions.find((e: any) => e["_id"] === location).name,
              location_id: location,
              stock: 0
            })
        );

        setStateTrigger(!stateTrigger);
      }
    }
  }, [isFetching]);

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">Telco Product Prepaid</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing="1vw" px="2vw" py="0.5vw">
          <>
            {index !== -1 && (
              <Stack spacing={4}>
                <Stack spacing={2} direction="row">
                  <OutlinedTextField
                    direction="column"
                    label="Product Name"
                    variant="outlined"
                    value={
                      keywordCreate.bonus[index]["telco_post_product_name"]
                    }
                    handleChange={(value: string) => {
                      keywordCreate.bonus[index]["telco_post_product_name"] =
                        value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                  <OutlinedTextField
                    type="number"
                    direction="column"
                    label="BID"
                    variant="outlined"
                    value={keywordCreate.bonus[index]["telco_post_bid"]}
                    handleChange={(value: string) => {
                      keywordCreate.bonus[index]["telco_post_bid"] = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Select
                    direction="column"
                    label="External API Configuration"
                    placeholder="Option"
                    options={options}
                    value={
                      keywordCreateState.bonus[index].telco_post_api_config
                    }
                    handleChange={(value: string) => {
                      keywordCreateState.bonus[index].telco_post_api_config =
                        value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Stack>

                <Stack>
                  {/* Stock Location Management */}
                  {(locationOptions) && (
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
                </Stack>
              </Stack>
            )}
          </>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default NotificationTelcoProductPrepaid;
