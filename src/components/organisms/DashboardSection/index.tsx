import { Breadcrumb, Channel, Merchant, Report } from "../../../components";
import React, { useState, useEffect } from "react";
import Dummy from "../../../mock-data/index.json";
import { Box } from "@mui/material";

const dataList = Dummy.data;
const Index = () => {
  const [channelValue, setChannelValue] = useState(1);
  const [merchantValue, setMerchantValue] = useState(1);
  const [data, setData] = useState(Array<any>);

  let rows: any = [];
  const updateList = (channelId?: any, merchantId?: any) => {
    for (let i = 0; i < dataList.length; i++) {
      if (
        dataList[i].channel_id === channelId &&
        dataList[i].merchant_id === merchantId
      ) {
        rows.push(dataList[i]);
      }
    }
    setData(rows);
  };
  useEffect(() => {
    updateList(channelValue, merchantValue);
  }, [channelValue, merchantValue]);

  return (
      <Box
        sx={{
          paddingTop: "20px",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
      >
        <Breadcrumb
          title="Index"
          subtitle="Configuration"
          active="Redemption"
          linkTo="/"
        />
        <Channel setChannelValue={setChannelValue} />
        <Merchant setMerchantValue={setMerchantValue} />
        {/* {console.log(data)} */}
        <Report resultData={data} />
      </Box>
  );
};

export default Index;
