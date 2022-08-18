import {Routes, Route} from "react-router-dom";

import {
    MyTelkomsel,
    Dashboard,
    LoginPage,
    ProgramPage,
    CreateProgram,
    Keyword,
    EditProgram,
    Tes
} from "../../pages";
import SpecificProgramTemplate from "../../atomic/containers/pages/GeneralProgramRegistration";

const Index = () => (
    <Routes>
        <Route path="/" element={<Tes/>}/>
        <Route path="/myTelkomsel" element={<MyTelkomsel/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/program-management" element={<ProgramPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/create-program" element={<CreateProgram/>}/>
        <Route path="/edit-program/:_id" element={<EditProgram/>}/>
        <Route path="/keyword" element={<Keyword/>}/>
        <Route
            path={"general-program-registration"}
            element={<SpecificProgramTemplate/>}
        />
    </Routes>
);
export default Index;
