export interface IProgramData {
  program_type: string;
  name: string;
  program: string;
  start_period: string;
  end_period: string;
  point_type: string;
  program_notification: [
    {
      notification: string;
      via: string;
      receiver: string;
      transaction_type: string;
    }
  ];
  program_segmentation: [
    {
      customer_msisdn: string;
      customer_tier: string;
      customer_los_enable: boolean;
      customer_los_type: string;
      customer_los_value: string;
      customer_type: string;
      customer_bedges: string;
      customer_location: string;
      customer_brand: string;
      customer_point_balance: number;
      customer_preferences: string;
      customer_ARPU: string;
    }
  ];
  program_mechanism: string;
  program_owner: string;
  logic: string;
  program_parent: string;
}

// export interface IProgramData {
//     program_type: "";
//     name: "PRG001";
//     program: "This program description";
//     start_period: "YYYY-MM-DD";
//     end_period: "YYYY-MM-DD";
//     point_type: "{LOV ID}";
//     program_notification: [
//       {
//         notification: "Notification template id";
//         via: "LOV NOTIF_VIA";
//         receiver: "LOV NOTIF_RECEIVER";
//         transaction_type: "LOV TRANSACTION_TYPE";
//       }
//     ];
//     program_segmentation: [
//       {
//         customer_msisdn: "62e8bd5415a463e4709ab5a0";
//         customer_tier: "62e8bd5415a463e4709ab5a0";
//         customer_los_enable: true;
//         customer_los_type: "string";
//         customer_los_value: "string";
//         customer_type: "62e8bd5415a463e4709ab5a0";
//         customer_bedges: "62e8bd5415a463e4709ab5a0";
//         customer_location: "62e8bd5415a463e4709ab5a0";
//         customer_brand: "62e8bd5415a463e4709ab5a0";
//         customer_point_balance: 0;
//         customer_preferences: "string";
//         customer_ARPU: "string";
//       }
//     ];
//     program_mechanism: "{LOV MECHANISM}";
//     program_owner: "{Location ID}";
//     logic: "Just type the program segmentation logic";
//     program_parent: "";
//   }
