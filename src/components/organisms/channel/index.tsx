import { FC } from "react";
import { ChannelCard, H2 } from "../../../components";
import { Box } from "@mui/material";
import React, { useState } from "react";

interface ChannelProps {
  setChannelValue: any;
}

const Index: FC<ChannelProps> = ({ setChannelValue }: ChannelProps) => {
  const [value, setValue] = useState<number>(1);
  const onClickCard = (id?: any) => {
    setValue(id);
    setChannelValue(id);
  };
  return (
    <Box>
      <H2 sx={{ paddingTop: "50px", paddingBottom: "30px" }}>Channel</H2>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
        }}
      >
        <div onClick={() => onClickCard(1)}>
          <ChannelCard
            title={"All"}
            subtitle={"Channel"}
            isActive={value == 1 ? true : false}
          />
        </div>
        <div onClick={() => onClickCard(2)}>
          <ChannelCard
            title={"My Telkomsel"}
            subtitle={"Merchant"}
            isActive={value == 2 ? true : false}
          />
        </div>
        <div onClick={() => onClickCard(3)}>
          <ChannelCard
            title={"Telkomsel.com"}
            subtitle={"Merchant"}
            isActive={value == 3 ? true : false}
          />
        </div>
        <div onClick={() => onClickCard(4)}>
          <ChannelCard
            title={"weGIV"}
            subtitle={"Merchant"}
            isActive={value == 4 ? true : false}
          />
        </div>
      </Box>
    </Box>
  );
};

export default Index;
