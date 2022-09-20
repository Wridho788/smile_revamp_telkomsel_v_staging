import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { BodyCopy } from "components/atoms";
import { CreateKeywordGeneral } from "components/organisms/CreateKeyword/initial";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useKeywordProgramDetailQuery } from "redux/features/keyword/keyword-api-slice";
import { keywordProgramDetailHelper } from "./initial";

interface IKeywordLinkProps {
  data: any;
}

const KeywordLink: React.FunctionComponent<IKeywordLinkProps> = ({ data }) => {
  const nav = useNavigate();
  const createKeyword = CreateKeywordGeneral;
  const keywordProgramDetail = keywordProgramDetailHelper;
  const { data: keywords = [], isFetching: isKeywordsFetching } =
    useKeywordProgramDetailQuery(data._id);
  return (
    <Stack spacing="2vw">
      {data.approval_log?.length > 0 &&
        data.approval_log[data.approval_log.length - 1].status?.length > 0 &&
        data.approval_log[data.approval_log.length - 1].status[0].set_value ===
          "Approved by Manager HQ" && (
          <Box display="flex" justifyContent="right">
            <Button
              onClick={() => {
                nav("/create-keyword");
                createKeyword.eligibility.program_id = data._id;
              }}
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              + Link new keyword
            </Button>
          </Box>
        )}

      {isKeywordsFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : keywords.length > 0 ? (
        <Box bgcolor={"light"} sx={{ maxHeight: "227px", overflowY: "scroll" }}>
          <Box borderBottom="1px solid rgba(0,0,0,0.1)" mr="2vw">
            {keywords.map((_, idx) => (
              <Box
                key={`keyword__item__${idx}`}
                onClick={() => {
                  nav("/keyword-management");
                  keywordProgramDetail.data = _;
                  keywordProgramDetail.opened = false;
                }}
                sx={{
                  borderInline: "1px solid rgba(0,0,0,0.1)",
                  borderTop: "1px solid rgba(0,0,0,0.1)",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                {_.eligibility.name ?? ""}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <BodyCopy>
          No Keyword linked to this program yet, Add new Keyword
        </BodyCopy>
      )}
    </Stack>
  );
};

export default KeywordLink;
