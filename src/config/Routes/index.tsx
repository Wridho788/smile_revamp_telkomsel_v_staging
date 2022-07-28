import { Routes, Route } from "react-router-dom";
import {MyTelkomsel, Dashboard, LoginPage, Option} from "../../pages";

const Index = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/myTelkomsel" element={<MyTelkomsel />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/option" element={<Option />} />
  </Routes>
);
export default Index;
