import React from "react";
import { CreateProgramContext } from ".";
import { IProgramData } from "./types";

export const CreateProgramProvider = ({ children }: any) => {
  const [programData, setProgramData] = React.useState<IProgramData>({
    program_type: "",
    name: "",
    program: "This program description",
    start_period: "YYYY-MM-DD",
    end_period: "YYYY-MM-DD",
    point_type: "",
    program_notification: [
      {
        notification: "Notification template id",
        via: "LOV NOTIF_VIA",
        receiver: "LOV NOTIF_RECEIVER",
        transaction_type: "LOV TRANSACTION_TYPE",
      },
    ],
    program_segmentation: [
      {
        customer_msisdn: "62e8bd5415a463e4709ab5a0",
        customer_tier: "62e8bd5415a463e4709ab5a0",
        customer_los_enable: true,
        customer_los_type: "string",
        customer_los_value: "string",
        customer_type: "62e8bd5415a463e4709ab5a0",
        customer_bedges: "62e8bd5415a463e4709ab5a0",
        customer_location: "62e8bd5415a463e4709ab5a0",
        customer_brand: "62e8bd5415a463e4709ab5a0",
        customer_point_balance: 0,
        customer_preferences: "string",
        customer_ARPU: "string",
      },
    ],
    program_mechanism: "",
    program_owner: "",
    logic: "Just type the program segmentation logic",
    program_parent: "",
  });

  return (
    <CreateProgramContext.Provider
      value={{
        programData,
        setProgramData,
      }}
    >
      {children}
    </CreateProgramContext.Provider>
  );
};
