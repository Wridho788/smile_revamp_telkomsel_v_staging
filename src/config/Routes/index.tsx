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
    Auth,
    ProgramMainInfoUpdate,
    ProgramNotificationUpdate
} from "../../pages";

import SpecificProgramTemplate from "../../atomic/containers/pages/GeneralProgramRegistration";
import NotificationManagement from "../../pages/NotificationManagement";
import {Segmentation} from "../../components/organisms/CreateProgram";

// "AuthProvider" & "Protected"
import AuthProvider from "../AuthProvider";
import Protected from "./Protected";

const Index = () => {
    return(
        <AuthProvider>
            <Routes>
                {/* ----------------------------------- Not Protected Route ------------------------------------ */}
                <Route path="/login" element={(<Auth/>)}/>

                {/* ------------------------------------- Protected Routes ------------------------------------- */}
                <Route path="/" element={
                    <Protected>
                        <Dashboard/>
                    </Protected>
                }/>

                <Route path="/myTelkomsel" element={
                    <Protected>
                        <MyTelkomsel/>
                    </Protected>
                }/>

                <Route path="/dashboard" element={
                    <Protected>
                        <Dashboard/>
                    </Protected>
                }/>

                <Route path="/program-management" element={
                    <Protected>
                        <ProgramPage/>
                    </Protected>
                }/>

                <Route path="/keyword-management" element={
                    <Protected>
                        <Keyword/>
                    </Protected>
                }/>

                <Route path="/create-program" element={
                    <Protected>
                        <CreateProgram/>
                    </Protected>
                }/>

                <Route path="/edit-program/:_id" element={
                    <Protected>
                        <EditProgram/>
                    </Protected>
                }/>

                <Route path="/edit-program/main-info/:_id" element={
                    <Protected>
                        <ProgramMainInfoUpdate/>
                    </Protected>
                }/>

                <Route path="/edit-program/notification/:_id" element={
                    <Protected>
                        <ProgramNotificationUpdate/>
                    </Protected>
                }/>

                <Route path="/create-keyword" element={
                    <Protected>
                        <CreateKeyword/>
                    </Protected>
                }/>

                <Route path="/merchant-management" element={
                    <Protected>
                        <MerchantManagement/>
                    </Protected>
                }/>

                <Route
                    path="/customer-management"
                    element={
                        <Protected>
                            <CustomerManagement/>
                        </Protected>
                    }/>

                <Route
                    path="/notification-management"
                    element={
                        <Protected>
                            <NotificationManagement/>
                        </Protected>
                    }/>

                <Route
                    path={"general-program-registration"}
                    element={
                        <Protected>
                            <SpecificProgramTemplate/>
                        </Protected>
                    }/>

                <Route
                    path={"/edit-program/segmentation/:programId"}
                    element={
                        <Protected>
                            <Segmentation/>
                        </Protected>
                    }/>

            </Routes>
        </AuthProvider>
    )
};


export default Index;
