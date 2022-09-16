import React, { Dispatch, SetStateAction } from "react";
import { Box, Chip, Stack } from "@mui/material";
import { BodyCopy, Select } from "../../../../atoms";
import { useGetProgramExperienceQuery } from "../../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { IUpdateKeyword } from "../../interfaces";
import { useProgramListQuery } from "../../../../../redux/features/program/program-api-slice";
import Information from "./Information";
import CancelIcon from "@mui/icons-material/Cancel";
import _without from "lodash/without";

interface IProgramProps {
  keywordCreateState: IUpdateKeyword;
  keywordCreate: IUpdateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Program: React.FunctionComponent<IProgramProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: programListOptions = { data: [] } } =
    useProgramListQuery(FilterInitial);
  const { data: programExperienceOptions = { data: [] } } =
    useGetProgramExperienceQuery();
  return (
    <Box sx={{ px: "2vw" }}>
      <Stack spacing="2vw" px="2vw" py="0.5vw">
        <Select
          label="Choose Program"
          placeholder="Option"
          options={programListOptions.data.filter(
            (e) => e.program_approval !== ""
          )}
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
                  (e) => e["_id"] === keywordCreateState.eligibility.program_id
                )?.name
              }] Information`}
            </BodyCopy>
            <Information
              program={programListOptions.data.find(
                (e) => e["_id"] === keywordCreateState.eligibility.program_id
              )}
            />
          </Stack>
        )}
        <Select
          multiple
          label="Program Experience"
          placeholder="Option"
          options={programExperienceOptions.data}
          renderValue={(selected: any) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: any) => {
                return (
                  <Chip
                    key={value}
                    label={
                      programExperienceOptions.data.find(
                        (e) => e["_id"] === value
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
                      keywordCreate.eligibility.program_experience = _without(
                        [...keywordCreateState.eligibility.program_experience],
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
          value={keywordCreateState.eligibility.program_experience}
          handleChange={(value: Array<string>) => {
            if (value.length > 0) {
              keywordCreate.eligibility.program_experience = [
                value[value.length - 1],
              ];
            } else {
              keywordCreate.eligibility.program_experience = value;
            }
            setStateTrigger(!stateTrigger);
          }}
        />
      </Stack>
    </Box>
  );
};

export default Program;
