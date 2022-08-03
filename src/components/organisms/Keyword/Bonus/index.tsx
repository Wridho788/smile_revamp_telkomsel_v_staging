import * as React from "react";
import {Box, Grid} from "@mui/material";
import {IBonusProps} from "./type";
import BonusItem from "./BonusItem";
import {keywordCreateBonus} from "../../../../mocks/keywordCreate"

const Index: React.FunctionComponent<IBonusProps> = (props) => {
    const tes = [1, 2, 3, 4, 5, 6, 7];
    return (
        <Box >
            {tes.map(() =>
                (
                    <Grid sx={{paddingBottom:2}} >
                    <BonusItem data={keywordCreateBonus}/>
                    </Grid>
                )
            )}
        </Box>
    );
};

export default Index;
