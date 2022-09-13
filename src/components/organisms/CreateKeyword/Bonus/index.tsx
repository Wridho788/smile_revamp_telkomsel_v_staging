import * as React from "react";
import { Box, Chip, Stack } from "@mui/material";
import { Select } from "../../../atoms";
import { useGetBonusTypeQuery } from "../../../../redux/features/lov/lov-api-slice";
import {
  KeywordBonusHelper,
  KeywordBonusLuckyDraw,
  KeywordNotificationLuckyDraw,
} from "../initial";
import { CreateKeywordGeneral } from "../initial";
import { ICreateKeyword, IKeywordBonusHelper } from "../interfaces";
import LuckyDraw from "./LuckyDraw";
import CancelIcon from "@mui/icons-material/Cancel";
import _without from "lodash/without";
import LinkAja from "./LinkAja";

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
    setKeywordBonusHelperState(keywordBonusHelper);
  }, [keywordBonusHelper, stateTrigger]);

  React.useEffect(() => {
    if (
      keywordBonusHelperState.bonus_type.find(
        (e) => e === "Lucky Draw Coupon"
      ) === undefined
    ) {
      keywordCreate.bonus = _without(
        [...keywordCreateState.bonus],
        KeywordBonusLuckyDraw
      );
      keywordCreate.notification = _without(
        [...keywordCreateState.notification],
        ...KeywordNotificationLuckyDraw
      );
    } else if (
      keywordCreateState.bonus.find((e) => e === KeywordBonusLuckyDraw) ===
        undefined &&
      keywordCreateState.notification.find(
        (e) => e === { ...KeywordNotificationLuckyDraw }
      ) === undefined
    ) {
      keywordCreate.bonus.push(KeywordBonusLuckyDraw);
      keywordCreate.notification.push(...KeywordNotificationLuckyDraw);
    }
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
            // eslint-disable-next-line array-callback-return
            keywordBonusHelperState.bonus_type.map((bonusType, idx) => {
              switch (bonusType) {
                case "Lucky Draw Coupon":
                  return (
                    <Box key={`bonusType__${idx}`}>
                      <LuckyDraw
                        bonusType={bonusType}
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
                      <LuckyDraw
                        bonusType={bonusType}
                        keywordCreateState={keywordCreateState}
                        keywordCreate={keywordCreate}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                      />
                    </Box>
                  );
                case "LinkAja Main & Bonus Balance":
                  return (
                      <Box key={`bonusType__${idx}`}>
                        <LinkAja
                            bonusType={bonusType}
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
