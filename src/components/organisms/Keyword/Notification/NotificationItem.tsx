import * as React from "react";
import {Box} from "@mui/material";
import {SelectVertical} from "../../../../components";
import {INotificationItemProps} from "./type";

const Index: React.FunctionComponent<INotificationItemProps> = (props) => {
    const list = props.data
    const gridColumn = list.length
    return (
        <Box
            sx={{
                border:1,
                display: 'grid',
                gridAutoFlow: 'row',
                gridTemplateColumns: `repeat(${gridColumn}, 1fr)`,
                gap: 1,
                padding:2
            }}>
            {list.map((data, index) =>
                (
                    <SelectVertical
                        label={data.label}
                        placeholder="Option"
                        options={data.child}
                        sx={{paddingTop: 2}}
                    />
                )
            )}
        </Box>
    );
};

export default Index;
