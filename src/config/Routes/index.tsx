import {Routes, Route} from "react-router-dom";

import {
    MyTelkomsel,
    Dashboard,
    ProgramPage,
    CreateProgram,
    CreateKeyword,
    EditProgram,
    Keyword, Auth,
} from "../../pages";
import SpecificProgramTemplate from "../../atomic/containers/pages/GeneralProgramRegistration";

const Index = () => (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/myTelkomsel" element={<MyTelkomsel/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/program-management" element={<ProgramPage/>}/>
        <Route path="/keyword" element={<Keyword/>}/>
        <Route path="/create-program" element={<CreateProgram/>}/>
        <Route path="/edit-program/:_id" element={<EditProgram/>}/>
        <Route path="/create-keyword" element={<CreateKeyword/>}/>
        <Route path={"/auth"} element={<Auth/>}/>
        <Route
            path={"general-program-registration"}
            element={<SpecificProgramTemplate/>}
        />
    </Routes>
);


export default Index;
