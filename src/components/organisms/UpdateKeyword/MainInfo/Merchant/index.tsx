import {
	useDetailMerchantQuery,
	useLazyMerchantManagementListQuery
} from "../../../../../redux/features/merchant/merchant-api-slice";
import { IUpdateKeyword } from "../../interfaces";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Subtitle } from "../../../../atoms";
import {
	lazyParamsData,
	merchantsData,
	selectedMerchantData,
	totalRecordsData
} from "./initial";
import { Alert, Box, CircularProgress, Stack } from "@mui/material";

interface IMerchantProps {
	keywordCreate: IUpdateKeyword;
	stateTrigger: boolean;
	setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Merchant: React.FunctionComponent<IMerchantProps> = ({
	keywordCreate,
	stateTrigger,
	setStateTrigger
}) => {
	const [getMerchantsList] = useLazyMerchantManagementListQuery();
	const { data: merchant = { data: [] } } = useDetailMerchantQuery(
		keywordCreate.eligibility.merchant || ""
	);

	const merchants = merchantsData;
	const totalRecords = totalRecordsData;
	const selectedMerchant = { data: merchant };
	const lazyParams = lazyParamsData;
	// const loading = loadingData;

	const [merchantsState, setMerchantsState] = useState({ data: [] });
	const [totalRecordsState, setTotalRecordsState] = useState({ data: 0 });
	const [selectedMerchantState, setSelectedMerchantState] = useState<any>({
		data: []
	});
	const [lazyParamsState, setLazyParamsState] = useState<any>(lazyParams);
	const [merchantTrigger, setMerchantTrigger] = useState(false);
	const [lazyParamsTrigger, setLazyParamsTrigger] = useState(false);
	const [loading, setLoading] = useState(false);

	let loadLazyTimeout: any = null;

	useEffect(() => {
		// console.log(lazyParamsTrigger)
		loadLazyData();

		// eslint-disable-next-line
	}, [lazyParamsTrigger]);

	const loadLazyData = async () => {
		setLoading(true);

		if (loadLazyTimeout) {
			clearTimeout(loadLazyTimeout);
		}

		//imitate delay of a backend call
		const { data }: any = await getMerchantsList({
			lazyEvent: JSON.stringify(lazyParamsState.data)
		});

		setMerchantsState(() => ({ data: data.payload.data }));
		setTotalRecordsState(() => ({ data: data.payload.totalRecords }));

		setLoading(false);
	};

	const onPage = (event: any) => {
		setLazyParamsState(() => ({ data: event }));
		setLazyParamsTrigger(!lazyParamsTrigger);
	};
	const onSort = (event: any) => {
		setLazyParamsState(() => ({ data: event }));
		setLazyParamsTrigger(!lazyParamsTrigger);
	};
	const onFilter = (event: any) => {
		event["first"] = 0;
		setLazyParamsState(() => ({ data: event }));
		setLazyParamsTrigger(!lazyParamsTrigger);
	};
	const onSelectionChange = (event: any) => {
		setSelectedMerchantState(() => ({ data: event.value }));

		setStateTrigger(!stateTrigger);
	};

	return (
		<Accordion sx={{ p: "1vw" }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon fontSize="large" />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Subtitle textTransform="uppercase">
					<Stack direction="row" spacing={2}>
						{loading && (
							<Box className="accordion-loading">
								<CircularProgress size={16}></CircularProgress>
							</Box>
						)}
						<Box className="accordion-subtitle">
							merchant redeem eligibility
						</Box>
					</Stack>
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
