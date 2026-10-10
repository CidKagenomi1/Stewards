import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { useRaceManagerStore } from '../../store/useRaceManagerStore.js';
import '../../styles/layout.css';

export default function AppLayout() {
  const isRacing = useRaceManagerStore((state) => state.liveRace.isRacing);

  return (
    <div className={`rm-app-wrapper ${isRacing ? 'theme-grandprix-dark' : 'theme-white-blue'}`}>
      <Navbar />
      <main className="rm-page-body">
        <Outlet />
      </main>
    </div>
  );
}

