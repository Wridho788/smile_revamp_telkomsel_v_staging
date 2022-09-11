import * as React from "react";
import { Box, Stack } from "@mui/material";
import { CreateKeywordGeneral } from "../initial";
import { ICreateKeyword } from "../interfaces";
import Program from "./Program";
import General from "./General";
import Location from "./Location";
import Merchant from "./Merchant";
import Segmentation from "./Segmentation";
import Notification from "./Notification";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const keywordCreate = CreateKeywordGeneral;
  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);

  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate]);

  React.useEffect(() => {
    console.log(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing="1vw" width="100%">
        <Stack spacing="1vw" px="4vw">
          <Program
            keywordCreateState={keywordCreateState}
            keywordCreate={keywordCreate}
            stateTrigger={stateTrigger}
            setStateTrigger={setStateTrigger}
          />
          <General
            keywordCreateState={keywordCreateState}
            keywordCreate={keywordCreate}
            stateTrigger={stateTrigger}
            setStateTrigger={setStateTrigger}
          />
          <Location
            keywordCreateState={keywordCreateState}
            keywordCreate={keywordCreate}
            stateTrigger={stateTrigger}
            setStateTrigger={setStateTrigger}
          />
          <Merchant
            keywordCreate={keywordCreate}
            stateTrigger={stateTrigger}
            setStateTrigger={setStateTrigger}
          />
          <Segmentation
            keywordCreateState={keywordCreateState}
            keywordCreate={keywordCreate}
            stateTrigger={stateTrigger}
            setStateTrigger={setStateTrigger}
          />
          <Notification
            keywordCreateState={keywordCreateState}
            keywordCreate={keywordCreate}
            stateTrigger={stateTrigger}
            setStateTrigger={setStateTrigger}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default MainInfo;
