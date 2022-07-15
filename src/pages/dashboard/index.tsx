import {Breadcrumb, Channel,Merchant} from "../../components";

import DefaultBackground from "../../components/atoms/DefaultBackground";
import React, {useState, useEffect} from 'react';
import Dummy from "../../mock-data/index.json"
import {Box} from "@mui/material";
const dataList = Dummy.data;
const Dashboard = () => {
    const [channelValue, setChannelValue] = useState(0)
    const [merchantValue, setMerchantValue] = useState(0)
    const [data, setDada] = useState(0)

    let rows: any = [];
    const updateList = (channelId?: any, merchantId?: any) => {
        for (var i = 0; i < dataList.length; i++) {
            if (dataList[i].channel_id == channelId && dataList[i].merchant_id == merchantId) {
                rows.push(dataList[i])
            }
            setDada(rows);
        }
    }
    useEffect(() => {
        updateList(channelValue, merchantValue)
    }, [channelValue, merchantValue]);

    return (
        <DefaultBackground>
            <Box
            sx={{
                paddingTop: "20px",
                paddingLeft: "50px",
                paddingRight: "50px"
            }} >
            <Breadcrumb title="Dashboard" subtitle="Configuration" active="Redemption" linkTo="/"/>
            <Channel setChannelValue={setChannelValue}/>
            <Merchant setMerchantValue={setMerchantValue}/>
            </Box>
        </DefaultBackground>
    );
};

export default Dashboard;
