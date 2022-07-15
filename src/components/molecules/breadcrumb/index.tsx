import {
    Breadcrumbs,
    Card,
    Link,
    Typography
} from "@mui/material";

import {FC} from "react";
import {H1, SmallCopy} from "../../../components";
import BreadcrumbStyle from "./style"
import Theme from "../../../style/Material-UI/theme";

interface BreadcrumbProps {
    title: string;
    subtitle: string;
    active: string;
    linkTo: string;
}

const Index: FC<BreadcrumbProps> = ({title, subtitle, active, linkTo}: BreadcrumbProps) => {
    return (
        <BreadcrumbStyle>
                <H1>{title}</H1>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        sx={{
                            color: Theme.palette.secondary.dark,
                            opacity: 0.5,
                        }}
                        underline="hover"
                        href={linkTo}>
                        {subtitle}
                    </Link>
                    <SmallCopy>{active}</SmallCopy>
                </Breadcrumbs>
        </BreadcrumbStyle>
    );
};

export default Index;
