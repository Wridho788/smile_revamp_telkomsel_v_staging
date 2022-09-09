import * as React from "react";
import { Box, Button, Stack } from "@mui/material";
import { Select } from "../../../atoms";
import { useGetBonusTypeQuery } from "../../../../redux/features/lov/lov-api-slice";
import { KeywordBonus } from "../initial";
import { CreateKeywordGeneral } from "../initial";
import { ICreateKeyword, IKeywordBonus } from "../interfaces";

interface IBonusProps {}

const Bonus: React.FunctionComponent<IBonusProps> = (props) => {
  const { data: bonusTypeOptions = { data: [] } } = useGetBonusTypeQuery();

  const keywordCreate = CreateKeywordGeneral;
  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);

  let keywordBonus = KeywordBonus;
  const [keywordBonusState, setKeywordBonusState] =
    React.useState<IKeywordBonus>(keywordBonus);

  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  React.useEffect(() => {
    setKeywordBonusState(keywordBonus);
    console.log(keywordBonus);
  }, [keywordBonus, stateTrigger]);

  React.useEffect(() => {
    console.log(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing="1vw" width="100%" px="4vw">
        <Select
          multiple
          placeholder="Option"
          options={bonusTypeOptions.data}
          value={keywordBonusState.bonus_type}
          handleChange={(value: []) => {
            keywordBonus.bonus_type = value;
            setStateTrigger(!stateTrigger);
          }}
        />
        <>
          {keywordBonusState.bonus_type.length > 0 &&
            keywordBonusState.bonus_type.map((_, idx) => {
              const type = bonusTypeOptions.data.find(
                (e) => e["_id"] === _
              )?.set_value;
              if (type === "Lucky Draw Coupon") {
                return <Button key={`kbt__${idx}`}>Lucky D. is Choosen</Button>;
              } else if (type === "Auction") {
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
