import { Box, Button, Dialog, Stack } from "@mui/material";
import { Gap, InputSearchable, OutlinedTextField } from "components/atoms";
import React from "react";
import { InitialFilter, InitialKeywordApproval } from "./initial";
import {
  useGetKeywordApprovalQuery,
  useGetProgramExperienceQuery,
} from "redux/features/lov/lov-api-slice";
import { FilterInitial } from "redux/utils/initial-general";
import { cloneDeep } from "lodash";

interface IProps {
  open: boolean;
  onClose: () => void;
  filters: typeof InitialFilter;
  triger: boolean;
  setTriger: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

interface IListKeywordApproval {
  _id: string;
  name: string;
}
const Filter: React.FC<IProps> = ({
  open,
  onClose,
  filters = InitialFilter,
  triger,
  loading,
  setTriger,
}: IProps) => {
  //================ Fetching Data ======================
  //=====================================================

  const { data: keywordApprovalList = { data: [InitialKeywordApproval] } } =
    useGetKeywordApprovalQuery();

  const { data: programExperienceList = { data: [InitialKeywordApproval] } } =
    useGetProgramExperienceQuery();

  //=============== Spreading data api ==================
  //=====================================================

  const listKeywordApproval = keywordApprovalList.data.map((item: any) => {
    let newItem: any = {};
    newItem["_id"] = item._id;
    newItem["name"] = item.set_value;
    return newItem;
  });
  const listProgramExperience = programExperienceList.data.map((item: any) => {
    let newItem: any = {};
    newItem["_id"] = item._id;
    newItem["name"] = item.set_value;
    return newItem;
  });

  //====================== Handler ======================
  //=====================================================
  const onSelectApproved = async (data: IListKeywordApproval) => {
    InitialFilter.keyword_approval = cloneDeep(data);
    setTriger(!triger);
  };

  React.useEffect(() => {
    filters = InitialFilter;
  }, [triger]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box sx={{ padding: "20px 50px" }}>
        <Stack
          direction="row"
          //   justifyContent="center"
          spacing="2vw"
          sx={{
            overflowX: "scroll",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {[{ _id: "", name: "All Status" }, ...listKeywordApproval].map(
            (item: IListKeywordApproval) => (
              <Button
                disabled={loading}
                key={item._id}
                onClick={() => onSelectApproved(item)}
                sx={{
                  fontSize: 10,
                  width: "100%",
                  minWidth: "fit-content",
                  whiteSpace: "noWrap",
                  marginRight: "5px",
                  backgroundColor:
                    InitialFilter.keyword_approval._id === item._id
                      ? "#001A41"
                      : "",
                  color:
                    InitialFilter.keyword_approval._id === item._id
                      ? "#FFF"
                      : "#001A41",
                }}
              >
                {item.name}
              </Button>
            )
          )}
        </Stack>
        <Gap width={0} height={30} />
        <InputSearchable
          required
          label="Program Experience"
          options={listProgramExperience}
          onChange={(e: any, newValue: any) => {
            InitialFilter.program_experience = newValue
              ? newValue
              : { _id: "", name: "" };
            setTriger(!triger);
          }}
        />
        <Gap width={0} height={30} />
      </Box>
    </Dialog>
  );
};

export default Filter;
