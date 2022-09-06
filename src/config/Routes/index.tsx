import {Routes, Route} from "react-router-dom";

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
    ProgramMainInfoUpdate
} from "../../pages";

import SpecificProgramTemplate from "../../atomic/containers/pages/GeneralProgramRegistration";
import NotificationManagement from "../../pages/NotificationManagement";

const Index = () => (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/myTelkomsel" element={<MyTelkomsel/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/program-management" element={<ProgramPage/>}/>
        <Route path="/keyword-management" element={<Keyword/>}/>
        <Route path="/create-program" element={<CreateProgram/>}/>
        <Route path="/edit-program/:_id" element={<EditProgram/>}/>
        <Route path="/edit-program/main-info/:_id" element={<ProgramMainInfoUpdate />}/>
        <Route path="/create-keyword" element={<CreateKeyword/>}/>
        <Route path="/merchant-management" element={<MerchantManagement/>}/>
        <Route path="/login" element={<Auth/>}/>
        <Route
            path="/customer-management"
            element={<CustomerManagement/>}
        />
        <Route
            path="/notification-management"
            element={<NotificationManagement/>}
        />

        <Route
            path={"general-program-registration"}
            element={<SpecificProgramTemplate/>}
        />
    </Routes>
);


export default Index;
