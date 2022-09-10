import * as React from "react";
import { Box, Button, Chip, Stack } from "@mui/material";
import { Select } from "../../../atoms";
import { useGetBonusTypeQuery } from "../../../../redux/features/lov/lov-api-slice";
import {
  KeywordBonusHelper,
  KeywordNotificationLuckyDrawHelper,
} from "../initial";
import { CreateKeywordGeneral } from "../initial";
import {
  ICreateKeyword,
  IKeywordBonusHelper,
  IKeywordNotificationLuckyDrawHelper,
} from "../interfaces";
import LuckyDraw from "./LuckyDraw";
import CancelIcon from "@mui/icons-material/Cancel";
import _without from "lodash/without";

interface IBonusProps {}

const Bonus: React.FunctionComponent<IBonusProps> = (props) => {
  const { data: bonusTypeOptions = { data: [] } } = useGetBonusTypeQuery();

  const keywordCreate = CreateKeywordGeneral;
  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);

  let keywordBonusHelper = KeywordBonusHelper;
  const [keywordBonusHelperState, setKeywordBonusHelperState] =
    React.useState<IKeywordBonusHelper>(keywordBonusHelper);

  const keywordNotificationLuckyDrawHelper = KeywordNotificationLuckyDrawHelper;
  const [
    keywordNotificationLuckyDrawHelperState,
    setKeywordNotificationLuckyDrawHelperState,
  ] = React.useState<IKeywordNotificationLuckyDrawHelper[]>(
    keywordNotificationLuckyDrawHelper
  );

  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  React.useEffect(() => {
    setKeywordBonusHelperState(keywordBonusHelper);
    console.log(keywordBonusHelper);
  }, [keywordBonusHelper, stateTrigger]);

  React.useEffect(() => {
    setKeywordNotificationLuckyDrawHelperState(
      keywordNotificationLuckyDrawHelper
    );
  }, [keywordNotificationLuckyDrawHelper, stateTrigger]);

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
            keywordBonusHelperState.bonus_type.map((_, idx) => {
              const bonusType = bonusTypeOptions.data.find(
                (e) => e["set_value"] === _
              )?.set_value;
              if (bonusType === "Lucky Draw Coupon") {
                return (
                  <Box key={`kbt__${idx}`}>
                    <LuckyDraw
                      bonusType={bonusType}
                      keywordCreateState={keywordCreateState}
                      keywordCreate={keywordCreate}
                      stateTrigger={stateTrigger}
                      setStateTrigger={setStateTrigger}
                    />
                  </Box>
                );
              } else if (bonusType === "Auction") {
                return <Button key={`kbt__${idx}`}>Auction is Choosen</Button>;
              } else {
                <Box key={`kbt__${idx}`}></Box>;
              }
            })}
        </>
      </Stack>
    </Box>
  );
};

export default Bonus;
