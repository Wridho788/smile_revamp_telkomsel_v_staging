import * as React from "react";

import { Box, Chip, Stack } from "@mui/material";
import { Select } from "../../../atoms";
import { useGetBonusTypeQuery } from "../../../../redux/features/lov/lov-api-slice";
import { CreateKeywordGeneral, KeywordBonusHelper } from "../initial";
import { ICreateKeyword, IKeywordBonusHelper } from "../interfaces";

import Donation from "./Donation";
import MobileBanking from "./MobileBanking";

import CancelIcon from "@mui/icons-material/Cancel";

import _without from "lodash/without";
import _find from "lodash/find";

// Sub Component of Bonus
import LuckyDraw from "./LuckyDraw";
import Auction from "./Auction";
import DirectRedeem from "./DirectRedeem";
import LoyaltyPoin from "./LoyaltyPoin";
import TelcoProductPostpaid from "./TelcoProductPostpaid";
import TelcoProductPrepaid from "./TelcoProductPrepaid";

interface IBonusProps {}

const Bonus: React.FunctionComponent<IBonusProps> = (props) => {
  const { data: bonusTypeOptions = { data: [] } } = useGetBonusTypeQuery();

  const keywordCreate = CreateKeywordGeneral;
  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);

  let keywordBonusHelper = KeywordBonusHelper;
  const [keywordBonusHelperState, setKeywordBonusHelperState] =
    React.useState<IKeywordBonusHelper>(keywordBonusHelper);

  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  React.useEffect(() => {
    // Filter Condition for Bonus / Notification : (Auction, Lucky Draw)
    keywordCreate.bonus = keywordCreate.bonus.filter((item) => {
      if (keywordBonusHelper.bonus_type.includes(item.bonus_type)) {
        return item;
      }
    });

    setKeywordBonusHelperState(keywordBonusHelper);
  }, [keywordBonusHelper, stateTrigger]);

  React.useEffect(() => {
    let list: any = [];

    keywordBonusHelper.bonus_type.map((type: string) => {
      list.push(
        _find(bonusTypeOptions.data, ({ set_value }) => set_value === type)?._id
      );
    });

    keywordCreate.notification = keywordCreate.notification.filter(
      (item, i) =>
        list.includes(keywordCreate.notification[i].bonus_type_id) ||
        item.bonus_type_id === ""
    );

    setKeywordCreateState(keywordCreate);
  }, [keywordBonusHelperState.bonus_type]);

  React.useEffect(() => {
    console.log(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing="2vw" width="100%" px="4vw">
        <Select
          multiple
          direction="column"
          label="Bonus Type"
          placeholder="Option"
          options={bonusTypeOptions.data}
          optionValue="set_value"
          renderValue={(selected: any) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: any) => {
                return (
                  <Chip
                    key={value}
                    label={
                      bonusTypeOptions.data.find(
                        (e) => e["set_value"] === value
                      )?.set_value
                    }
                    clickable
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event: any) => event.stopPropagation()}
                      />
                    }
                    onDelete={(e) => {
                      e.preventDefault();
                      keywordBonusHelper.bonus_type = _without(
                        [...keywordBonusHelper.bonus_type],
                        value
                      );
                      setStateTrigger(!stateTrigger);
                    }}
                    onClick={() => console.log("clicked chip")}
                  />
                );
              })}
            </Box>
          )}
          value={keywordBonusHelperState.bonus_type}
          handleChange={(value: Array<string>) => {
            keywordBonusHelper.bonus_type = value;
            setStateTrigger(!stateTrigger);
          }}
        />
        <>
          {keywordBonusHelperState.bonus_type.length > 0 &&
            keywordBonusHelperState.bonus_type.map((bonusType, idx) => {
              switch (bonusType) {
                case "Lucky Draw Coupon":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <LuckyDraw
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ set_value }) => set_value === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "Auction":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <Auction
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ set_value }) => set_value === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "Direct Redeem":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <DirectRedeem
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ set_value }) => set_value === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "Loyalty Poin":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <LoyaltyPoin
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ set_value }) => set_value === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "Donation":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <Donation
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ set_value }) => set_value === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "Other":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <MobileBanking
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ set_value }) => set_value === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "Telco Product Postpaid":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <TelcoProductPostpaid
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ set_value }) => set_value === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "Telco Product Prepaid":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <TelcoProductPrepaid
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ set_value }) => set_value === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
              }
            })}
        </>
      </Stack>
    </Box>
  );
};

export default Bonus;
