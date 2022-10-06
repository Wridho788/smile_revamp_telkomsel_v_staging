import React, { Dispatch, SetStateAction } from "react";
import { Box, Chip, CircularProgress, Stack } from "@mui/material";
import { BodyCopy, Select } from "../../../../atoms";
import { useGetProgramExperienceQuery } from "../../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { ICreateKeyword } from "../../interfaces";
import { useProgramListQuery } from "../../../../../redux/features/program/program-api-slice";
import Information from "./Information";
import CancelIcon from "@mui/icons-material/Cancel";
import _without from "lodash/without";
import moment from "moment";

interface IProgramProps {
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Program: React.FunctionComponent<IProgramProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const programExperienceRef = React.useRef();

  const {
    data: programListOptions = { data: [] },
    isFetching: isProgramListFetching,
  } = useProgramListQuery(FilterInitial);
  const {
    data: programExperienceOptions = { data: [] },
    isFetching: isProgramExperienceFetching,
  } = useGetProgramExperienceQuery();

  return (
    <Box sx={{ px: "2vw" }}>
      <Stack spacing="2vw" px="2vw" py="0.5vw">
        {isProgramListFetching || isProgramExperienceFetching ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Select
              label="Choose Program"
              placeholder="Option"
              options={programListOptions.data.filter(
                (e) =>
                  e.approval_log?.length > 0 &&
                  e.approval_log[e.approval_log.length - 1].status?.length >
                    0 &&
                  e.approval_log[e.approval_log.length - 1].status[0]
                    .set_value === "Approved by Manager HQ" &&
                  moment(e?.end_period).isAfter(moment())
              )}
              // options={programListOptions.data}
              optionLabel="name"
              value={keywordCreateState.eligibility.program_id}
              handleChange={(value: string) => {
                keywordCreate.eligibility.program_id = value;
                setStateTrigger(!stateTrigger);
              }}
            />
            {keywordCreateState.eligibility.program_id !== "" && (
              <Stack spacing="1vw">
                <BodyCopy color="primary" align="center">
                  {`This Keyword must be follow program [${
                    programListOptions.data.find(
                      (e) =>
                        e["_id"] === keywordCreateState.eligibility.program_id
                    )?.name
                  }] Information`}
                </BodyCopy>
                <Information
                  program={programListOptions.data.find(
                    (e) =>
                      e["_id"] === keywordCreateState.eligibility.program_id
                  )}
                />
              </Stack>
            )}

            <Select
              label="Program Experience"
              placeholder="Option"
              options={programExperienceOptions.data}
              value={keywordCreateState.eligibility.program_experience}
              handleChange={(value: string) => {
                keywordCreate.eligibility.program_experience = [value];
                setStateTrigger(!stateTrigger);
              }}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Program;
