import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  BodyCopy,
  H2,
  OutlinedTextField,
  Select,
  SmallCopy,
} from "../../../../atoms";
import { useGetProgramExperienceQuery } from "../../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { ICreateKeyword } from "../../interfaces";
import {
  useProgramListQuery,
  useDetailProgramQuery,
} from "../../../../../redux/features/program/program-api-slice";
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
  const [programListLimit, setProgramListLimit] = useState<number>(100);
  const {
    data: programListOptions = { data: [] },
    isFetching: isFetchingProgram,
    isLoading: isProgramListLoading,
    refetch: refetchProgramList,
  } = useProgramListQuery({ ...FilterInitial, limit: programListLimit });
  const {
    data: programExperienceOptions = { data: [] },
    isFetching: isFetchingProgramExperience,
  } = useGetProgramExperienceQuery();
  const { data: programDetail, isLoading: isProgramDetailLoading } =
    useDetailProgramQuery(keywordCreateState.eligibility.program_id);

  useEffect(() => {
    if (programListLimit !== 100) {
      refetchProgramList();
    }
  }, [programListLimit, refetchProgramList]);

  return (
    <Box sx={{ px: "2vw" }}>
      {!isProgramListLoading &&
      !isFetchingProgramExperience &&
      !isProgramDetailLoading ? (
        <Stack spacing="2vw" px="2vw" py="0.5vw">
          <Autocomplete
            disablePortal
            getOptionLabel={(option) => option.name}
            options={[
              programDetail,
              ...programListOptions.data.filter(
                (e) =>
                  e.approval_log?.length > 0 &&
                  e.approval_log[e.approval_log.length - 1].status?.length >
                    0 &&
                  e.approval_log[e.approval_log.length - 1].status[0]
                    .set_value === "Approved by Manager HQ" &&
                  moment(e?.end_period).isAfter(moment()) &&
                  e?._id !== keywordCreateState.eligibility.program_id
              ),
            ]}
            value={programDetail}
            disableClearable
            isOptionEqualToValue={(option, value) => {
              return option?._id === value?._id;
            }}
            onChange={(_, value) => {
              if (value) {
                keywordCreate.eligibility.program_id = value?._id;
                setStateTrigger(!stateTrigger);
              }
            }}
            ListboxProps={{
              onScroll: (event: React.SyntheticEvent) => {
                const listboxNode = event.currentTarget;

                if (
                  Math.round(
                    listboxNode.scrollTop + listboxNode.clientHeight
                  ) === Math.round(listboxNode.scrollHeight)
                ) {
                  setProgramListLimit(
                    (previousProgramListLimit) => previousProgramListLimit + 10
                  );
                }
              },
            }}
            renderInput={(params) => (
              <OutlinedTextField
                {...params}
                isRequired
                label="Choose Program"
                placeholder="Choose Program"
                variant="outlined"
              />
            )}
          />

          {/* <Select
						label="Choose Program"
						placeholder="Option"
						options={[
							programDetail,
							...programListOptions.data.filter(
								e =>
									e.approval_log?.length > 0 &&
									e.approval_log[e.approval_log.length - 1].status?.length >
										0 &&
									e.approval_log[e.approval_log.length - 1].status[0]
										.set_value === "Approved by Manager HQ" &&
									moment(e?.end_period).isAfter(moment()) &&
									e?._id !== keywordCreateState.eligibility.program_id
							)
						]}
						optionLabel="name"
						value={keywordCreateState.eligibility.program_id}
						handleChange={(value: string) => {
							keywordCreate.eligibility.program_id = value;
							setStateTrigger(!stateTrigger);
						}}
					/> */}

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
                          [
                            ...keywordCreateState.eligibility
                              .program_experience,
                          ],
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
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "24px 0",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            direction="column"
            spacing="2vh"
          >
            <SmallCopy>Preparing Program & Program Experience ...</SmallCopy>
            <CircularProgress />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Program;
