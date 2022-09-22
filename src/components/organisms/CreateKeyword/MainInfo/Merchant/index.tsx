import { useLazyMerchantManagementListQuery } from "../../../../../redux/features/merchant/merchant-api-slice";
import { ICreateKeyword } from "../../interfaces";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Subtitle } from "../../../../atoms";
import {
  merchantsData,
  totalRecordsData,
  selectedMerchantData,
  lazyParamsData,
} from "./initial";
import { Alert } from "@mui/material";

interface IMerchantProps {
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Merchant: React.FunctionComponent<IMerchantProps> = ({
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const [getMerchantsList] = useLazyMerchantManagementListQuery();

  const merchants = merchantsData;
  const totalRecords = totalRecordsData;
  const selectedMerchant = selectedMerchantData;
  const lazyParams = lazyParamsData;
  // const loading = loadingData;

  const [merchantsState, setMerchantsState] = useState(merchants);
  const [totalRecordsState, setTotalRecordsState] = useState(totalRecords);
  const [selectedMerchantState, setSelectedMerchantState] =
    useState<any>(selectedMerchant);
  const [lazyParamsState, setLazyParamsState] = useState<any>(lazyParams);
  const [merchantTrigger, setMerchantTrigger] = useState(false);
  const [lazyParamsTrigger, setLazyParamsTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMerchantsState(merchants);
  }, [merchantTrigger, merchants]);

  useEffect(() => {
    setTotalRecordsState(totalRecords);
  }, [merchantTrigger, totalRecords]);

  useEffect(() => {
    setSelectedMerchantState(selectedMerchant);
  }, [merchantTrigger, selectedMerchant]);

  useEffect(() => {
    setLazyParamsState(lazyParams);
  }, [lazyParams, lazyParamsTrigger]);

  let loadLazyTimeout: any = null;

  useEffect(() => {
    loadLazyData();
  }, [lazyParamsTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }

    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(async () => {
      const { data }: any = await getMerchantsList({
        lazyEvent: JSON.stringify(lazyParamsState.data),
      });
      merchants.data = data.payload.data;
      totalRecords.data = data.payload.totalRecords;
      setMerchantTrigger(!merchantTrigger);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  const onPage = (event: any) => {
    lazyParams.data = event;
    setLazyParamsTrigger(!lazyParamsTrigger);
  };
  const onSort = (event: any) => {
    lazyParams.data = event;
    setLazyParamsTrigger(!lazyParamsTrigger);
  };
  const onFilter = (event: any) => {
    event["first"] = 0;
    lazyParams.data = event;
    setLazyParamsTrigger(!lazyParamsTrigger);
  };
  const onSelectionChange = (event: any) => {
    const value = event.value;
    value === null
      ? (keywordCreate.eligibility.merchant = "")
      : (keywordCreate.eligibility.merchant = value["_id"]);
    selectedMerchant.data = value;
    setStateTrigger(!stateTrigger);
    setMerchantTrigger(!merchantTrigger);
  };

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">
          merchant redeem eligibility
        </Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <DataTable
          value={merchantsState.data}
          lazy
          filterDisplay="row"
          responsiveLayout="scroll"
          dataKey="_id"
          paginator
          first={lazyParamsState.data.first}
          rows={3}
          totalRecords={totalRecordsState.data}
          onPage={onPage}
          onSort={onSort}
          sortField={lazyParamsState.data.sortField}
          sortOrder={lazyParamsState.data.sortOrder}
          onFilter={onFilter}
          loading={loading}
          selection={selectedMerchantState.data}
          onSelectionChange={onSelectionChange}
          filters={lazyParamsState.data.filters}
        >
          <Column
            selectionMode="single"
            headerStyle={{ width: "1vw" }}
          ></Column>
          <Column
            field="merchant_name"
            header="Merchant Name"
            sortable
            filter
            filterPlaceholder="Search by merchant name"
          />
          <Column
            field="address"
            sortable
            filter
            header="Address"
            filterPlaceholder="Search by address"
          />
          <Column
            field="npwp"
            sortable
            filter
            header="NPWP"
            filterPlaceholder="Search by NPWP"
          />
        </DataTable>
        {selectedMerchantState.data !== null && (
          <Alert severity="success" sx={{ mt: "1vw" }}>
            Selected Merchant : "{selectedMerchantState.data.merchant_name}"
          </Alert>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default Merchant;
