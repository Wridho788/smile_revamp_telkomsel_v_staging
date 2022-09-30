import React from "react";
import { Routes, Route } from "react-router-dom";

import {
	MyTelkomsel,
	Dashboard,
	ProgramPage,
	CreateProgram,
	CreateKeyword,
	EditProgram,
	Keyword,
	MerchantManagement,
	CustomerManagement,
	LocationManagement,
	Auth,
	ProgramMainInfoUpdate,
	ProgramNotificationUpdate,
	MerchantPartnerManagement,
	MerchantOutletManagement,
	UpdateKeyword
} from "../../pages";

import NotificationManagement from "../../pages/NotificationManagement";
import { Segmentation } from "../../components/organisms/CreateProgram";

// "AuthProvider" & "Protected"
import Protected from "./Protected";
import SignOut from "../../pages/SignOut";

const Index = () => {
	return (
		<Routes>
			{/* ----------------------------------- Not Protected Route ------------------------------------ */}
			<Route path="/login" element={<Auth />} />

			{/* ------------------------------------- Protected Routes ------------------------------------- */}
			<Route
				path="/"
				element={
					<Protected>
						<Dashboard />
					</Protected>
				}
			/>

			<Route
				path="/myTelkomsel"
				element={
					<Protected>
						<MyTelkomsel />
					</Protected>
				}
			/>

			<Route
				path="/dashboard"
				element={
					<Protected>
						<Dashboard />
					</Protected>
				}
			/>

			<Route
				path="/program-management"
				element={
					<Protected>
						<ProgramPage />
					</Protected>
				}
			/>

			<Route
				path="/keyword-management"
				element={
					<Protected>
						<Keyword />
					</Protected>
				}
			/>

			<Route
				path="/create-program"
				element={
					<Protected>
						<CreateProgram />
					</Protected>
				}
			/>

			<Route
				path="/edit-program/:_id"
				element={
					<Protected>
						<EditProgram />
					</Protected>
				}
			/>

			<Route
				path="/edit-program/main-info/:_id"
				element={
					<Protected>
						<ProgramMainInfoUpdate />
					</Protected>
				}
			/>

			<Route
				path="/edit-program/notification/:_id"
				element={
					<Protected>
						<ProgramNotificationUpdate />
					</Protected>
				}
			/>

			{/* TODO: Create Keyword */}
			<Route
				path="/create-keyword"
				element={
					<Protected>
						<CreateKeyword />
					</Protected>
				}
			/>

			{/* TODO: Update Keyword */}
			<Route
				path="/update-keyword/:_id"
				element={
					<Protected>
						<UpdateKeyword />
					</Protected>
				}
			/>

			<Route
				path="/merchant-management"
				element={
					<Protected>
						<MerchantManagement />
					</Protected>
				}
			/>
			<Route
				path="/merchant-partner-management"
				element={
					<Protected>
						<MerchantPartnerManagement />
					</Protected>
				}
			/>
			<Route
				path="/merchant-outlet-management"
				element={
					<Protected>
						<MerchantOutletManagement />
					</Protected>
				}
			/>

			<Route
				path="/customer-management"
				element={
					<Protected>
						<CustomerManagement />
					</Protected>
				}
			/>

			<Route
				path="/notification-management"
				element={
					<Protected>
						<NotificationManagement />
					</Protected>
				}
			/>

			<Route path="/location-management" element={<LocationManagement />} />

			<Route
				path={"/edit-program/segmentation/:programId"}
				element={
					<Protected>
						<Segmentation />
					</Protected>
				}
			/>
			<Route path="/signOut" element={<SignOut />} />
		</Routes>
	);
};

export default Index;
