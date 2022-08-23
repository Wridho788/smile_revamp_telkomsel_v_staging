import {Box, Stack} from "@mui/material";
import * as React from "react";
import {MainInfoAuction} from "..";
import {
    Select,
    OutlinedTextField,
    ResponsiveDateTimePicker,
} from "../../../atoms";
import {useCustomerTierListQuery} from "../../../../redux/features/customer/customer-api-slice";
import {
    useGetKeywordTypeQuery,
    useGetPointTypeQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import {CreateKeywordInitial} from "../../../../pages/CreateKeyword/initial";
import {FilterInitial} from "../../../../redux/utils/initial-general";
import {useKeywordListQuery} from "../../../../redux/features/keyword/notification-api-slice";

import { keywordTypeOptions, optionsObj } from "../../../../mocks/options";
interface IMainInfoProps {
}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {

    // const {data: keywordTypeOption = {data: []}} = useGetKeywordTypeQuery()
    const {data: customerTierOption = {data: []}} = useCustomerTierListQuery(FilterInitial);
    const {data: pointTypeOption = {data: []}} = useGetPointTypeQuery();
    const {data: parentOption = {data: []}} = useKeywordListQuery(FilterInitial);

    const keywordCreate = CreateKeywordInitial
    const [type, setType] = React.useState<string>(keywordCreate.keyword_type);
    const [name, setName] = React.useState<string>(keywordCreate.name);
    const [startPeriod, setStartPeriod] = React.useState<string>(keywordCreate.start_period);
    const [endPeriod, setEndPeriod] = React.useState<string>(keywordCreate.end_period);
    const [maxRedeemPermisson, setMaxRedeemPermisson] =
        React.useState<number>(keywordCreate.max_redeem_per_msisdn);
    const [maxRedeemPermissonType, setMaxRedeemPermissonType] =
        React.useState<number>(keywordCreate.max_redeem_per_msisdn_type);
    const [maxRedeemPermissonFrom, setMaxRedeemPermissonFrom] =
        React.useState<string>(keywordCreate.max_redeem_per_msisdn_from);
    const [maxRedeemPermissonTo, setMaxRedeemPermissonTo] =
        React.useState<string>(keywordCreate.max_redeem_per_msisdn_to);
    const [enableCorporate, setEnableCorporate] = React.useState<boolean>(keywordCreate.enable_coorporate);
    const [customerTier, setCustomerTier] = React.useState<string>(keywordCreate.customer_tier);
    const [pointType, setPointType] = React.useState<string>(keywordCreate.point_type);
    const [commentApproval, setCommentApproval] = React.useState<string>(keywordCreate.comment_approval);
    const [parent, setParent] = React.useState<string>(keywordCreate.keyword_parent);
    React.useEffect(() => {
        keywordCreate.name = name
        keywordCreate.keyword_type = type
        keywordCreate.start_period = startPeriod
        keywordCreate.end_period = endPeriod
        keywordCreate.max_redeem_per_msisdn = maxRedeemPermisson
        keywordCreate.max_redeem_per_msisdn_type = maxRedeemPermissonType
        keywordCreate.max_redeem_per_msisdn_from = maxRedeemPermissonFrom
        keywordCreate.max_redeem_per_msisdn_to = maxRedeemPermissonTo
        keywordCreate.enable_coorporate = enableCorporate
        keywordCreate.customer_tier = maxRedeemPermissonTo
        keywordCreate.point_type = maxRedeemPermissonTo
        keywordCreate.comment_approval = commentApproval
        keywordCreate.keyword_parent = parent
        return;
    }, [
        name,
        type,
        startPeriod,
        endPeriod,
        maxRedeemPermisson,
        maxRedeemPermissonType,
        maxRedeemPermissonFrom,
        maxRedeemPermissonTo,
        enableCorporate,
        customerTierOption,
        pointType,
        commentApproval,
        parent
    ]);
    return (
        <Box display="flex" justifyContent="center" px="5%" py="1vw">
            <Stack spacing={"1vw"} width={"100%"}>
                <Box px="7vw">
                    <Select
                        label="Type"
                        placeholder="Option"
                        options={keywordTypeOptions}
                        value={type}
                        handleChange={setType}
                    />
                </Box>
                <Stack spacing={"1vw"} px="7vw" pb="3vw">
                    <OutlinedTextField
                        label="Name"
                        placeholder="Name"
                        value={name}
                        handleChange={setName}
                        variant={"outlined"}
                    />
                    <ResponsiveDateTimePicker
                        label="Start Period"
                        placeholder="Start Period"
                        value={startPeriod}
                        handleChange={setStartPeriod}
                    />
                    <ResponsiveDateTimePicker
                        label="End Period"
                        placeholder="End Period"
                        value={endPeriod}
                        handleChange={setEndPeriod}
                    />
                    <OutlinedTextField
                        label="Max Redeem Permisson"
                        placeholder="Max Redeem Permisson"
                        value={maxRedeemPermisson}
                        handleChange={setMaxRedeemPermisson}
                        variant={"outlined"}
                    />
                    <OutlinedTextField
                        label="Max Redeem Permisson Type"
                        placeholder="Max Redeem Permisson Type"
                        value={maxRedeemPermissonType}
                        handleChange={setMaxRedeemPermissonType}
                        variant={"outlined"}
                    />
                    <ResponsiveDateTimePicker
                        label="Max Redeem Permisson From"
                        placeholder="Max Redeem Permisson From"
                        value={maxRedeemPermissonFrom}
                        handleChange={setMaxRedeemPermissonFrom}
                    />
                    <ResponsiveDateTimePicker
                        label="Max Redeem Permisson To"
                        placeholder="Max Redeem Permisson To"
                        value={maxRedeemPermissonTo}
                        handleChange={setMaxRedeemPermissonTo}
                    />
                    <Select
                        label="Enable Corporate"
                        placeholder="Option"
                        options={optionsObj}
                        value={enableCorporate}
                        handleChange={setEnableCorporate}
                    />
                    <Select
                        optionLabel={"name"}
                        label="Customer Tier"
                        placeholder="Option"
                        options={customerTierOption.data}
                        value={customerTier}
                        handleChange={setCustomerTier}
                    />
                    <Select
                        label="Point Type"
                        placeholder="Option"
                        options={pointTypeOption.data}
                        value={pointType}
                        handleChange={setPointType}
                    />
                    <OutlinedTextField
                        label="Comment Approval"
                        placeholder="Comment Approval"
                        value={commentApproval}
                        handleChange={setCommentApproval}
                        variant={"outlined"}
                        multiline
                        rows={4}
                    />
                    <Select
                        label="Parent"
                        placeholder="Option"
                        options={parentOption.data}
                        value={parent}
                        optionLabel={"name"}
                        handleChange={setParent}
                    />
                </Stack>
                {type === "Auction" && <MainInfoAuction/>}
            </Stack>
        </Box>
    );
};

export default MainInfo;
