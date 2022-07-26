import { Routes, Route } from "react-router-dom";
import { Option, MyTelkomsel, Dashboard, LoginPage } from "../../pages";

const Index = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/option" element={<Option />} />
    <Route path="/myTelkomsel" element={<MyTelkomsel />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);
export default Index;
