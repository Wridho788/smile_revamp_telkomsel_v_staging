import React from "react";

import { Box, Button, Dialog, Stack } from "@mui/material";

import { InitialFilter, InitialProgramApproval } from "../initial";

import {
    useGetProgramApprovalQuery,
} from "redux/features/lov/lov-api-slice";
import { cloneDeep } from "lodash";

interface IProps {
    open: boolean;
    onClose: () => void;
    filters: typeof InitialFilter;
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
}

interface IListProgramApproval {
    _id: string;
    name: string;
}

const ProgramFilterProgram: React.FC<IProps> = ({
                                      open,
                                      onClose,
                                      filters = InitialFilter,
                                      trigger,
                                      loading,
                                      setTrigger,
                                  }: IProps) => {

    const { data: programApprovalList = { data: [InitialProgramApproval] } } =
        useGetProgramApprovalQuery();

    const listProgramApproval = programApprovalList.data.map((item: any) => {
        let newItem: any = {};
        newItem["_id"] = item._id;
        newItem["name"] = item.set_value;
        return newItem;
    });

    const onSelectApproved = async (data: IListProgramApproval) => {
        InitialFilter.program_approval = cloneDeep(data);
        setTrigger(!trigger);
    };

    React.useEffect(() => {
        filters = InitialFilter;
    }, [trigger]);

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
                    {[{ _id: "", name: "All Status" }, ...listProgramApproval].map(
                        (item: IListProgramApproval) => (
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
                                        InitialFilter.program_approval._id === item._id
                                            ? "#001A41"
                                            : "",
                                    color:
                                        InitialFilter.program_approval._id === item._id
                                            ? "#FFF"
                                            : "#001A41",
                                }}
                            >
                                {item.name}
                            </Button>
                        )
                    )}
                </Stack>
            </Box>
        </Dialog>
    );
};

export default ProgramFilterProgram;
