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
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [merchants, setMerchants] = useState<any[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [lazyParams, setLazyParams] = useState<any>({
    first: 0,
    rows: 3,
    page: 1,
    sortField: "",
    sortOrder: null,
    filters: {
      merchant_name: { value: "", matchMode: "contains" },
      address: { value: "", matchMode: "contains" },
      npwp: { value: "", matchMode: "contains" },
    },
  });

  let loadLazyTimeout: any = null;

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }

    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(async () => {
      const { data }: any = await getMerchantsList({
        lazyEvent: JSON.stringify(lazyParams),
      });
      // console.log(data.payload);
      setMerchants(data.payload.data);
      setTotalRecords(data.payload.totalRecords);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  const onPage = (event: any) => {
    setLazyParams(event);
  };
  const onSort = (event: any) => {
    setLazyParams(event);
  };
  const onFilter = (event: any) => {
    event["first"] = 0;
    setLazyParams(event);
  };
  const onSelectionChange = (event: any) => {
    const value = event.value;
    keywordCreate.merchant = value["_id"];
    setStateTrigger(!stateTrigger);
    setSelectedMerchant(value);
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
          value={merchants}
          lazy
          filterDisplay="row"
          responsiveLayout="scroll"
          dataKey="_id"
          paginator
          first={lazyParams.first}
          rows={3}
          totalRecords={totalRecords}
          onPage={onPage}
          onSort={onSort}
          sortField={lazyParams.sortField}
          sortOrder={lazyParams.sortOrder}
          onFilter={onFilter}
          loading={loading}
          selection={selectedMerchant}
          onSelectionChange={onSelectionChange}
          filters={lazyParams.filters}
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
      </AccordionDetails>
    </Accordion>
  );
};

export default Merchant;
