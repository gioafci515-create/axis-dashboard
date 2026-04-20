import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/app/layout/DashboardLayout";
import ComingSoon from "@/app/ComingSoon";
import Marketing from "@/pages/Marketing";
import Analytics from "@/pages/Analytics";
import Ecommerce from "@/pages/Ecommerce";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Marketing />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="calendar" element={<ComingSoon name="Calendar" />} />
          <Route path="profile" element={<ComingSoon name="Profile" />} />
          <Route path="tables" element={<ComingSoon name="Tables" />} />
          <Route path="forms" element={<ComingSoon name="Forms" />} />
          <Route path="signin" element={<ComingSoon name="Sign in" />} />
          <Route path="signup" element={<ComingSoon name="Sign up" />} />
          <Route path="*" element={<ComingSoon name="Not found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
