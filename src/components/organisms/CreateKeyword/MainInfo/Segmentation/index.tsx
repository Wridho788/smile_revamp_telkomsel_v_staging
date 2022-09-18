import React, { Dispatch, SetStateAction } from "react";
import { InputAdornment, Stack } from "@mui/material";
import { Select, OutlinedTextField, Subtitle } from "../../../../atoms";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { ICreateKeyword } from "../../interfaces";
import {
  BooleanOptions,
  ComparisonOptions,
  CustomerTypeOptions,
} from "../../options";
import {
  useCustomerBadgeListQuery,
  useCustomerBrandListQuery,
  useCustomerTierListQuery,
} from "../../../../../redux/features/customer/customer-api-slice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ISegmentationProps {
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Segmentation: React.FunctionComponent<ISegmentationProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: customerBadgeOptions = { data: [] } } =
    useCustomerBadgeListQuery(FilterInitial);
  const { data: customerTierOptions = { data: [] } } =
    useCustomerTierListQuery(FilterInitial);
  const { data: customerBrandOptions = { data: [] } } =
    useCustomerBrandListQuery(FilterInitial);
  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">segmentation eligibility</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing="1vw" px="2vw" py="0.5vw">
          <Select
            multiple
            label="Customer Tier"
            placeholder="Option"
            options={customerTierOptions.data}
            optionLabel="name"
            value={keywordCreateState.eligibility.segmentation_customer_tier}
            handleChange={(value: []) => {
              keywordCreate.eligibility.segmentation_customer_tier = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            multiple
            label="Customer Brand"
            placeholder="Option"
            options={customerBrandOptions.data}
            optionLabel="name"
            value={keywordCreateState.eligibility.segmentation_customer_brand}
            handleChange={(value: []) => {
              keywordCreate.eligibility.segmentation_customer_brand = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            multiple
            label="Customer Badge"
            placeholder="Option"
            options={customerBadgeOptions.data}
            optionLabel="name"
            value={
              keywordCreateState.eligibility.segmentation_customer_most_redeem
            }
            handleChange={(value: []) => {
              keywordCreate.eligibility.segmentation_customer_most_redeem =
                value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Customer Prepaid Registration"
            placeholder="Option"
            options={BooleanOptions}
            value={
              keywordCreateState.eligibility
                .segmentation_customer_prepaid_registration
            }
            handleChange={(value: boolean) => {
              keywordCreate.eligibility.segmentation_customer_prepaid_registration =
                value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Telkomsel LOS Operator"
            placeholder="Option"
            options={ComparisonOptions}
            value={
              keywordCreateState.eligibility.segmentation_customer_los_operator
            }
            handleChange={(value: string) => {
              keywordCreate.eligibility.segmentation_customer_los_operator =
                value;
              if (value === "Ranged") {
                keywordCreate.eligibility.segmentation_customer_los = 0;
              } else {
                keywordCreate.eligibility.segmentation_customer_los_min = 0;
                keywordCreate.eligibility.segmentation_customer_los_max = 0;
              }
              setStateTrigger(!stateTrigger);
            }}
          />
          {keywordCreateState.eligibility.segmentation_customer_los_operator !==
            "Ranged" && (
            <OutlinedTextField
              type="number"
              label="Telkomsel LOS Value"
              variant="outlined"
              InputProps={{
                inputProps: { min: 0 },
                endAdornment: (
                  <InputAdornment position="end">Day(s)</InputAdornment>
                ),
              }}
              value={keywordCreateState.eligibility.segmentation_customer_los.toString()}
              handleChange={(value: number) => {
                keywordCreate.eligibility.segmentation_customer_los =
                  Number(value);
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          {keywordCreateState.eligibility.segmentation_customer_los_operator ===
            "Ranged" && (
            <OutlinedTextField
              type="number"
              label="Telkomsel LOS Range Min"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
              value={keywordCreateState.eligibility.segmentation_customer_los_min.toString()}
              handleChange={(value: number) => {
                keywordCreate.eligibility.segmentation_customer_los_min =
                  Number(value);
                if (
                  keywordCreateState.eligibility.segmentation_customer_los_max <
                  value
                ) {
                  keywordCreate.eligibility.segmentation_customer_los_max =
                    Number(value);
                }
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          {keywordCreateState.eligibility.segmentation_customer_los_operator ===
            "Ranged" && (
            <OutlinedTextField
              type="number"
              label="Telkomsel LOS Range Max"
              variant="outlined"
              error={
                keywordCreateState.eligibility.segmentation_customer_los_max <
                keywordCreateState.eligibility.segmentation_customer_los_min
                  ? true
                  : false
              }
              helperText={
                keywordCreateState.eligibility.segmentation_customer_los_max <
                keywordCreateState.eligibility.segmentation_customer_los_min
                  ? `must be greater than or equal to ${keywordCreateState.eligibility.segmentation_customer_los_min}`
                  : ""
              }
              onBlur={() => {
                if (
                  keywordCreateState.eligibility.segmentation_customer_los_max <
                  keywordCreateState.eligibility.segmentation_customer_los_min
                ) {
                  keywordCreate.eligibility.segmentation_customer_los_max =
                    keywordCreate.eligibility.segmentation_customer_los_min;
                  setStateTrigger(!stateTrigger);
                }
              }}
              InputProps={{
                inputProps: {
                  min: keywordCreateState.eligibility
                    .segmentation_customer_los_min,
                },
              }}
              value={keywordCreateState.eligibility.segmentation_customer_los_max.toString()}
              handleChange={(value: number) => {
                keywordCreate.eligibility.segmentation_customer_los_max =
                  Number(value);
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          <Select
            label="New Redeemer"
            placeholder="Option"
            options={BooleanOptions}
            value={keywordCreateState.eligibility.for_new_redeemer}
            handleChange={(value: boolean) => {
              keywordCreate.eligibility.for_new_redeemer = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Customer Type"
            placeholder="Option"
            options={CustomerTypeOptions}
            value={keywordCreateState.eligibility.segmentation_customer_type}
            handleChange={(value: string) => {
              keywordCreate.eligibility.segmentation_customer_type = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Customer KYC Completness"
            placeholder="Option"
            options={BooleanOptions}
            value={
              keywordCreateState.eligibility
                .segmentation_customer_kyc_completeness
            }
            handleChange={(value: boolean) => {
              keywordCreate.eligibility.segmentation_customer_kyc_completeness =
                value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Customer ARPU Operator"
            placeholder="Option"
            options={ComparisonOptions}
            value={
              keywordCreateState.eligibility.segmentation_customer_arpu_operator
            }
            handleChange={(value: string) => {
              keywordCreate.eligibility.segmentation_customer_arpu_operator =
                value;
              if (value === "Ranged") {
                keywordCreate.eligibility.segmentation_customer_arpu = 0;
              } else {
                keywordCreate.eligibility.segmentation_customer_arpu_min = 0;
                keywordCreate.eligibility.segmentation_customer_arpu_max = 0;
              }
              setStateTrigger(!stateTrigger);
            }}
          />
          {keywordCreateState.eligibility
            .segmentation_customer_arpu_operator !== "" &&
            keywordCreateState.eligibility
              .segmentation_customer_arpu_operator !== "Ranged" && (
              <OutlinedTextField
                type="number"
                label="Customer ARPU"
                variant="outlined"
                InputProps={{
                  inputProps: { min: 0 },
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                }}
                value={keywordCreateState.eligibility.segmentation_customer_arpu.toString()}
                handleChange={(value: number) => {
                  keywordCreate.eligibility.segmentation_customer_arpu =
                    Number(value);
                  setStateTrigger(!stateTrigger);
                }}
              />
            )}
          {keywordCreateState.eligibility
            .segmentation_customer_arpu_operator === "Ranged" && (
            <OutlinedTextField
              type="number"
              label="Customer ARPU MIN"
              variant="outlined"
              InputProps={{
                inputProps: { min: 0 },
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              value={keywordCreateState.eligibility.segmentation_customer_arpu_min.toString()}
              handleChange={(value: number) => {
                keywordCreate.eligibility.segmentation_customer_arpu_min =
                  Number(value);
                if (
                  keywordCreateState.eligibility
                    .segmentation_customer_arpu_max < value
                ) {
                  keywordCreate.eligibility.segmentation_customer_arpu_max =
                    Number(value);
                }
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          {keywordCreateState.eligibility
            .segmentation_customer_arpu_operator === "Ranged" && (
            <OutlinedTextField
              type="number"
              label="Customer ARPU MAX"
              variant="outlined"
              error={
                keywordCreateState.eligibility.segmentation_customer_arpu_max <
                keywordCreateState.eligibility.segmentation_customer_arpu_min
                  ? true
                  : false
              }
              helperText={
                keywordCreateState.eligibility.segmentation_customer_arpu_max <
                keywordCreateState.eligibility.segmentation_customer_arpu_min
                  ? `must be greater than or equal to ${keywordCreateState.eligibility.segmentation_customer_arpu_min}`
                  : ""
              }
              onBlur={() => {
                if (
                  keywordCreateState.eligibility
                    .segmentation_customer_arpu_max <
                  keywordCreateState.eligibility.segmentation_customer_arpu_min
                ) {
                  keywordCreate.eligibility.segmentation_customer_arpu_max =
                    keywordCreate.eligibility.segmentation_customer_arpu_min;
                  setStateTrigger(!stateTrigger);
                }
              }}
              InputProps={{
                inputProps: {
                  min: keywordCreateState.eligibility
                    .segmentation_customer_arpu_min,
                },
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              value={keywordCreateState.eligibility.segmentation_customer_arpu_max.toString()}
              handleChange={(value: number) => {
                keywordCreate.eligibility.segmentation_customer_arpu_max =
                  Number(value);
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          <Select
            label="Telkomsel Employee Numbers"
            placeholder="Option"
            options={BooleanOptions}
            value={keywordCreateState.eligibility.segmentation_employee_numbers}
            handleChange={(value: boolean) => {
              keywordCreate.eligibility.segmentation_employee_numbers = value;
              setStateTrigger(!stateTrigger);
            }}
          />

          <Select
            label="Customer POIN Balance Operator"
            placeholder="Option"
            options={ComparisonOptions}
            value={
              keywordCreateState.eligibility
                .segmentation_customer_poin_balance_operator
            }
            handleChange={(value: string) => {
              keywordCreate.eligibility.segmentation_customer_poin_balance_operator =
                value;
              if (value === "Ranged") {
                keywordCreate.eligibility.segmentation_customer_poin_balance = 0;
              } else {
                keywordCreate.eligibility.segmentation_customer_poin_balance_min = 0;
                keywordCreate.eligibility.segmentation_customer_poin_balance_max = 0;
              }
              setStateTrigger(!stateTrigger);
            }}
          />
          {keywordCreateState.eligibility
            .segmentation_customer_poin_balance_operator !== "" &&
            keywordCreateState.eligibility
              .segmentation_customer_poin_balance_operator !== "Ranged" && (
              <OutlinedTextField
                type="number"
                label="Customer POIN Balance"
                variant="outlined"
                InputProps={{
                  inputProps: { min: 0 },
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                }}
                value={keywordCreateState.eligibility.segmentation_customer_poin_balance.toString()}
                handleChange={(value: number) => {
                  keywordCreate.eligibility.segmentation_customer_poin_balance =
                    Number(value);
                  setStateTrigger(!stateTrigger);
                }}
              />
            )}
          {keywordCreateState.eligibility
            .segmentation_customer_poin_balance_operator === "Ranged" && (
            <OutlinedTextField
              type="number"
              label="Customer POIN Balance MIN"
              variant="outlined"
              InputProps={{
                inputProps: { min: 0 },
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              value={keywordCreateState.eligibility.segmentation_customer_poin_balance_min.toString()}
              handleChange={(value: number) => {
                keywordCreate.eligibility.segmentation_customer_poin_balance_min =
                  Number(value);
                if (
                  keywordCreateState.eligibility
                    .segmentation_customer_poin_balance_max < value
                ) {
                  keywordCreate.eligibility.segmentation_customer_poin_balance_max =
                    Number(value);
                }
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          {keywordCreateState.eligibility
            .segmentation_customer_poin_balance_operator === "Ranged" && (
            <OutlinedTextField
              type="number"
              label="Customer POIN Balance MAX"
              variant="outlined"
              error={
                keywordCreateState.eligibility
                  .segmentation_customer_poin_balance_max <
                keywordCreateState.eligibility
                  .segmentation_customer_poin_balance_min
                  ? true
                  : false
              }
              helperText={
                keywordCreateState.eligibility
                  .segmentation_customer_poin_balance_max <
                keywordCreateState.eligibility
                  .segmentation_customer_poin_balance_min
                  ? `must be greater than or equal to ${keywordCreateState.eligibility.segmentation_customer_poin_balance_min}`
                  : ""
              }
              onBlur={() => {
                if (
                  keywordCreateState.eligibility
                    .segmentation_customer_poin_balance_max <
                  keywordCreateState.eligibility
                    .segmentation_customer_poin_balance_min
                ) {
                  keywordCreate.eligibility.segmentation_customer_poin_balance_max =
                    keywordCreate.eligibility.segmentation_customer_poin_balance_min;
                  setStateTrigger(!stateTrigger);
                }
              }}
              InputProps={{
                inputProps: {
                  min: keywordCreateState.eligibility
                    .segmentation_customer_poin_balance_min,
                },
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              value={keywordCreateState.eligibility.segmentation_customer_poin_balance_max.toString()}
              handleChange={(value: number) => {
                keywordCreate.eligibility.segmentation_customer_poin_balance_max =
                  Number(value);
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Segmentation;
