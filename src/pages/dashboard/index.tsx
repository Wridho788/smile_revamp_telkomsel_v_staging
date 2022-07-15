import {Breadcrumb} from "../../components"

import DefaultBackground from "../../components/atoms/DefaultBackground";
import {Box, Container, Stack} from "@mui/material"

const Dashboard = () => {
    return (
        <DefaultBackground>
            <Container sx={{my: 5}}>
                <Breadcrumb title="Dashboard" subtitle="Configuration" active="Redemption" linkTo="/"/>
            </Container>
        </DefaultBackground>
    );
};

export default Dashboard;
