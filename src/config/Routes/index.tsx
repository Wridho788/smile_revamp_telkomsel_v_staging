import {Routes, Route} from "react-router-dom";

import {
    MyTelkomsel,
    Dashboard,
    LoginPage,
    ProgramPage,
    KeywordPage
} from "../../pages";

const Index = () => (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/myTelkomsel" element={<MyTelkomsel/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/program-management" element={<ProgramPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path={"/keyword"} element={<KeywordPage/>}/>
    </Routes>
);
export default Index;
