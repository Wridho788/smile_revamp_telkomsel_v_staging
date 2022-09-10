import * as React from "react";
import { Box, Stack } from "@mui/material";
import {
  CreateKeywordGeneral,
  KeywordEligibilityLocationHelper,
  KeywordNotificationEligibilityHelper,
} from "../initial";
import {
  ICreateKeyword,
  IKeywordEligibilityLocationHelper,
  IKeywordNotificationEligibilityHelper,
} from "../interfaces";
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

  const keywordEligibilityLocationHelper = KeywordEligibilityLocationHelper;
  const [
    keywordEligibilityLocationHelperState,
    setKeywordEligibilityLocationHelperState,
  ] = React.useState<IKeywordEligibilityLocationHelper>(
    keywordEligibilityLocationHelper
  );

  const keywordNotificationEligibilityHelper =
    KeywordNotificationEligibilityHelper;
  const [
    keywordNotificationEligibilityHelperState,
    setKeywordNotificationEligibilityHelperState,
  ] = React.useState<IKeywordNotificationEligibilityHelper[]>(
    keywordNotificationEligibilityHelper
  );

  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate]);

  React.useEffect(() => {
    setKeywordEligibilityLocationHelperState(keywordEligibilityLocationHelper);
  }, [keywordEligibilityLocationHelper, stateTrigger]);

  React.useEffect(() => {
    setKeywordNotificationEligibilityHelperState(
      keywordNotificationEligibilityHelper
    );
  }, [keywordNotificationEligibilityHelper, stateTrigger]);

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
            keywordEligibilityLocationHelperState={
              keywordEligibilityLocationHelperState
            }
            keywordEligibilityLocationHelper={keywordEligibilityLocationHelper}
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
            keywordNotificationEligibilityHelperState={
              keywordNotificationEligibilityHelperState
            }
            keywordNotificationEligibilityHelper={
              keywordNotificationEligibilityHelper
            }
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default MainInfo;
