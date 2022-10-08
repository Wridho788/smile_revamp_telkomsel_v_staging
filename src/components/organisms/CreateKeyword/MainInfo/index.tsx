import * as React from "react";
import { Box, Stack } from "@mui/material";

import Program from "./Program";
import General from "./General";
import Location from "./Location";
import Merchant from "./Merchant";
import Segmentation from "./Segmentation";
import Notification from "./Notification";
import { ICreateKeyword } from "../interfaces";

interface IMainInfoProps {
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainInfo: React.FunctionComponent<IMainInfoProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
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

          {keywordCreate?.eligibility?.program_id !== "" &&
            keywordCreate?.eligibility?.program_experience?.length > 0 && (
              <>
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
              </>
            )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default MainInfo;
