import {Routes, Route} from "react-router-dom";

import {
    MyTelkomsel,
    Dashboard,
    LoginPage,
    ProgramPage,
    CreateProgram,
    Keyword,
    ApiKeyword,
    ApiProgram,
    ApiList,
    ApiCreateKeyword,
    ApiCreateProgram, DetailProgramPage
} from "../../pages";
import SpecificProgramTemplate from "../../atomic/containers/pages/GeneralProgramRegistration";


const Index = () => (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/myTelkomsel" element={<MyTelkomsel/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/program-management" element={<ProgramPage/>}/>
        <Route path="/program-management/:id" element={<DetailProgramPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-program" element={<CreateProgram/>}/>
        <Route path="/keyword" element={<Keyword/>}/>
        <Route path="/api-keyword" element={<ApiKeyword/>}/>
        <Route path="/api-program" element={<ApiProgram/>}/>
        <Route path="/api-list" element={<ApiList/>}/>
        <Route path="/api-create-keyword" element={<ApiCreateKeyword/>}/>
        <Route path="/api-create-program" element={<ApiCreateProgram/>}/>
        <Route path={"general-program-registration"} element={<SpecificProgramTemplate />} />
    </Routes>
);
export default Index;
