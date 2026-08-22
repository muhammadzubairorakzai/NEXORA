"use client";

import { useState } from "react";

import Sidebar from "../components/sidebar";
import MobileMenu from "../components/mobile-menu";
import Header from "../components/header";
import Dashboard from "../components/dashboard";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#080b11]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Application */}
      <div className="lg:pl-[280px]">
        {/* Header */}
        <Header
          onMenuClick={() =>
            setMobileMenuOpen(true)
          }
        />

        {/* Main Dashboard */}
        <main>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
