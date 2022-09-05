import * as React from "react";
import { Grid, Stack, IconButton, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { OutlinedTextField, Select } from "../../../atoms";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  useGetBonusTypeQuery,
  useGetLocationTypeQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../redux/utils/initial-general";
import {
  CreateKeywordGeneral,
  IKeywordLocationTypeGeneral,
  KeywordLocationTypeGeneral,
} from "../initial";
import { ICreateKeyword } from "../interfaces";
import { useProductSelectBoxQuery } from "../../../../redux/features/product/product-api-slice";
import { useLocationTemplateQuery } from "../../../../redux/features/location/location-api-slice";

interface IBonusProps {}

const Bonus: React.FunctionComponent<IBonusProps> = (props) => {
  const { data: bonusTypeOptions = { data: [] } } = useGetBonusTypeQuery();
  const { data: bonusLocationTypeOptions = { data: [] } } =
    useGetLocationTypeQuery();
  const { data: bonusProductOptions = [] } =
    useProductSelectBoxQuery(FilterInitial);
  const { data: bonusLocationOptions = { data: [] } } =
    useLocationTemplateQuery(FilterInitial);

  const keywordCreate = CreateKeywordGeneral;
  const keywordLocationType = KeywordLocationTypeGeneral;
  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);
  const [keywordLocationTypeState, setKeywordLocationTypeState] =
    React.useState<IKeywordLocationTypeGeneral>(keywordLocationType);
  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  React.useEffect(() => {
    setKeywordLocationTypeState(keywordLocationType);
  }, [keywordLocationType, stateTrigger]);

  React.useEffect(() => {
    console.log(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  return (
    <Box pt="1vw">
      <Stack maxWidth={"100%"} spacing="2vw">
        {keywordCreate.keyword_bonus.map((_, idx) => (
          <Grid key={`rowItem__${idx}`} container columns={12} px="3vw">
            <Grid
              item
              xs={11}
              border="0.1vw solid rgba(0, 0, 0, 0.1)"
              borderRadius="0.3vw"
              p="2vw"
            >
              <Grid container columns={12} spacing={"1vw"}>
                <Grid item xs={3}>
                  <Select
                    direction="column"
                    label="Type"
                    placeholder="Option"
                    options={bonusTypeOptions.data}
                    value={keywordCreateState.keyword_bonus[idx].bonus_type}
                    handleChange={(value: any) => {
                      keywordCreate.keyword_bonus[idx].bonus_type = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Select
                    direction="column"
                    label="Location Type"
                    placeholder="Option"
                    options={bonusLocationTypeOptions.data}
                    value={keywordLocationTypeState.location_type}
                    handleChange={(value: string) => {
                      keywordLocationType.location_type = value;
                      keywordCreate.keyword_bonus[idx].location = "";
                      keywordCreate.keyword_bonus[idx].bucket = "";
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                {keywordLocationTypeState.location_type.length > 0 &&
                  bonusLocationOptions.data.find(
                    (e) => e["type"] === keywordLocationTypeState.location_type
                  ) !== undefined && (
                    <Grid item xs={3}>
                      <Select
                        direction="column"
                        label="Location"
                        placeholder="Option"
                        options={[
                          bonusLocationOptions.data.find(
                            (e) =>
                              e["type"] ===
                              keywordLocationTypeState.location_type
                          ),
                        ]}
                        optionLabel={"name"}
                        value={keywordCreateState.keyword_bonus[idx].location}
                        handleChange={(value: any) => {
                          keywordCreate.keyword_bonus[idx].location = value;
                          keywordCreate.keyword_bonus[idx].bucket = "";
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    </Grid>
                  )}
                <Grid item xs={3}>
                  {keywordLocationTypeState.location_type.length > 0 &&
                    bonusLocationOptions.data.find(
                      (e) =>
                        e["type"] === keywordLocationTypeState.location_type
                    ) !== undefined &&
                    bonusLocationOptions.data.find(
                      (e) =>
                        e["_id"] ===
                        keywordCreateState?.keyword_bonus[idx]?.location
                    )?.bucket !== undefined && (
                      <Select
                        direction="column"
                        label="Bucket"
                        placeholder="Option"
                        options={
                          bonusLocationOptions.data.find(
                            (e) =>
                              e["_id"] ===
                              keywordCreateState.keyword_bonus[idx].location
                          )?.bucket
                        }
                        optionLabel={"name"}
                        value={keywordCreateState.keyword_bonus[idx].bucket}
                        handleChange={(value: any) => {
                          keywordCreate.keyword_bonus[idx].bucket = value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    )}
                </Grid>

                <Grid item xs={4}>
                  <Select
                    direction="column"
                    label="Bonus"
                    placeholder="Option"
                    options={bonusProductOptions}
                    optionLabel={"name"}
                    optionValue={"id"}
                    value={keywordCreateState.keyword_bonus[idx].bonus_id || ""}
                    handleChange={(value: any) => {
                      keywordCreate.keyword_bonus[idx].bonus_id = value;
                      keywordCreate.keyword_bonus[idx].bonus_name =
                        bonusProductOptions.find((e) => e.id === value)?.name;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                  {/* <OutlinedTextField
                    label="Payment"
                    placeholder="Payment"
                    value={keywordCreateState.keyword_bonus[idx].payment}
                    handleChange={(value: any) => {
                      keywordCreate.keyword_bonus[idx].payment = value;
                      setStateTrigger(!stateTrigger);
                    }}
                    variant="outlined"
                    direction="column"
                  /> */}
                </Grid>

                <Grid item xs={4}>
                  {bonusTypeOptions?.data
                    ?.find(
                      (e) =>
                        e["_id"] ===
                        keywordCreateState.keyword_bonus[idx].bonus_type
                    )
                    ?.set_value?.includes("Telco Product") && (
                    <OutlinedTextField
                      label="Granular"
                      placeholder="Granular"
                      value={keywordCreateState.keyword_bonus[idx].granular}
                      handleChange={(value: any) => {
                        keywordCreate.keyword_bonus[idx].granular = value;
                        setStateTrigger(!stateTrigger);
                      }}
                      variant="outlined"
                      direction="column"
                    />
                  )}
                </Grid>

                <Grid item xs={4}>
                  {bonusTypeOptions?.data
                    ?.find(
                      (e) =>
                        e["_id"] ===
                        keywordCreateState.keyword_bonus[idx].bonus_type
                    )
                    ?.set_value?.includes("Telco Product") && (
                    <OutlinedTextField
                      label="Bid"
                      placeholder="Bid"
                      value={keywordCreateState.keyword_bonus[idx].bid}
                      handleChange={(value: any) => {
                        keywordCreate.keyword_bonus[idx].bid = value;
                        setStateTrigger(!stateTrigger);
                      }}
                      variant="outlined"
                      direction="column"
                    />
                  )}
                </Grid>

                <Grid item xs={4}>
                  <OutlinedTextField
                    type="number"
                    label="Quantity"
                    placeholder="Quantity"
                    value={keywordCreateState.keyword_bonus[
                      idx
                    ].qty_denom.toString()}
                    handleChange={(value: any) => {
                      keywordCreate.keyword_bonus[idx].qty_denom =
                        Number(value);
                      setStateTrigger(!stateTrigger);
                    }}
                    variant="outlined"
                    direction="column"
                  />
                </Grid>
                <Grid item xs={4}>
                  <OutlinedTextField
                    type="number"
                    label="Limit"
                    placeholder="Limit"
                    value={keywordCreateState.keyword_bonus[
                      idx
                    ].limit.toString()}
                    handleChange={(value: any) => {
                      keywordCreate.keyword_bonus[idx].limit = Number(value);
                      setStateTrigger(!stateTrigger);
                    }}
                    variant="outlined"
                    direction="column"
                  />
                </Grid>
                <Grid item xs={4}>
                  <OutlinedTextField
                    type="number"
                    label="Stock"
                    placeholder="Stock"
                    value={keywordCreateState.keyword_bonus[
                      idx
                    ].stock.toString()}
                    handleChange={(value: any) => {
                      keywordCreate.keyword_bonus[idx].stock = Number(value);
                      setStateTrigger(!stateTrigger);
                    }}
                    variant="outlined"
                    direction="column"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={1}
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  keywordCreate.keyword_bonus.splice(idx, 1);
                  setStateTrigger(!stateTrigger);
                }}
                aria-label="delete"
                size="large"
                sx={{ color: "primary.main" }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() => {
              keywordCreate.keyword_bonus.push({
                bonus_type: "",
                bonus_id: "",
                bonus_name: "",
                location: "",
                bucket: "",
                limit: 0,
                stock: 0,
                qty_denom: 0,
                payment: "TRF",
                granular: "",
                bid: "",
              });
              setStateTrigger(!stateTrigger);
            }}
            color="primary"
            variant="contained"
            startIcon={<AddBoxIcon fontSize="large" />}
            sx={{
              borderRadius: "0.3vw",
              paddingInline: "1.5vw",
              paddingBlock: "0.5vw",
            }}
          >
            Add
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Bonus;
