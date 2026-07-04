import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./features/dashboard/Dashboard";
import LeadsPage from "./features/leads/LeadsPage";
import AnalyticsPage from "./features/analytics/AnalyticsPage";
import Settings from "./features/settings/Settings";
import Login from "./features/auth/Login";
import ProtectedRoute from "./features/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <LeadsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;