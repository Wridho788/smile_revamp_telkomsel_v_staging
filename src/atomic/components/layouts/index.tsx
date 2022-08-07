import React, {FC, useEffect} from 'react'
import {AppLayoutProps} from "./layouts.type";
import {Container, Grid} from "@mui/material";

const AppLayout: FC<AppLayoutProps> = ({children, title}) => {

    useEffect(() => {
        document.title = title ?? "Smile Loyalty"
    }, [])

    return (
        <Container maxWidth="lg">
            {children}
        </Container>

        )
}
export default AppLayout