import React, { FC, useState } from "react";
import FormCard from "../../../../../components/atoms/FormCard";
import { Box, Grid } from "@mui/material";
import { NotificationProps } from "./Notification.type";
import ButtonApp from "../../../../../components/atoms/ButtonApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationList from "./NotificationList";
import AddIcon from "@mui/icons-material/Add";

const Notification: FC<NotificationProps> = ({
  step,
  setStep,
  setNotification,
}) => {
  const [data, setData] = useState([
    {
      via: {
        id: 0,
      },
      type: {
        id: 0,
      },
      template: {
        id: 0,
      },
      transactionType: {
        id: 0,
      },
    },
  ]);

  const handleAddMoreNotification = () => {
    setData([
      ...data,
      {
        via: {
          id: 0,
        },
        type: {
          id: 0,
        },
        template: {
          id: 0,
        },
        transactionType: {
          id: 0,
        },
      },
    ]);
  };
  return (
    <FormCard>
      <>
        <Grid container>
          <Box component={Grid} item xs={12} p={2}>
            {data.map((item: any, idx: number) => {
              return (
                <Box key={idx} mt={2}>
                  <NotificationList data={data} setData={setData} index={idx} />
                </Box>
              );
            })}
          </Box>
          <Box component={Grid} item xs={12} p={2} sx={{ textAlign: "center" }}>
            <ButtonApp
              label={"Add more"}
              icon={<AddIcon />}
              onClick={() => {
                handleAddMoreNotification();
              }}
            />
          </Box>
        </Grid>

        <Grid
          container
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Box mt={2} component={Grid} item xs={11} pb={2}>
            <Grid container justifyContent={"space-between"}>
              <Box component={Grid} item xs={2}>
                <ButtonApp
                  onClick={() => {
                    step > 0 && setStep(step - 1);
                  }}
                  icon={<ArrowBackIcon />}
                  label={"Back"}
                />
              </Box>
              <Box component={Grid} item xs={2}>
                <ButtonApp
                  onClick={() => {
                    step < 4 && setStep(step + 1);
                    setNotification(data);
                  }}
                  icon={<ArrowForwardIcon />}
                  label={"Next"}
                />
              </Box>
            </Grid>
          </Box>
        </Grid>
      </>
    </FormCard>
  );
};
export default Notification;
