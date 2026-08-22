"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CandlestickChart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Cpu,
  Database,
  Gauge,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  MonitorCog,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  PlayCircle,
  Radar,
  RefreshCw,
  ScanLine,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  User,
  Wallet,
  Workflow,
  X,
  Zap,
} from "lucide-react";

import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

/* =========================================================
   TYPES
========================================================= */

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

type NavigationItem = {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string;
  badgeType?: "blue" | "green" | "red" | "purple";
  description: string;
  exact?: boolean;
};

type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

type QuickAction = {
  label: string;
  href: string;
  icon: ReactNode;
  description: string;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const [systemOpen, setSystemOpen] = useState(true);

  const [darkMode, setDarkMode] = useState(true);

  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "connecting" | "offline"
  >("connected");

  const [lastUpdated, setLastUpdated] = useState("Just now");

  /* =======================================================
     NAVIGATION GROUPS
  ======================================================= */

  const navigationGroups: NavigationGroup[] = useMemo(
    () => [
      {
        label: "COMMAND CENTER",
        items: [
          {
            label: "Dashboard",
            href: "/",
            icon: <LayoutDashboard size={20} />,
            description: "NEXORA command center",
            exact: true,
          },
          {
            label: "AI Scanner",
            href: "/scanner",
            icon: <ScanLine size={20} />,
            badge: "AI",
            badgeType: "purple",
            description: "Scan global markets with AI",
          },
          {
            label: "Market Intelligence",
            href: "/market",
            icon: <Radar size={20} />,
            description: "Live market intelligence",
          },
          {
            label: "Signals",
            href: "/signals",
            icon: <Zap size={20} />,
            badge: "3",
            badgeType: "blue",
            description: "Active AI trading signals",
          },
        ],
      },

      {
        label: "AI INTELLIGENCE",
        items: [
          {
            label: "Strategy Brain",
            href: "/strategy",
            icon: <BrainCircuit size={20} />,
            badge: "AI",
            badgeType: "purple",
            description: "Multi-strategy AI analysis",
          },
          {
            label: "Risk Engine",
            href: "/risk",
            icon: <ShieldCheck size={20} />,
            description: "Advanced risk management",
          },
          {
            label: "AI Automation",
            href: "/automation",
            icon: <Workflow size={20} />,
            description: "Automated trading workflows",
          },
          {
            label: "News Intelligence",
            href: "/intelligence",
            icon: <Sparkles size={20} />,
            description: "Macro and market intelligence",
          },
        ],
      },

      {
        label: "TRADING SYSTEM",
        items: [
          {
            label: "Execution",
            href: "/execution",
            icon: <PlayCircle size={20} />,
            description: "Paper and assisted execution",
          },
          {
            label: "Portfolio",
            href: "/portfolio",
            icon: <Wallet size={20} />,
            description: "Portfolio performance",
          },
          {
            label: "Backtesting",
            href: "/backtesting",
            icon: <BarChart3 size={20} />,
            description: "Strategy performance testing",
          },
          {
            label: "Analytics",
            href: "/analytics",
            icon: <LineChart size={20} />,
            description: "Trading analytics",
          },
        ],
      },
    ],
    []
  );

  const quickActions: QuickAction[] = useMemo(
    () => [
      {
        label: "Run Scanner",
        href: "/scanner",
        icon: <ScanLine size={18} />,
        description: "Analyze markets",
      },
      {
        label: "Generate Signal",
        href: "/signals",
        icon: <Zap size={18} />,
        description: "Create AI signal",
      },
      {
        label: "Risk Check",
        href: "/risk",
        icon: <Shield size={18} />,
        description: "Check trade risk",
      },
    ],
    []
  );

  /* =======================================================
     KEYBOARD SHORTCUT
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "b"
      ) {
        event.preventDefault();
        setCollapsed((previous) => !previous);
      }

      if (event.key === "Escape") {
        onMobileClose?.();
        setProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onMobileClose]);

  /* =======================================================
     CONNECTION SIMULATION
  ======================================================= */

  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = new Date();

      setLastUpdated(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =======================================================
     BODY SCROLL LOCK FOR MOBILE
  ======================================================= */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =======================================================
     ACTIVE ROUTE CHECK
  ======================================================= */

  const isActive = (item: NavigationItem) => {
    if (item.exact) {
      return pathname === item.href;
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  /* =======================================================
     NAVIGATION CLICK
  ======================================================= */

  const handleNavigation = () => {
    if (window.innerWidth < 1024) {
      onMobileClose?.();
    }
  };

  /* =======================================================
     SIDEBAR CLASS
  ======================================================= */

  const sidebarWidth = collapsed
    ? "w-[86px]"
    : "w-[285px]";

  const mobileState = mobileOpen
    ? "translate-x-0"
    : "-translate-x-full";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* ===================================================
          MOBILE OVERLAY
      ==================================================== */}

      <div
        onClick={onMobileClose}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* ===================================================
          SIDEBAR
      ==================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          h-screen
          flex-col
          border-r
          border-white/10
          bg-[#080b12]
          shadow-2xl
          transition-all
          duration-300
          ease-in-out
          lg:translate-x-0
          ${mobileState}
          ${sidebarWidth}
        `}
      >
        {/* =================================================
            BACKGROUND GLOW
        ================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              -top-32
              -left-20
              h-72
              w-72
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-0
              -right-24
              h-80
              w-80
              rounded-full
              bg-purple-500/10
              blur-3xl
            "
          />
        </div>

        {/* =================================================
            LOGO SECTION
        ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            min-h-[88px]
            items-center
            border-b
            border-white/10
            px-4
          "
        >
          <Link
            href="/"
            onClick={handleNavigation}
            className={`
              group
              flex
              min-w-0
              flex-1
              items-center
              gap-3
              ${collapsed ? "justify-center" : ""}
            `}
          >
            {/* Logo */}

            <div
              className="
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-cyan-400/30
                bg-gradient-to-br
                from-cyan-400/20
                via-blue-500/20
                to-purple-500/20
                shadow-lg
                shadow-cyan-500/10
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <Bot
                size={23}
                className="text-cyan-300"
              />

              <div
                className="
                  absolute
                  inset-0
                  rounded-xl
                  border
                  border-white/5
                "
              />
            </div>

            {/* Brand */}

            {!collapsed && (
              <div className="min-w-0">
                <div
                  className="
                    truncate
                    text-lg
                    font-bold
                    tracking-[0.18em]
                    text-white
                  "
                >
                  NEXORA
                </div>

                <div
                  className="
                    mt-0.5
                    truncate
                    text-[9px]
                    font-medium
                    tracking-[0.22em]
                    text-cyan-400/70
                  "
                >
                  AI TRADING OS
                </div>
              </div>
            )}
          </Link>

          {/* Desktop Collapse */}

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="
                hidden
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-white/10
                text-slate-400
                transition
                hover:border-cyan-400/30
                hover:bg-cyan-400/10
                hover:text-cyan-300
                lg:flex
              "
              title="Collapse Sidebar"
              aria-label="Collapse Sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          )}

          {/* Mobile Close */}

          <button
            onClick={onMobileClose}
            className="
              ml-auto
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-white/10
              text-slate-400
              transition
              hover:bg-white/5
              hover:text-white
              lg:hidden
            "
            title="Close Menu"
            aria-label="Close Menu"
          >
            <X size={19} />
          </button>
        </div>

        {/* =================================================
            COLLAPSED EXPAND BUTTON
        ================================================== */}

        {collapsed && (
          <div
            className="
              relative
              z-10
              flex
              justify-center
              border-b
              border-white/10
              py-3
            "
          >
            <button
              onClick={() => setCollapsed(false)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                text-slate-400
                transition
                hover:border-cyan-400/30
                hover:bg-cyan-400/10
                hover:text-cyan-300
              "
              title="Expand Sidebar"
              aria-label="Expand Sidebar"
            >
              <PanelLeftOpen size={18} />
            </button>
          </div>
        )}

        {/* =================================================
            SYSTEM STATUS
        ================================================== */}

        {!collapsed && (
          <div
            className="
              relative
              z-10
              px-4
              pt-4
            "
          >
            <div
              className="
                rounded-xl
                border
                border-cyan-400/10
                bg-gradient-to-r
                from-cyan-400/[0.07]
                to-purple-500/[0.04]
                p-3
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    text-[9px]
                    font-semibold
                    tracking-[0.16em]
                    text-slate-500
                  "
                >
                  SYSTEM STATUS
                </div>

                <button
                  onClick={() => {
                    setConnectionStatus("connecting");

                    window.setTimeout(() => {
                      setConnectionStatus("connected");
                    }, 800);
                  }}
                  className="
                    text-slate-500
                    transition
                    hover:text-cyan-300
                  "
                  title="Refresh Connection"
                >
                  <RefreshCw size={13} />
                </button>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`
                    relative
                    flex
                    h-2
                    w-2
                    rounded-full
                    ${
                      connectionStatus === "connected"
                        ? "bg-emerald-400"
                        : connectionStatus === "connecting"
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }
                  `}
                >
                  {connectionStatus === "connected" && (
                    <span
                      className="
                        absolute
                        inset-0
                        animate-ping
                        rounded-full
                        bg-emerald-400/50
                      "
                    />
                  )}
                </span>

                <span
                  className="
                    text-xs
                    font-semibold
                    text-slate-200
                  "
                >
                  {connectionStatus === "connected"
                    ? "NEXORA Connected"
                    : connectionStatus === "connecting"
                    ? "Connecting..."
                    : "Offline"}
                </span>
              </div>

              <div
                className="
                  mt-1
                  text-[10px]
                  text-slate-500
                "
              >
                Updated: {lastUpdated}
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            NAVIGATION AREA
        ================================================== */}

        <div
          className="
            relative
            z-10
            flex-1
            overflow-y-auto
            px-3
            py-5
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-white/10
          "
        >
          {navigationGroups.map((group, groupIndex) => (
            <div
              key={group.label}
              className={groupIndex > 0 ? "mt-7" : ""}
            >
              {/* Group Title */}

              {!collapsed && (
                <div
                  className="
                    mb-2
                    px-3
                    text-[9px]
                    font-bold
                    tracking-[0.18em]
                    text-slate-600
                  "
                >
                  {group.label}
                </div>
              )}

              {/* Group Divider */}

              {collapsed && groupIndex > 0 && (
                <div
                  className="
                    mx-auto
                    my-4
                    h-px
                    w-8
                    bg-white/10
                  "
                />
              )}

              {/* Navigation Items */}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavigation}
                      title={collapsed ? item.label : undefined}
                      className={`
                        group
                        relative
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        transition-all
