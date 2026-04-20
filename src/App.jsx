import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import DashboardLayout from "@/app/layout/DashboardLayout";
import Marketing from "@/pages/Marketing";
import AnalyticsPage from "@/pages/Analytics";
import Ecommerce from "@/pages/Ecommerce";
import CalendarPage from "@/pages/Calendar";
import Profile from "@/pages/Profile";
import Tables from "@/pages/Tables";
import Forms from "@/pages/Forms";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<Marketing />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tables" element={<Tables />} />
          <Route path="forms" element={<Forms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
