"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChartCandlestick,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Cpu,
  Database,
  Gauge,
  LayoutDashboard,
  LineChart,
  Menu,
  Moon,
  Play,
  Radar,
  RefreshCw,
  ScanLine,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
  Wallet,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

/* =========================================================
   TYPES
========================================================= */

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

type NavigationItem = {
  label: string;
  href: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  exact?: boolean;
};

type NavigationGroup = {
  id: string;
  label: string;
  items: NavigationItem[];
};

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

type QuickAction = {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
};

/* =========================================================
   MAIN MOBILE MENU
========================================================= */

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] =
    useState("");

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [systemOpen, setSystemOpen] =
    useState(true);

  const [marketOpen, setMarketOpen] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [connectionStatus, setConnectionStatus] =
    useState<
      "connected" | "connecting" | "offline"
    >("connected");

  /* =======================================================
     NAVIGATION DATA
  ======================================================= */

  const navigationGroups:
    NavigationGroup[] = useMemo(
      () => [
        {
          id: "command-center",
          label: "COMMAND CENTER",
          items: [
            {
              label: "Dashboard",
              href: "/",
              description:
                "Main NEXORA command center",
              icon: (
                <LayoutDashboard size={21} />
              ),
              exact: true,
            },
            {
              label: "AI Scanner",
              href: "/scanner",
              description:
                "Scan and analyze markets",
              badge: "AI",
              icon: (
                <ScanLine size={21} />
              ),
            },
            {
              label:
                "Market Intelligence",
              href: "/market",
              description:
                "Live market intelligence",
              icon: (
                <Radar size={21} />
              ),
            },
            {
              label: "Signals",
              href: "/signals",
              description:
                "AI generated signals",
              badge: "3",
              icon: (
                <Zap size={21} />
              ),
            },
          ],
        },

        {
          id: "ai-intelligence",
          label: "AI INTELLIGENCE",
          items: [
            {
              label:
                "Strategy Brain",
              href: "/strategy",
              description:
                "Multi-strategy analysis",
              badge: "AI",
              icon: (
                <BrainCircuit size={21} />
              ),
            },
            {
              label: "Risk Engine",
              href: "/risk",
              description:
                "Trade risk management",
              icon: (
                <ShieldCheck size={21} />
              ),
            },
            {
              label:
                "AI Automation",
              href: "/automation",
              description:
                "Automated workflows",
              icon: (
                <Workflow size={21} />
              ),
            },
            {
              label:
                "News Intelligence",
              href: "/intelligence",
              description:
                "Macro and market news",
              icon: (
                <Sparkles size={21} />
              ),
            },
          ],
        },

        {
          id: "trading-system",
          label: "TRADING SYSTEM",
          items: [
            {
              label: "Execution",
              href: "/execution",
              description:
                "Trading execution center",
              icon: (
                <Play size={21} />
              ),
            },
            {
              label: "Portfolio",
              href: "/portfolio",
              description:
                "Portfolio management",
              icon: (
                <Wallet size={21} />
              ),
            },
            {
              label: "Backtesting",
              href: "/backtesting",
              description:
                "Test trading strategies",
              icon: (
                <ChartCandlestick size={21} />
              ),
            },
            {
              label: "Analytics",
              href: "/analytics",
              description:
                "Performance analytics",
              icon: (
                <LineChart size={21} />
              ),
            },
          ],
        },
      ],
      []
    );

  /* =======================================================
     QUICK ACTIONS
  ======================================================= */

  const quickActions:
    QuickAction[] = useMemo(
      () => [
        {
          id: "scan",
          label: "Run AI Scanner",
          href: "/scanner",
          description:
            "Analyze selected markets",
          icon: (
            <ScanLine size={19} />
          ),
        },
        {
          id: "signal",
          label:
            "Generate Signal",
          href: "/signals",
          description:
            "Create AI market signal",
          icon: (
            <Zap size={19} />
          ),
        },
        {
          id: "risk",
          label: "Risk Check",
          href: "/risk",
          description:
            "Analyze position risk",
          icon: (
            <ShieldCheck size={19} />
          ),
        },
      ],
      []
    );

  /* =======================================================
     NOTIFICATIONS
  ======================================================= */

  const [notifications, setNotifications] =
    useState<NotificationItem[]>([
      {
        id: 1,
        title: "AI Scanner Ready",
        message:
          "Market scanner is connected and ready.",
        time: "Now",
        unread: true,
      },
      {
        id: 2,
        title: "New Market Signal",
        message:
          "XAU/USD analysis updated.",
        time: "5m ago",
        unread: true,
      },
      {
        id: 3,
        title: "Risk Alert",
        message:
          "Portfolio risk is within limits.",
        time: "12m ago",
        unread: true,
      },
    ]);

  /* =======================================================
     CLOSE ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [pathname]);

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    const handleKeyDown =
      (event: KeyboardEvent) => {
        if (
          event.key === "Escape"
        ) {
          onClose();
          setSearchOpen(false);
          setNotificationsOpen(false);
          setProfileOpen(false);
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    if (open) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =======================================================
     ACTIVE ROUTE CHECK
  ======================================================= */

  const isActive = (
    item: NavigationItem
  ) => {
    if (item.exact) {
      return pathname === item.href;
    }

    return (
      pathname === item.href ||
      pathname.startsWith(
        `${item.href}/`
      )
    );
  };

  /* =======================================================
     SEARCH RESULTS
  ======================================================= */

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const normalized =
      searchQuery.toLowerCase();

    const results:
      NavigationItem[] = [];

    navigationGroups.forEach(
      (group) => {
        group.items.forEach(
          (item) => {
            const matchesLabel =
              item.label
                .toLowerCase()
                .includes(normalized);

            const matchesDescription =
              item.description
                .toLowerCase()
                .includes(normalized);

            if (
              matchesLabel ||
              matchesDescription
            ) {
              results.push(item);
            }
          }
        );
      }
    );

    return results;
  }, [
    searchQuery,
    navigationGroups,
  ]);

  /* =======================================================
     REFRESH SYSTEM
  ======================================================= */

  const refreshSystem = () => {
    setRefreshing(true);
    setConnectionStatus(
      "connecting"
    );

    window.setTimeout(() => {
      setConnectionStatus(
        "connected"
      );
      setRefreshing(false);
    }, 1000);
  };

  /* =======================================================
     MARK NOTIFICATIONS READ
  ======================================================= */

  const markAllRead = () => {
    setNotifications((previous) =>
      previous.map(
        (notification) => ({
          ...notification,
          unread: false,
        })
      )
    );
  };

  /* =======================================================
     UNREAD COUNT
  ======================================================= */

  const unreadCount =
    notifications.filter(
      (notification) =>
        notification.unread
    ).length;

  /* =======================================================
     NAVIGATION HANDLER
  ======================================================= */

  const handleNavigation = () => {
    setSearchOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);

    window.setTimeout(() => {
      onClose();
    }, 100);
  };

  /* =======================================================
     MAIN RENDER
  ======================================================= */

  return (
    <>
      {/* ================================================
          MOBILE OVERLAY
      ================================================= */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[90]
          bg-black/75
          backdrop-blur-sm
          transition-all
          duration-300
          lg:hidden
          ${
            open
              ? "opacity-100 visible"
              : "pointer-events-none opacity-0 invisible"
          }
        `}
      />

      {/* ================================================
          MOBILE DRAWER
      ================================================= */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-[100]
          flex
          h-[100dvh]
          w-[88vw]
          max-w-[380px]
          flex-col
          overflow-hidden
          border-r
          border-white/10
          bg-[#080b12]
          shadow-[30px_0_80px_rgba(0,0,0,0.55)]
          transition-transform
          duration-300
          ease-out
          lg:hidden
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ==============================================
            BACKGROUND EFFECTS
        =============================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              -top-24
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
              top-1/2
              -right-32
              h-72
              w-72
              rounded-full
              bg-purple-500/10
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-1/4
              h-52
              w-52
              rounded-full
              bg-blue-500/5
              blur-3xl
            "
          />
        </div>

        {/* ==============================================
            TOP HEADER
        =============================================== */}

        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-4
            py-4
          "
        >
          {/* BRAND */}

          <Link
            href="/"
            onClick={handleNavigation}
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/25
                bg-gradient-to-br
                from-cyan-400/20
                via-blue-500/15
                to-purple-500/20
                shadow-lg
                shadow-cyan-500/10
              "
            >
              <Bot
                size={23}
                className="
                  text-cyan-300
                "
              />
            </div>

            <div>
              <div
                className="
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
                  text-[9px]
                  font-semibold
                  tracking-[0.18em]
                  text-cyan-400/70
                "
              >
                AI TRADING OS
              </div>
            </div>
          </Link>

          {/* CLOSE */}

          <button
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              text-slate-400
              transition
              active:scale-95
              hover:border-red-400/30
              hover:bg-red-400/[0.08]
              hover:text-red-300
            "
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        {/* ==============================================
            SYSTEM STATUS
        =============================================== */}

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
              rounded-2xl
              border
              border-cyan-400/10
              bg-gradient-to-r
              from-cyan-400/[0.08]
              via-blue-500/[0.04]
              to-purple-500/[0.06]
              p-3.5
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Cpu
                  size={15}
                  className="
                    text-cyan-400
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    tracking-[0.15em]
                    text-slate-500
                  "
                >
                  NEXORA SYSTEM
                </span>
              </div>

              <button
                onClick={refreshSystem}
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition
                  hover:bg-white/[0.05]
                  hover:text-cyan-300
                "
              >
                <RefreshCw
                  size={14}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>
            </div>

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2.5
                "
              >
                <span
                  className={`
                    relative
                    flex
                    h-2.5
                    w-2.5
                    rounded-full
                    ${
                      connectionStatus ===
                      "connected"
                        ? "bg-emerald-400"
                        : connectionStatus ===
                          "connecting"
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }
                  `}
                >
                  {connectionStatus ===
                    "connected" && (
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

                <div>
                  <div
                    className="
                      text-sm
                      font-semibold
                      text-slate-200
                    "
                  >
                    {connectionStatus ===
                    "connected"
                      ? "All Systems Online"
                      : connectionStatus ===
                        "connecting"
                      ? "Reconnecting..."
                      : "System Offline"}
                  </div>

                  <div
                    className="
                      mt-0.5
                      text-[10px]
                      text-slate-600
                    "
                  >
                    AI engines operational
                  </div>
                </div>
              </div>

              <span
                className={`
                  rounded-full
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  ${
                    connectionStatus ===
                    "connected"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : connectionStatus ===
                        "connecting"
                      ? "bg-yellow-400/10 text-yellow-300"
                      : "bg-red-400/10 text-red-300"
                  }
                `}
              >
                {connectionStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* ==============================================
            SEARCH
        =============================================== */}

        <div
          className="
            relative
            z-20
            px-4
            pt-4
          "
        >
          <div
            className="
              relative
              flex
              items-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.025]
              transition
              focus-within:border-cyan-400/30
              focus-within:bg-cyan-400/[0.03]
            "
          >
            <Search
              size={18}
              className="
                ml-3
                shrink-0
                text-slate-600
              "
            />

            <input
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(
                  event.target.value
                );

                setSearchOpen(true);
              }}
              onFocus={() =>
                setSearchOpen(true)
              }
              placeholder="Search NEXORA..."
              className="
                h-12
                w-full
                bg-transparent
                px-3
                text-sm
                text-slate-200
                outline-none
                placeholder:text-slate-600
              "
            />

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchOpen(false);
                }}
                className="
                  mr-2
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* SEARCH RESULTS */}

          {searchOpen &&
            searchQuery.trim() && (
              <div
                className="
                  absolute
                  left-4
                  right-4
                  top-[calc(100%+8px)]
                  max-h-[50vh]
                  overflow-y-auto
                  rounded-xl
                  border
                  border-white/10
                  bg-[#10141e]
                  p-2
                  shadow-2xl
                  shadow-black/60
                "
              >
                {searchResults.length >
                0 ? (
                  searchResults.map(
                    (item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={
                          handleNavigation
                        }
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-lg
                          px-3
                          py-3
                          transition
                          hover:bg-cyan-400/[0.06]
                        "
                      >
                        <span
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-cyan-400/[0.08]
                            text-cyan-400
                          "
                        >
                          {item.icon}
                        </span>

                        <div className="min-w-0">
                          <div
                            className="
                              truncate
                              text-sm
                              font-medium
                              text-slate-200
                            "
                          >
                            {item.label}
                          </div>

                          <div
                            className="
                              mt-0.5
                              truncate
                              text-[10px]
                              text-slate-600
                            "
                          >
                            {
                              item.description
                            }
                          </div>
                        </div>
                      </Link>
                    )
                  )
                ) : (
                  <div
                    className="
                      px-4
                      py-8
                      text-center
                    "
                  >
                    <Search
                      size={24}
                      className="
                        mx-auto
                        text-slate-700
                      "
                    />

                    <div
                      className="
                        mt-3
                        text-sm
                        text-slate-500
                      "
                    >
                      No results found
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>

        {/* ==============================================
            SCROLLABLE CONTENT
        =============================================== */}

        <div
          className="
            relative
            z-10
            flex-1
            overflow-y-auto
            px-4
            pb-6
            pt-5
          "
        >
          {/* ============================================
              QUICK ACTIONS
          ============================================= */}

          <div>
            <div
              className="
                mb-3
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  tracking-[0.16em]
                  text-slate-600
                "
              >
                QUICK ACTIONS
              </span>

              <Zap
                size={14}
                className="
                  text-cyan-400/50
                "
              />
            </div>

            <div
              className="
                grid
                grid-cols-3
                gap-2
              "
            >
              {quickActions.map(
                (action) => (
                  <Link
                    key={action.id}
                    href={action.href}
                    onClick={
                      handleNavigation
                    }
                    className="
                      group
                      flex
                      min-h-[90px]
                      flex-col
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/[0.07]
                      bg-white/[0.025]
                      p-2
                      text-center
                      transition
                      active:scale-[0.97]
                      hover:border-cyan-400/20
                      hover:bg-cyan-400/[0.05]
                    "
                  >
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-cyan-400/[0.08]
                        text-cyan-400
                        transition
                        group-hover:bg-cyan-400/[0.12]
                      "
                    >
                      {action.icon}
                    </span>

                    <span
                      className="
                        mt-2
                        text-[10px]
                        font-semibold
                        leading-tight
                        text-slate-400
                        group-hover:text-slate-200
                      "
                    >
                      {action.label}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* ============================================
              NAVIGATION GROUPS
          ============================================= */}

          <div className="mt-7">
            {navigationGroups.map(
              (group, groupIndex) => (
                <div
                  key={group.id}
                  className={
                    groupIndex > 0
                      ? "mt-7"
                      : ""
                  }
                >
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        px-1
                        text-[10px]
                        font-bold
                        tracking-[0.16em]
                        text-slate-600
                      "
                    >
                      {group.label}
                    </span>

                    <span
                      className="
                        text-[9px]
                        text-slate-700
                      "
                    >
                      {
                        group.items
                          .length
                      }
                    </span>
                  </div>

                  <div className="space-y-1">
                    {group.items.map(
                      (item) => {
                        const active =
                          isActive(item);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={
                              handleNavigation
                            }
                            className={`
                              group
                              relative
                              flex
                              min-h-[64px]
                              items-center
                              gap-3
                              rounded-xl
                              border
                              px-3
                              py-3
                              transition-all
                              active:scale-[0.985]
                              ${
                                active
                                  ? `
                                    border-cyan-400/15
                                    bg-gradient-to-r
                                    from-cyan-400/[0.12]
                                    to-blue-500/[0.04]
                                  `
                                  : `
                                    border-transparent
                                    hover:border-white/[0.05]
                                    hover:bg-white/[0.03]
                                  `
                              }
                            `}
                          >
                            {active && (
                              <span
                                className="
                                  absolute
                                  left-0
                                  top-1/2
                                  h-8
                                  w-[3px]
                                  -translate-y-1/2
                                  rounded-r-full
                                  bg-cyan-400
                                  shadow-lg
                                  shadow-cyan-400/50
                                "
                              />
                            )}

                            <span
                              className={`
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                transition
                                ${
                                  active
                                    ? `
                                      bg-cyan-400/15
                                      text-cyan-300
                                    `
                                    : `
                                      bg-white/[0.025]
                                      text-slate-500
                                      group-hover:text-slate-300
                                    `
                                }
                              `}
                            >
                              {
                                item.icon
                              }
                            </span>

                            <div className="min-w-0 flex-1">
                              <div
                                className={`
                                  truncate
                                  text-sm
                                  font-semibold
                                  ${
                                    active
                                      ? "text-cyan-100"
                                      : "text-slate-400"
                                  }
                                `}
                              >
                                {
                                  item.label
                                }
                              </div>

                              <div
                                className="
                                  mt-0.5
                                  truncate
                                  text-[10px]
                                  text-slate-600
                                "
                              >
                                {
                                  item.description
                                }
                              </div>
                            </div>

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >
                              {item.badge && (
                                <span
                                  className="
                                    rounded-md
                                    bg-purple-400/10
                                    px-1.5
                                    py-0.5
                                    text-[8px]
                                    font-bold
                                    text-purple-300
                                  "
                                >
                                  {
                                    item.badge
                                  }
                                </span>
                              )}

                              <ChevronRight
                                size={16}
                                className={`
                                  transition
                                  ${
                                    active
                                      ? "text-cyan-400"
                                      : "text-slate-700"
                                  }
                                `}
                              />
                            </div>
                          </Link>
                        );
                      }
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {/* ============================================
              LIVE MARKET STATUS
          ============================================= */}

          <div className="mt-7">
            <button
              onClick={() =>
                setMarketOpen(
                  !marketOpen
                )
              }
              className="
                flex
                w-full
                items-center
                justify-between
                px-1
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Activity
                  size={15}
                  className="
                    text-cyan-400
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    tracking-[0.16em]
                    text-slate-600
                  "
                >
                  LIVE MARKETS
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`
                  text-slate-600
                  transition-transform
                  ${
                    marketOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {marketOpen && (
              <div
                className="
                  mt-3
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.02]
                "
              >
                <MobileMarketRow
                  symbol="XAU/USD"
                  price="2,354.81"
                  change="+1.16%"
                  positive
                />

                <MobileMarketRow
                  symbol="EUR/USD"
                  price="1.0841"
                  change="+0.26%"
                  positive
                />

                <MobileMarketRow
                  symbol="BTC/USD"
                  price="67,408"
                  change="+3.00%"
                  positive
                />

                <MobileMarketRow
                  symbol="GBP/USD"
                  price="1.2779"
                  change="-0.51%"
                  positive={false}
                />

                <Link
                  href="/market"
                  onClick={
                    handleNavigation
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    border-t
                    border-white/[0.06]
                    py-3
                    text-[10px]
                    font-semibold
                    text-cyan-400
                    hover:bg-cyan-400/[0.04]
                  "
                >
                  Open Market Intelligence

                  <ChevronRight
                    size={14}
                  />
                </Link>
              </div>
            )}
          </div>

          {/* ============================================
              AI ENGINE STATUS
          ============================================= */}

          <div className="mt-7">
            <div
              className="
                mb-3
                flex
                items-center
                gap-2
              "
            >
              <Database
                size={15}
                className="
                  text-purple-400
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  tracking-[0.16em]
                  text-slate-600
                "
              >
                AI ENGINE STATUS
              </span>
            </div>

            <div
              className="
                space-y-2
                rounded-xl
                border
                border-white/[0.07]
                bg-white/[0.02]
                p-3
              "
            >
              <EngineStatusRow
                label="Market Scanner"
                status="Online"
                online
              />

              <EngineStatusRow
                label="Strategy Brain"
                status="Online"
                online
              />

              <EngineStatusRow
                label="Risk Engine"
                status="Ready"
                online
              />

              <EngineStatusRow
                label="Data Gateway"
                status="Live"
                online
              />
            </div>
          </div>
        </div>

        {/* ==============================================
            BOTTOM CONTROLS
        =============================================== */}

        <div
          className="
            relative
            z-20
            border-t
            border-white/10
            bg-[#090c13]/95
            p-3
            backdrop-blur-xl
          "
        >
          {/* ============================================
              NOTIFICATIONS BUTTON
          ============================================= */}

          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(
                  !notificationsOpen
                );

                setProfileOpen(false);
              }}
              className="
                mb-2
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-slate-400
                transition
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              <div
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-white/[0.03]
                "
              >
                <Bell size={18} />

                {unreadCount > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-4
                      min-w-4
                      items-center
                      justify-center
                      rounded-full
                      bg-red-400
                      px-1
                      text-[8px]
                      font-bold
                      text-white
                    "
                  >
                    {unreadCount}
                  </span>
                )}
              </div>

              <span
                className="
                  flex-1
                  text-left
                  text-sm
                  font-medium
                "
              >
                Notifications
              </span>

              <ChevronRight
                size={16}
                className="
                  text-slate-600
                "
              />
            </button>

            {/* NOTIFICATIONS PANEL */}

            {notificationsOpen && (
              <div
                className="
                  absolute
                  bottom-[calc(100%+8px)]
                  left-0
                  right-0
                  max-h-[45vh]
                  overflow-y-auto
                  rounded-xl
                  border
                  border-white/10
                  bg-[#10141e]
                  p-2
                  shadow-2xl
                  shadow-black/60
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    px-2
                    py-2
                  "
                >
                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-200
                    "
                  >
                    Notifications
                  </span>

                  <button
                    onClick={
                      markAllRead
                    }
                    className="
                      text-[9px]
                      font-medium
                      text-cyan-400
                    "
                  >
                    Mark all read
                  </button>
                </div>

                {notifications.map(
                  (
                    notification
                  ) => (
                    <div
                      key={
                        notification.id
                      }
                      className={`
                        rounded-lg
                        p-3
                        ${
                          notification.unread
                            ? "bg-cyan-400/[0.04]"
                            : ""
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          gap-2
                        "
                      >
                        <span
                          className="
                            mt-1
                            h-2
                            w-2
                            shrink-0
                            rounded-full
                            bg-cyan-400
                          "
                        />

                        <div className="min-w-0">
                          <div
                            className="
                              text-xs
                              font-semibold
                              text-slate-200
                            "
                          >
                            {
                              notification.title
                            }
                          </div>

                          <div
                            className="
                              mt-1
                              text-[10px]
                              leading-relaxed
                              text-slate-500
                            "
                          >
                            {
                              notification.message
                            }
                          </div>

                          <div
                            className="
                              mt-1.5
                              text-[8px]
                              text-slate-700
                            "
                          >
                            {
                              notification.time
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* ============================================
              SYSTEM CONTROLS
          ============================================= */}

          <button
            onClick={() =>
              setSystemOpen(
                !systemOpen
              )
            }
            className="
              mb-2
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-slate-400
              transition
              hover:bg-white/[0.04]
              hover:text-white
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-white/[0.03]
              "
            >
              <Settings size={18} />
            </div>

            <span
              className="
                flex-1
                text-left
                text-sm
                font-medium
              "
            >
              System Controls
            </span>

            <ChevronDown
              size={16}
              className={`
                text-slate-600
                transition-transform
                ${
                  systemOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {systemOpen && (
            <div
              className="
                mb-2
                space-y-1
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                p-2
              "
            >
              <Link
                href="/settings"
                onClick={
                  handleNavigation
                }
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-xs
                  text-slate-500
                  transition
                  hover:bg-white/[0.04]
                  hover:text-slate-200
                "
              >
                <Settings
                  size={16}
                />

                Settings
              </Link>

              <button
                onClick={() => {
                  alert(
                    "Theme system will be connected in the main layout."
                  );
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-xs
                  text-slate-500
                  transition
                  hover:bg-white/[0.04]
                  hover:text-slate-200
                "
              >
                <Moon size={16} />

                Appearance
              </button>

              <Link
                href="/portfolio"
                onClick={
                  handleNavigation
                }
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-xs
                  text-slate-500
                  transition
                  hover:bg-white/[0.04]
                  hover:text-slate-200
                "
              >
                <CircleDollarSign
                  size={16}
                />

                Account
              </Link>
            </div>
          )}

          {/* ============================================
              PROFILE
          ============================================= */}

          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(
                  !profileOpen
                );

                setNotificationsOpen(
                  false
                );
              }}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-2.5
                transition
                hover:border-cyan-400/20
                hover:bg-white/[0.05]
              "
            >
              <div
                className="
                  relative
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-cyan-400
                  via-blue-500
                  to-purple-500
                  text-sm
                  font-bold
                  text-white
                "
              >
                Z

                <span
                  className="
                    absolute
                    -bottom-0.5
                    -right-0.5
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-[#090c13]
                    bg-emerald-400
                  "
                />
              </div>

              <div className="min-w-0 flex-1 text-left">
                <div
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-slate-200
                  "
                >
                  NEXORA Operator
                </div>

                <div
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                    text-slate-600
                  "
                >
                  Premium Access
                </div>
              </div>

              <ChevronDown
                size={16}
                className={`
                  text-slate-600
                  transition-transform
                  ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {/* PROFILE DROPDOWN */}

            {profileOpen && (
              <div
                className="
                  absolute
                  bottom-[calc(100%+8px)]
                  left-0
                  right-0
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/10
                  bg-[#10141e]
                  p-2
                  shadow-2xl
                  shadow-black/60
                "
              >
                <Link
                  href="/profile"
                  onClick={
                    handleNavigation
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-3
                    text-xs
                    text-slate-400
                    transition
                    hover:bg-white/[0.04]
                    hover:text-white
                  "
                >
                  <User size={16} />

                  My Profile
                </Link>

                <Link
                  href="/portfolio"
                  onClick={
                    handleNavigation
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-3
                    text-xs
                    text-slate-400
                    transition
                    hover:bg-white/[0.04]
                    hover:text-white
                  "
                >
                  <BriefcaseBusiness
                    size={16}
                  />

                  Trading Account
                </Link>

                <div
                  className="
                    my-1
                    h-px
                    bg-white/[0.06]
                  "
                />

                <button
                  onClick={() => {
                    alert(
                      "Authentication logout will be connected later."
                    );
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-3
                    text-left
                    text-xs
                    text-red-400
                    transition
                    hover:bg-red-400/[0.07]
                  "
                >
                  <X size={16} />

                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   MOBILE MARKET ROW
========================================================= */

type MobileMarketRowProps = {
  symbol: string;
  price: string;
  change: string;
  positive: boolean;
};

function MobileMarketRow({
  symbol,
  price,
  change,
  positive,
}: MobileMarketRowProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-white/[0.05]
        px-3
        py-3
        last:border-b-0
      "
    >
      <div>
        <div
          className="
            text-xs
            font-semibold
            text-slate-300
          "
        >
          {symbol}
        </div>

        <div
          className="
            mt-0.5
            text-[10px]
            text-slate-600
          "
        >
          Live Market Price
        </div>
      </div>

      <div className="text-right">
        <div
          className="
            text-xs
            font-semibold
            text-slate-200
          "
        >
          {price}
        </div>

        <div
          className={`
            mt-0.5
            flex
            items-center
            justify-end
            gap-1
            text-[9px]
            font-semibold
            ${
              positive
                ? "text-emerald-400"
                : "text-red-400"
            }
          `}
        >
          <TrendingUp
            size={11}
            className={
              positive
                ? ""
                : "rotate-180"
            }
          />

          {change}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ENGINE STATUS ROW
========================================================= */

type EngineStatusRowProps = {
  label: string;
  status: string;
  online: boolean;
};

function EngineStatusRow({
  label,
  status,
  online,
}: EngineStatusRowProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <div
        className="
          flex
          items-center
          gap-2.5
        "
      >
        <span
          className={`
            relative
            flex
            h-2
            w-2
            rounded-full
            ${
              online
                ? "bg-emerald-400"
                : "bg-red-400"
            }
          `}
        >
          {online && (
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
            text-[10px]
            text-slate-500
          "
        >
          {label}
        </span>
      </div>

      <span
        className={`
          text-[9px]
          font-semibold
          ${
            online
              ? "text-emerald-400"
              : "text-red-400"
          }
        `}
      >
        {status}
      </span>
    </div>
  );
}

/* =========================================================
   OPTIONAL HAMBURGER TRIGGER
========================================================= */

export function MobileMenuTrigger({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        text-slate-300
        transition
        active:scale-95
        hover:border-cyan-400/30
        hover:bg-cyan-400/[0.08]
        hover:text-cyan-300
        lg:hidden
      "
      aria-label="Open mobile menu"
    >
      <Menu size={21} />
    </button>
  );
}

/* =========================================================
   OPTIONAL COMPACT MOBILE STATUS
========================================================= */

export function MobileSystemStatus({
  status = "connected",
}: {
  status?:
    | "connected"
    | "connecting"
    | "offline";
}) {
  const config = {
    connected: {
      label: "ONLINE",
      dot: "bg-emerald-400",
      text: "text-emerald-400",
      background:
        "bg-emerald-400/[0.08]",
    },

    connecting: {
      label: "CONNECTING",
      dot: "bg-yellow-400",
      text: "text-yellow-400",
      background:
        "bg-yellow-400/[0.08]",
    },

    offline: {
      label: "OFFLINE",
      dot: "bg-red-400",
      text: "text-red-400",
      background:
        "bg-red-400/[0.08]",
    },
  };

  const current = config[status];

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        ${current.background}
      `}
    >
      <span
        className={`
          relative
          flex
          h-2
          w-2
          rounded-full
          ${current.dot}
        `}
      >
        {status ===
          "connected" && (
          <span
            className={`
              absolute
              inset-0
              animate-ping
              rounded-full
              ${current.dot}
              opacity-50
            `}
          />
        )}
      </span>

      <span
        className={`
          text-[9px]
          font-bold
          tracking-wide
          ${current.text}
        `}
      >
        {current.label}
      </span>
    </div>
  );
}
