import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Alert } from "@mui/material";
import {
  channelsData,
  totalRecordsData,
  lazyParamsData,
  selectedChannelData,
} from "pages/NotificationManagement/initial";
import { useLazyChannelListPrimeQuery } from "redux/features/channel/channel-api-slice";
import { Subtitle } from "components";
import { ICreateKeyword } from "components/organisms/UpdateKeyword/interfaces";

interface IChannelProps {
  keywordCreate: ICreateKeyword;
  //   stateTrigger: boolean;
  //   setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Channel: React.FunctionComponent<IChannelProps> = ({
  keywordCreate,
  //   stateTrigger,
  //   setStateTrigger,
}) => {
  const [getChannelID] = useLazyChannelListPrimeQuery();

  const channels = channelsData;
  const totalRecords = totalRecordsData;
  const selectedChannel = selectedChannelData.data;
  const lazyParams = lazyParamsData;
  // const loading = loadingData;

  const [channelsState, setChannelsState] = useState(channels);
  const [totalRecordsState, setTotalRecordsState] = useState(totalRecords);
  const [selectedChannelState, setSelectedChannelState] =
    useState<any>(selectedChannel);
  const [lazyParamsState, setLazyParamsState] = useState<any>(lazyParams);
  const [channelTrigger, setChannelTrigger] = useState(false);
  const [lazyParamsTrigger, setLazyParamsTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChannelsState(channels);
  }, [channelTrigger, channels]);

  useEffect(() => {
    setTotalRecordsState(totalRecords);
  }, [channelTrigger, totalRecords]);

  useEffect(() => {
    setSelectedChannelState(selectedChannel);
  }, [channelTrigger, selectedChannel]);

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
      const { data }: any = await getChannelID({
        lazyEvent: JSON.stringify(lazyParamsState.data),
      });
      channels.data = data.payload.data;
      totalRecords.data = data.payload.totalRecords;
      setChannelTrigger(!channelTrigger);
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

    keywordCreate.eligibility.channel_validation_list = value.map(
      (item: any) => item._id
    );
    setSelectedChannelState(value);
  };

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">Channel List</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <DataTable
          value={channelsState.data}
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
          selection={selectedChannelState}
          onSelectionChange={onSelectionChange}
          filters={lazyParamsState.data.filters}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column
            field="_id"
            header="ID"
            sortable
            filter
            filterPlaceholder="Search by ID"
          />
          <Column
            field="code"
            sortable
            filter
            header="Code"
            filterPlaceholder="Search by code"
          />
          <Column
            field="name"
            sortable
            filter
            header="Name"
            filterPlaceholder="Search by Name"
          />
        </DataTable>
        {selectedChannelState.name !== "" && (
          <Alert severity="success" sx={{ mt: "1vw" }}>
            Selected Channel : "
            {selectedChannelState.map((item: any) => item.name).join(",")}"
          </Alert>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default Channel;
