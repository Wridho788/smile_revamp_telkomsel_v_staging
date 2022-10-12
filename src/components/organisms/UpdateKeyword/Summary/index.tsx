import { Box, Stack } from "@mui/material";
import * as React from "react";
import { BodyCopy, Subtitle } from "../../../atoms";

interface ISummaryProps {}

const Summary: React.FunctionComponent<ISummaryProps> = (props) => {
  const titles = ["Main Info", "Bonus", "Notification"];
  return (
    <Box pt="1vw">
      <Stack spacing={"3vw"} maxWidth={"100%"}>
        {titles.map((title, idx) => (
          <Stack key={`summaryTitle__${idx}`} spacing="1vw">
            <Subtitle>{title} Summary</Subtitle>
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <Stack
                key={`summaryDescription__${idx}`}
                direction="row"
                spacing="1vw"
              >
                <BodyCopy>Summary Item:</BodyCopy>
                <Box
                  borderBottom={"0.1vw solid rgba(0, 0, 0, 0.1)"}
                  width={"80%"}
                ></Box>
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Summary;
