import * as React from "react";

import { Box, Chip, Stack } from "@mui/material";
import { Select } from "../../../atoms";
import { useGetBonusTypeQuery } from "../../../../redux/features/lov/lov-api-slice";
import { CreateKeywordGeneral, KeywordBonusHelper } from "../initial";
import { ICreateKeyword, IKeywordBonusHelper } from "../interfaces";
import CancelIcon from "@mui/icons-material/Cancel";
import _without from "lodash/without";
import _find from "lodash/find";

// Sub Component of Bonus
import Auction from "./Auction";
import LuckyDraw from "./LuckyDraw";
import DirectRedeem from "./DirectRedeem";
import LoyaltyPoin from "./LoyaltyPoin";
import Voucher from "./Voucher";
import LinkAjaMain from "./LinkAjaMain";
import LinkAjaBonus from "./LinkAjaBonus";
import Ngrs from "./Ngrs";
import TelcoProductPrepaid from "./TelcoProductPrepaid";
import TelcoProductPostpaid from "./TelcoProductPostpaid";
import Donation from "./Donation";
import MobileBanking from "./MobileBanking";

// Sub Component of Bonus without "configuration"
import Void from "./Void";
import Voting from "./Voting";
import Other from "./Other";
import { BONUS_TELKOMSEL_LIST } from "service/helpers/bonus-constant";
import { useAccountAuthenticateQuery } from "redux/features/account/account-api-slice";
import { useAppConfigQuery } from "redux/features/app-config/app-config-api-slice";

interface IBonusProps {}

const Bonus: React.FunctionComponent<IBonusProps> = (props) => {
  const { data: bonusTypeOptions = { data: [] } } = useGetBonusTypeQuery();
  const { data: accountAuth } = useAccountAuthenticateQuery();
  const { data: appConfig } = useAppConfigQuery();
  const defaultRoleManagerHQ =
    appConfig !== undefined
      ? appConfig.find((item) => item["param_key"] === "DEFAULT_LOCATION_HQ")[
          "param_value"
        ]
      : undefined;

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
    // Filter Condition for Bonus / Notification
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
        _find(bonusTypeOptions.data, ({ template }) => template === type)?._id
      );
    });

    keywordCreate.notification = keywordCreate.notification.filter(
      (item, i) =>
        list.includes(keywordCreate.notification[i].bonus_type_id) ||
        item.bonus_type_id === ""
    );

    setKeywordCreateState(keywordCreate);
  }, [keywordBonusHelperState.bonus_type]);

  // React.useEffect(() => {
  //   console.log(keywordCreate);
  // }, [keywordCreate, stateTrigger]);

  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing="2vw" width="100%" px="4vw">
        <Select
          multiple
          direction="column"
          label="Bonus Type"
          placeholder="Option"
          options={
            accountAuth &&
            accountAuth.account_location.location_detail.type !==
              defaultRoleManagerHQ
              ? bonusTypeOptions.data.filter(
                  (bonusType) =>
                    bonusType.template !== "ngrs" &&
                    bonusType.template !== "telco_prepaid" &&
                    bonusType.template !== "telco_postpaid" &&
                    bonusType.template !== "linkaja_main" &&
                    bonusType.template !== "linkaja_bonus"
                )
              : bonusTypeOptions.data
          }
          optionValue="template"
          renderValue={(selected: any) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: any) => {
                if (value === "") {
                  return null;
                } else {
                  return (
                    <Chip
                      key={value}
                      label={
                        bonusTypeOptions.data.find(
                          (e) => e["template"] === value
                        )?.template
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
                }
              })}
            </Box>
          )}
          value={keywordBonusHelperState.bonus_type}
          handleChange={(value: Array<string>) => {
            // Check if telkomsel bonus type is already selected
            const firstSelectedTelkomselBonus =
              keywordBonusHelper.bonus_type.find((bonusTelkomsel) =>
                BONUS_TELKOMSEL_LIST?.includes(bonusTelkomsel)
              );

            // Check for last selected
            const isLastSelectedTelkomselBonus =
              BONUS_TELKOMSEL_LIST?.includes(value?.[value?.length - 1]) ||
              false;

            // Check if user already select telkomsel bonus and want to select another telkomsel bonus
            if (firstSelectedTelkomselBonus && isLastSelectedTelkomselBonus) {
              return;
            }

            keywordBonusHelper.bonus_type = value;

            setStateTrigger(!stateTrigger);
          }}
        />
        <>
          {keywordBonusHelperState.bonus_type.length > 0 &&
            keywordBonusHelperState.bonus_type.map((bonusType, idx) => {
              switch (bonusType) {
                case "lucky_draw":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <LuckyDraw
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ template }) => template === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "auction":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <Auction
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ template }) => template === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "direct_redeem":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <DirectRedeem
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ template }) => template === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "loyalty_poin":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <LoyaltyPoin
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ template }) => template === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "telco_postpaid":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <TelcoProductPostpaid
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ template }) => template === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "telco_prepaid":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <TelcoProductPrepaid
                        bonusType={bonusType}
                        bonusTypeId={
                          _find(
                            bonusTypeOptions.data,
                            ({ template }) => template === bonusType
                          )?._id
                        }
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "linkaja_main":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <LinkAjaMain
                        bonusType={bonusType}
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "linkaja_bonus":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <LinkAjaBonus
                        bonusType={bonusType}
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "ngrs":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <Ngrs
                        bonusType={bonusType}
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "discount_voucher":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <Voucher
                        bonusType={bonusType}
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "donation":
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
                case "mbp":
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
                case "void":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <Void
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
                case "voting":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <Voting
                        bonusType={bonusType}
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "other":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <Other
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
