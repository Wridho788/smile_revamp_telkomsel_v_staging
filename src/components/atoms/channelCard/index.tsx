import {
    Card,
} from "@mui/material";

import {FC} from "react";
import {PreTitle, Subtitle} from "../../../components";
import Theme from "../../../style/Material-UI/theme";

const activeStyle = {
    paddingLeft: '16px',
    height: "76px",
    width: "284px",
    borderRadius: '8px',
    backgroundColor: Theme.palette.primary.main,
    color: Theme.palette.secondary.main,
}

const nonActiveStyle = {
    paddingLeft: '16px',
    height: "76px",
    width: "284px",
    borderRadius: '8px',
}

const pt2 = {
    paddingTop: Theme.spacing(2)
}

interface ChannelCardProps {
    title: string;
    subtitle: string;
    isActive: boolean;
}

const Index: FC<ChannelCardProps> = ({title, subtitle, isActive}: ChannelCardProps) => {

    return (
        <Card sx={isActive ? activeStyle : nonActiveStyle}>
            <Subtitle sx={pt2}>{title}</Subtitle>
            <PreTitle sx={{opacity: isActive ? 1 : 0.5}}>{subtitle}</PreTitle>
        </Card>
    );
};

export default Index;
