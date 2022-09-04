import * as React from "react";
import { useMerchantManagementListQuery } from "../../../../../redux/features/merchant/merchant-api-slice";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { Select } from "../../../../atoms";
import { ICreateKeyword } from "../../interfaces";

interface IMerchantProps {
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const Merchant: React.FunctionComponent<IMerchantProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: merchantManagementOptions = { data: [] } } =
    useMerchantManagementListQuery(FilterInitial);
  return (
    <Select
      label="Merchant"
      placeholder="Option"
      options={merchantManagementOptions.data}
      optionLabel={"company_name"}
      value={keywordCreateState.merchant}
      handleChange={(value: string) => {
        keywordCreate.merchant = value;
        setStateTrigger(!stateTrigger);
      }}
    />
  );
};

export default Merchant;
