import { Routes, Route } from "react-router-dom";
import { Home, Option, MyTelkomsel, Report, Dashboard} from "../../pages";

const Index = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/option" element={<Option />} />
    <Route path="/myTelkomsel" element={<MyTelkomsel />} />
    <Route path="/report" element={<Report />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);
export default Index;
