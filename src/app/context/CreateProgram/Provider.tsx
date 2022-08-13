import React from "react";
import { CreateProgramContext } from ".";
import { IProgramData } from "./types";

export const CreateProgramProvider = ({ children }: any) => {
  const [programData, setProgramData] = React.useState<IProgramData>({
    program_type: "",
    name: "",
    program: "",
    start_period: "",
    end_period: "",
    point_type: "",
    program_notification: [
      {
        notification: "",
        via: "",
        receiver: "",
        transaction_type: "",
      },
    ],
    program_segmentation: [
      {
        customer_msisdn: "",
        customer_tier: "",
        customer_los_enable: true,
        customer_los_type: "",
        customer_los_value: "",
        customer_type: "",
        customer_bedges: "",
        customer_location: "",
        customer_brand: "",
        customer_point_balance: 0,
        customer_preferences: "",
        customer_ARPU: "",
      },
    ],
    program_mechanism: "",
    program_owner: "",
    logic: "",
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
