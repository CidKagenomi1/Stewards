/**
 * App.jsx — Router root
 * Race Manager (Commissioner & Organizer Edition)
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout.jsx';

// Pages
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import CircuitsPage from './pages/Circuits/CircuitsPage.jsx';
import RegulationsPage from './pages/Regulations/RegulationsPage.jsx';
import CarDriverSpecsPage from './pages/CarDriverSpecs/CarDriverSpecsPage.jsx';
import TeamsPage from './pages/Teams/TeamsPage.jsx';
import InvestigationsPage from './pages/Investigations/InvestigationsPage.jsx';
import FinancePage from './pages/Finance/FinancePage.jsx';
import SettingsPage from './pages/Settings/SettingsPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/circuits" element={<CircuitsPage />} />
          <Route path="/regulations" element={<RegulationsPage />} />
          <Route path="/car-driver-specs" element={<CarDriverSpecsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/investigations" element={<InvestigationsPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
