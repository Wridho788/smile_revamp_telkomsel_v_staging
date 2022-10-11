import * as React from "react";
import { Alert, Box, Stack } from "@mui/material";
import Program from "./Program";
import General from "./General";
import Location from "./Location";
import Merchant from "./Merchant";
import Segmentation from "./Segmentation";
import Notification from "./Notification";
import { ICreateKeyword } from "../interfaces";
import SwitchCustom from "atomic/components/atoms/Switch";
import { useDraftKeywordMutation } from "redux/features/keyword/keyword-api-slice";
import { useParams } from "react-router-dom";

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
  const { _id } = useParams();
  const [draftKeyword] = useDraftKeywordMutation();

  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing="1vw" width="100%">
        <Stack spacing="1vw" px="4vw">
          {/*  Draft Switcher */}
          {["Rejected by Manager HQ", "Rejected by Manager Non HQ"].includes(
            keywordCreateState?.approval_log?.[
              keywordCreateState?.approval_log?.length - 1
            ]?.status[0]?.set_value
          ) ? (
            <>
              <Box>
                <Alert
                  severity="info"
                  color={keywordCreate?.is_draft ? "success" : "warning"}
                >
                  {keywordCreate?.is_draft
                    ? "Keyword will be drafted"
                    : "Keyword will not be drafted"}
                </Alert>
              </Box>
              <Box>
                <SwitchCustom
                  color={"success"}
                  checked={keywordCreate?.is_draft || false}
                  handleChange={() => {
                    if (_id) {
                      draftKeyword({ _id, is_draft: !keywordCreate.is_draft });
                    }

                    keywordCreate.is_draft = !keywordCreate.is_draft;
                    setStateTrigger(!stateTrigger);
                  }}
                  label={"Draft Keyword"}
                />
              </Box>
            </>
          ) : (
            <></>
          )}

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
