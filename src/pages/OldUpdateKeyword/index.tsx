/**
 * TODO: Update Keyword
 * **/

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, CircularProgress } from "@mui/material";
import { DrawerNav, H2, Stepper, StepperPaper } from "../../components";

import { MainInfo, Bonus } from "../../components/organisms/OldUpdateKeyword";

import { useKeywordGeneralDetailQuery } from "../../redux/features/keyword/keyword-api-slice";
import { UpdateKeywordGeneral } from "../../components/organisms/OldUpdateKeyword/initial";

import { cloneDeep } from "lodash";

const UpdateKeyword = () => {
  let UpdateKeyword = UpdateKeywordGeneral;
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const steps = ["Main Info", "Bonus"];
  const stepsItem = [<MainInfo />, <Bonus />];

  /* TODO: Get params url of _id */
  const { _id } = useParams();
  const { data, isFetching } = useKeywordGeneralDetailQuery(_id ?? "");

  useEffect(() => {
    if (data) {
      UpdateKeyword.bonus = cloneDeep(data.bonus);
      UpdateKeyword.eligibility = cloneDeep(data.eligibility);
      UpdateKeyword.notification = cloneDeep(data.notification);

      // TODO Mapping customer_experience to program_experience
      UpdateKeyword.eligibility.program_experience = cloneDeep(
        data.customer_experience
      );
    }
  }, [isFetching]);

  return (
    <DrawerNav>
      <Box
        sx={{
          paddingBlock: "3vw",
          paddingInline: "20vw",
        }}
      >
        <StepperPaper sx={{ paddingTop: "4vw" }}>
          <H2 textAlign="center" mb="2vw">
            Update Keyword
          </H2>
          {isFetching ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Stepper
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              slug={"update"}
              type={"keyword"}
            >
              {stepsItem[activeStep]}
            </Stepper>
          )}
        </StepperPaper>
      </Box>
    </DrawerNav>
  );
};

export default UpdateKeyword;
