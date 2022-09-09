import { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { DrawerNav, Gap, H2 } from "../../components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { LocationInitial } from "../CustomerManagement/initial";
import { useLazyLocationTemplateForPrimeQuery } from "../../redux/features/location/location-api-slice";

const Index = () => {

  const [locations, setLocations] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState<any>(0);
  const [lazyParams, setLazyParams] = useState<any>({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      code: { value: "", matchMode: "contains" },
      name: { value: "", matchMode: "contains" },
    },
  });

  const onPage = (event: any) => setLazyParams(event);

  const [getProgramList, { data: locationData = { data: [LocationInitial] } }] = useLazyLocationTemplateForPrimeQuery()

  let loadLazyTimeout: any = null;
  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) clearTimeout(loadLazyTimeout);

    loadLazyTimeout = setTimeout(async () => {
      const { data }: any = await getProgramList({
        lazyEvent: JSON.stringify(lazyParams),
      });

      setLocations(data.payload.data);
      setTotalRecords(data.payload.totalRecords);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DrawerNav>
      <Box
        sx={{
          paddingTop: "3vw",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
      >
        <H2>Location Management</H2>
        <Gap width={0} height={20} />

        <Box>
          <DataTable
            lazy
            paginator
            scrollable
            dataKey="_id"
            responsiveLayout="scroll"
            scrollDirection="both"
            selectionMode="single"
            rows={10}
            loading={loading}
            onPage={onPage}
            value={locations}
            totalRecords={totalRecords}
            first={lazyParams.first}
            filters={lazyParams.filters}
          >
            <Column
              field='code'
              header='Kode'
              style={{ flexGrow: 1, flexBasis: "250px" }}
            />

            <Column
              field='name'
              header='Name Location'
              style={{ flexGrow: 1, flexBasis: "250px" }}
            />
          </DataTable>
        </Box>
      </Box>
    </DrawerNav>
  )
}

export default Index;