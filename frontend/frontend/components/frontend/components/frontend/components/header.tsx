"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Bot,
  BrainCircuit,
  ChartCandlestick,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Command,
  Cpu,
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

import MobileMenu, {
  MobileMenuTrigger,
  MobileSystemStatus,
} from "./mobile-menu";

/* =========================================================
   TYPES
========================================================= */

type HeaderNavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
  exact?: boolean;
};

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type:
    | "signal"
    | "system"
    | "risk"
    | "market";
};

type CommandItem = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  keywords: string[];
};

/* =========================================================
   HEADER COMPONENT
========================================================= */

export default function Header() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [commandOpen, setCommandOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [connectionStatus, setConnectionStatus] =
    useState<
      "connected" | "connecting" | "offline"
    >("connected");

  /* =======================================================
     DESKTOP NAVIGATION
  ======================================================= */

  const navItems: HeaderNavItem[] =
    useMemo(
      () => [
        {
          label: "Dashboard",
          href: "/",
          icon: (
            <LayoutDashboard size={17} />
          ),
          description:
            "Main command center",
          exact: true,
        },

        {
          label: "AI Scanner",
          href: "/scanner",
          icon: (
            <ScanLine size={17} />
          ),
          description:
            "AI market analysis",
          badge: "AI",
        },

        {
          label: "Markets",
          href: "/market",
          icon: (
            <Radar size={17} />
          ),
          description:
            "Live market intelligence",
        },

        {
          label: "Signals",
          href: "/signals",
          icon: (
            <Zap size={17} />
          ),
          description:
            "AI trading signals",
          badge: "3",
        },

        {
          label: "Analytics",
          href: "/analytics",
          icon: (
            <LineChart size={17} />
          ),
          description:
            "Performance analysis",
        },
      ],
      []
    );

  /* =======================================================
     COMMAND PALETTE ITEMS
  ======================================================= */

  const commandItems: CommandItem[] =
    useMemo(
      () => [
        {
          id: "dashboard",
          label: "Open Dashboard",
          description:
            "Go to the main NEXORA command center",
          href: "/",
          icon: (
            <LayoutDashboard size={18} />
          ),
          keywords: [
            "dashboard",
            "home",
            "command",
          ],
        },

        {
          id: "scanner",
          label: "Run AI Scanner",
          description:
            "Analyze forex and financial markets",
          href: "/scanner",
          icon: (
            <ScanLine size={18} />
          ),
          keywords: [
            "scan",
            "scanner",
            "ai",
            "analysis",
          ],
        },

        {
          id: "signals",
          label: "Open Trading Signals",
          description:
            "View AI generated signals",
          href: "/signals",
          icon: (
            <Zap size={18} />
          ),
          keywords: [
            "signal",
            "trade",
            "buy",
            "sell",
          ],
        },

        {
          id: "market",
          label: "Market Intelligence",
          description:
            "View live market data",
          href: "/market",
          icon: (
            <Radar size={18} />
          ),
          keywords: [
            "market",
            "forex",
            "gold",
            "btc",
          ],
        },

        {
          id: "strategy",
          label: "Strategy Brain",
          description:
            "AI strategy intelligence",
          href: "/strategy",
          icon: (
            <BrainCircuit size={18} />
          ),
          keywords: [
            "strategy",
            "brain",
            "ai",
          ],
        },

        {
          id: "risk",
          label: "Risk Engine",
          description:
            "Analyze trading risk",
          href: "/risk",
          icon: (
            <ShieldCheck size={18} />
          ),
          keywords: [
            "risk",
            "loss",
            "drawdown",
          ],
        },

        {
          id: "execution",
          label: "Execution Center",
          description:
            "Trading execution control",
          href: "/execution",
          icon: (
            <Play size={18} />
          ),
          keywords: [
            "execution",
            "trade",
            "order",
          ],
        },

        {
          id: "portfolio",
          label: "Portfolio",
          description:
            "Manage trading portfolio",
          href: "/portfolio",
          icon: (
            <Wallet size={18} />
          ),
          keywords: [
            "portfolio",
            "account",
            "balance",
          ],
        },

        {
          id: "backtesting",
          label: "Backtesting",
          description:
            "Test trading strategies",
          href: "/backtesting",
          icon: (
            <ChartCandlestick size={18} />
          ),
          keywords: [
            "backtest",
            "testing",
            "strategy",
          ],
        },

        {
          id: "automation",
          label: "AI Automation",
          description:
            "Manage automated workflows",
          href: "/automation",
          icon: (
            <Workflow size={18} />
          ),
          keywords: [
            "automation",
            "workflow",
            "bot",
          ],
        },
      ],
      []
    );

  /* =======================================================
     NOTIFICATIONS
  ======================================================= */

  const [notifications, setNotifications] =
    useState<Notification[]>([
      {
        id: 1,
        title: "AI Signal Generated",
        message:
          "New XAU/USD bullish analysis is available.",
        time: "2m ago",
        unread: true,
        type: "signal",
      },

      {
        id: 2,
        title: "Scanner Complete",
        message:
          "Market scanning cycle completed successfully.",
        time: "8m ago",
        unread: true,
        type: "market",
      },

      {
        id: 3,
        title: "Risk Engine Active",
        message:
          "Portfolio risk remains within configured limits.",
        time: "15m ago",
        unread: false,
        type: "risk",
      },

      {
        id: 4,
        title: "System Online",
        message:
          "NEXORA AI services are operational.",
        time: "24m ago",
        unread: false,
        type: "system",
      },
    ]);

  /* =======================================================
     SCROLL EFFECT
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 10
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     KEYBOARD SHORTCUTS
  ======================================================= */

  useEffect(() => {
    const handleKeyDown =
      (event: KeyboardEvent) => {
        const isCommandKey =
          event.metaKey ||
          event.ctrlKey;

        if (
          isCommandKey &&
          event.key.toLowerCase() === "k"
        ) {
          event.preventDefault();

          setCommandOpen(
            (previous) => !previous
          );

          setSearchOpen(false);
          setNotificationsOpen(false);
          setProfileOpen(false);
        }

        if (
          event.key === "Escape"
        ) {
          setSearchOpen(false);
          setNotificationsOpen(false);
          setProfileOpen(false);
          setCommandOpen(false);
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
  }, []);

  /* =======================================================
     CLOSE DROPDOWNS ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setSearchOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
    setCommandOpen(false);
  }, [pathname]);

  /* =======================================================
     BODY LOCK FOR COMMAND PALETTE
  ======================================================= */

  useEffect(() => {
    if (commandOpen) {
      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [commandOpen]);

  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const isActive = (
    item: HeaderNavItem
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
      return commandItems.slice(0, 6);
    }

    const query =
      searchQuery.toLowerCase();

    return commandItems.filter(
      (item) => {
        const labelMatch =
          item.label
            .toLowerCase()
            .includes(query);

        const descriptionMatch =
          item.description
            .toLowerCase()
            .includes(query);

        const keywordMatch =
          item.keywords.some(
            (keyword) =>
              keyword.includes(query)
          );

        return (
          labelMatch ||
          descriptionMatch ||
          keywordMatch
        );
      }
    );
  }, [
    searchQuery,
    commandItems,
  ]);

  /* =======================================================
     UNREAD NOTIFICATIONS
  ======================================================= */

  const unreadCount =
    notifications.filter(
      (item) => item.unread
    ).length;

  /* =======================================================
     REFRESH SYSTEM
  ======================================================= */

  const refreshSystem = () => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);

    setConnectionStatus(
      "connecting"
    );

    window.setTimeout(() => {
      setConnectionStatus(
        "connected"
      );

      setRefreshing(false);
    }, 1200);
  };

  /* =======================================================
     MARK ALL READ
  ======================================================= */

  const markAllRead = () => {
    setNotifications(
      (previous) =>
        previous.map(
          (notification) => ({
            ...notification,
            unread: false,
          })
        )
    );
  };

  /* =======================================================
     CLOSE ALL PANELS
  ======================================================= */

  const closePanels = () => {
    setSearchOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  /* =======================================================
     NOTIFICATION ICON
  ======================================================= */

  const getNotificationIcon = (
    type: Notification["type"]
  ) => {
    switch (type) {
      case "signal":
        return (
          <Zap
            size={15}
            className="
              text-yellow-400
            "
          />
        );

      case "market":
        return (
          <TrendingUp
            size={15}
            className="
              text-cyan-400
            "
          />
        );

      case "risk":
        return (
          <ShieldCheck
            size={15}
            className="
              text-emerald-400
            "
          />
        );

      case "system":
        return (
          <Cpu
            size={15}
            className="
              text-purple-400
            "
          />
        );

      default:
        return (
          <Bell size={15} />
        );
    }
  };

  /* =======================================================
     HEADER
  ======================================================= */

  return (
    <>
      <header
        className={`
          sticky
          top-0
          z-[80]
          w-full
          border-b
          transition-all
          duration-300
          ${
            scrolled
              ? `
                border-white/10
                bg-[#090c13]/95
                shadow-xl
                shadow-black/30
                backdrop-blur-2xl
              `
              : `
                border-white/[0.06]
                bg-[#090c13]/85
                backdrop-blur-xl
              `
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[70px]
            max-w-[1800px]
            items-center
            gap-3
            px-3
            sm:px-4
            lg:px-6
          "
        >
          {/* ============================================
              MOBILE MENU BUTTON
          ============================================= */}

          <MobileMenuTrigger
            onClick={() => {
              setMobileMenuOpen(true);
              closePanels();
            }}
          />

          {/* ============================================
              LOGO
          ============================================= */}

          <Link
            href="/"
            onClick={closePanels}
            className="
              flex
              shrink-0
              items-center
              gap-2.5
            "
          >
            <div
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-cyan-400/20
                bg-gradient-to-br
                from-cyan-400/20
                via-blue-500/15
                to-purple-500/20
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-tr
                  from-transparent
                  via-white/[0.08]
                  to-transparent
                "
              />

              <Bot
                size={22}
                className="
                  relative
                  text-cyan-300
                "
              />
            </div>

            <div className="hidden sm:block">
              <div
                className="
                  text-base
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
                  text-[8px]
                  font-bold
                  tracking-[0.18em]
                  text-cyan-400/70
                "
              >
                AI TRADING OS
              </div>
            </div>
          </Link>

          {/* ============================================
              DESKTOP NAVIGATION
          ============================================= */}

          <nav
            className="
              ml-4
              hidden
              items-center
              gap-1
              xl:flex
            "
          >
            {navItems.map(
              (item) => {
                const active =
                  isActive(item);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closePanels}
                    className={`
                      relative
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      transition-all
                      ${
                        active
                          ? `
                            bg-cyan-400/[0.09]
                            text-cyan-300
                          `
                          : `
                            text-slate-500
                            hover:bg-white/[0.04]
                            hover:text-slate-200
                          `
                      }
                    `}
                  >
                    <span
                      className={`
                        ${
                          active
                            ? "text-cyan-400"
                            : ""
                        }
                      `}
                    >
                      {item.icon}
                    </span>

                    <span>
                      {item.label}
                    </span>

                    {item.badge && (
                      <span
                        className={`
                          rounded-md
                          px-1.5
                          py-0.5
                          text-[8px]
                          font-bold
                          ${
                            item.badge ===
                            "AI"
                              ? `
                                bg-purple-400/10
                                text-purple-300
                              `
                              : `
                                bg-cyan-400/10
                                text-cyan-300
                              `
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}

                    {active && (
                      <span
                        className="
                          absolute
                          bottom-0
                          left-1/2
                          h-[2px]
                          w-8
                          -translate-x-1/2
                          rounded-full
                          bg-cyan-400
                          shadow-lg
                          shadow-cyan-400/50
                        "
                      />
                    )}
                  </Link>
                );
              }
            )}
          </nav>

          {/* ============================================
              SPACER
          ============================================= */}

          <div className="flex-1" />

          {/* ============================================
              SYSTEM STATUS
          ============================================= */}

          <div className="hidden lg:block">
            <MobileSystemStatus
              status={
                connectionStatus
              }
            />
          </div>

          {/* ============================================
              GLOBAL SEARCH BUTTON
          ============================================= */}

          <button
            onClick={() => {
              setCommandOpen(true);
              closePanels();
            }}
            className="
              hidden
              h-10
              min-w-[190px]
              items-center
              justify-between
              gap-4
              rounded-xl
              border
              border-white/10
              bg-white/[0.025]
              px-3
              text-slate-600
              transition
              hover:border-cyan-400/20
              hover:bg-cyan-400/[0.04]
              xl:flex
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Search size={16} />

              <span
                className="
                  text-xs
                "
              >
                Search NEXORA
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-1
              "
            >
              <kbd
                className="
                  rounded
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-1.5
                  py-0.5
                  text-[9px]
                "
              >
                Ctrl
              </kbd>

              <kbd
                className="
                  rounded
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-1.5
                  py-0.5
                  text-[9px]
                "
              >
                K
              </kbd>
            </div>
          </button>

          {/* ============================================
              MOBILE SEARCH
          ============================================= */}

          <button
            onClick={() => {
              setCommandOpen(true);
              closePanels();
            }}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.025]
              text-slate-500
              transition
              hover:border-cyan-400/20
              hover:bg-cyan-400/[0.05]
              hover:text-cyan-300
              xl:hidden
            "
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* ============================================
              REFRESH
          ============================================= */}

          <button
            onClick={refreshSystem}
            className="
              hidden
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.025]
              text-slate-500
              transition
              hover:border-cyan-400/20
              hover:bg-cyan-400/[0.05]
              hover:text-cyan-300
              md:flex
            "
            aria-label="Refresh system"
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />
          </button>

          {/* ============================================
              NOTIFICATIONS
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
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.025]
                text-slate-500
                transition
                hover:border-cyan-400/20
                hover:bg-cyan-400/[0.05]
                hover:text-cyan-300
              "
              aria-label="Notifications"
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
                    border-2
                    border-[#090c13]
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
            </button>

            {/* NOTIFICATION PANEL */}

            {notificationsOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+12px)]
                  z-[120]
                  w-[340px]
                  max-w-[calc(100vw-24px)]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#0d1119]/98
                  shadow-2xl
                  shadow-black/60
                  backdrop-blur-2xl
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/[0.06]
                    px-4
                    py-4
                  "
                >
                  <div>
                    <div
                      className="
                        text-sm
                        font-semibold
                        text-slate-100
                      "
                    >
                      Notifications
                    </div>

                    <div
                      className="
                        mt-0.5
                        text-[10px]
                        text-slate-600
                      "
                    >
                      System and market activity
                    </div>
                  </div>

                  <button
                    onClick={
                      markAllRead
                    }
                    className="
                      text-[10px]
                      font-semibold
                      text-cyan-400
                      hover:text-cyan-300
                    "
                  >
                    Mark all read
                  </button>
                </div>

                <div
                  className="
                    max-h-[420px]
                    overflow-y-auto
                    p-2
                  "
                >
                  {notifications.map(
                    (
                      notification
                    ) => (
                      <div
                        key={
                          notification.id
                        }
                        className={`
                          flex
                          gap-3
                          rounded-xl
                          p-3
                          transition
                          hover:bg-white/[0.03]
                          ${
                            notification.unread
                              ? "bg-cyan-400/[0.025]"
                              : ""
                          }
                        `}
                      >
                        <span
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-white/[0.035]
                          "
                        >
                          {getNotificationIcon(
                            notification.type
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-2
                            "
                          >
                            <span
                              className="
                                text-xs
                                font-semibold
                                text-slate-200
                              "
                            >
                              {
                                notification.title
                              }
                            </span>

                            {notification.unread && (
                              <span
                                className="
                                  mt-1
                                  h-1.5
                                  w-1.5
                                  shrink-0
                                  rounded-full
                                  bg-cyan-400
                                "
                              />
                            )}
                          </div>

                          <p
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
                          </p>

                          <div
                            className="
                              mt-2
                              text-[9px]
                              text-slate-700
                            "
                          >
                            {
                              notification.time
                            }
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <Link
                  href="/notifications"
                  onClick={() =>
                    setNotificationsOpen(
                      false
                    )
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    border-t
                    border-white/[0.06]
                    py-3.5
                    text-[10px]
                    font-semibold
                    text-cyan-400
                    hover:bg-cyan-400/[0.04]
                  "
                >
                  View all notifications

                  <ChevronRight
                    size={14}
                  />
                </Link>
              </div>
            )}
          </div>

          {/* ============================================
              PROFILE
          ============================================= */}

          <div
            className="
              relative
              hidden
              sm:block
            "
          >
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
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.025]
                p-1.5
                pl-2
                transition
                hover:border-cyan-400/20
                hover:bg-white/[0.04]
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-gradient-to-br
                  from-cyan-400
                  via-blue-500
                  to-purple-500
                  text-xs
                  font-bold
                  text-white
                "
              >
                Z
              </div>

              <ChevronDown
                size={15}
                className={`
                  mr-1
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
                  right-0
                  top-[calc(100%+12px)]
                  z-[120]
                  w-[260px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#0d1119]/98
                  p-2
                  shadow-2xl
                  shadow-black/60
                  backdrop-blur-2xl
                "
              >
                <div
                  className="
                    border-b
                    border-white/[0.06]
                    px-3
                    py-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-cyan-400
                        via-blue-500
                        to-purple-500
                        font-bold
                        text-white
                      "
                    >
                      Z
                    </div>

                    <div>
                      <div
                        className="
                          text-xs
                          font-semibold
                          text-slate-200
                        "
                      >
                        NEXORA Operator
                      </div>

                      <div
                        className="
                          mt-1
                          text-[9px]
                          text-slate-600
                        "
                      >
                        Premium AI Access
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    space-y-1
                    p-1
                  "
                >
                  <HeaderProfileLink
                    href="/profile"
                    icon={
                      <User size={16} />
                    }
                    label="My Profile"
                    onClick={() =>
                      setProfileOpen(
                        false
                      )
                    }
                  />

                  <HeaderProfileLink
                    href="/portfolio"
                    icon={
                      <Wallet size={16} />
                    }
                    label="Trading Account"
                    onClick={() =>
                      setProfileOpen(
                        false
                      )
                    }
                  />

                  <HeaderProfileLink
                    href="/settings"
                    icon={
                      <Settings size={16} />
                    }
                    label="Settings"
                    onClick={() =>
                      setProfileOpen(
                        false
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      alert(
                        "Theme controls will be connected globally."
                      )
                    }
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
                </div>

                <div
                  className="
                    border-t
                    border-white/[0.06]
                    p-1
                  "
                >
                  <button
                    onClick={() =>
                      alert(
                        "Authentication logout will be connected later."
                      )
                    }
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
                      text-red-400
                      transition
                      hover:bg-red-400/[0.07]
                    "
                  >
                    <X size={16} />

                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================================================
            MOBILE STATUS BAR
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-white/[0.05]
            px-4
            py-2
            lg:hidden
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                relative
                flex
                h-2
                w-2
                rounded-full
                bg-emerald-400
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  animate-ping
                  rounded-full
                  bg-emerald-400/50
                "
              />
            </span>

            <span
              className="
                text-[9px]
                font-semibold
                tracking-wide
                text-emerald-400
              "
            >
              AI SYSTEM ONLINE
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              text-[9px]
              text-slate-600
            "
          >
            <span>
              Scanner Ready
            </span>

            <span
              className="
                h-3
                w-px
                bg-white/10
              "
            />

            <span>
              Risk Active
            </span>
          </div>
        </div>
      </header>

      {/* =================================================
          MOBILE MENU
      ================================================== */}

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() =>
          setMobileMenuOpen(false)
        }
      />

      {/* =================================================
          COMMAND PALETTE OVERLAY
      ================================================== */}

      {commandOpen && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-start
            justify-center
            bg-black/75
            px-4
            pt-[12vh]
            backdrop-blur-md
          "
          onMouseDown={() =>
            setCommandOpen(false)
          }
        >
          <div
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="
              w-full
              max-w-[680px]
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#0d1119]
              shadow-2xl
              shadow-black/70
            "
          >
            {/* COMMAND SEARCH */}

            <div
              className="
                flex
                items-center
                gap-3
                border-b
                border-white/[0.07]
                px-4
              "
            >
              <Search
                size={20}
                className="
                  text-cyan-400
                "
              />

              <input
                autoFocus
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                placeholder="Search commands, pages, AI tools..."
                className="
                  h-16
                  flex-1
                  bg-transparent
                  text-sm
                  text-slate-200
                  outline-none
                  placeholder:text-slate-600
                "
              />

              <button
                onClick={() =>
                  setCommandOpen(false)
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-600
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* COMMAND RESULTS */}

            <div
              className="
                max-h-[55vh]
                overflow-y-auto
                p-2
              "
            >
              <div
                className="
                  px-2
                  pb-2
                  pt-1
                  text-[9px]
                  font-bold
                  tracking-[0.15em]
                  text-slate-600
                "
              >
                {searchQuery
                  ? "SEARCH RESULTS"
                  : "QUICK COMMANDS"}
              </div>

              {searchResults.length >
              0 ? (
                <div className="space-y-1">
                  {searchResults.map(
                    (item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          setCommandOpen(
                            false
                          );
                          setSearchQuery(
                            ""
                          );
                        }}
                        className="
                          group
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          p-3
                          transition
                          hover:bg-cyan-400/[0.06]
                        "
                      >
                        <span
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-white/[0.035]
                            text-cyan-400
                            transition
                            group-hover:bg-cyan-400/[0.1]
                          "
                        >
                          {item.icon}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div
                            className="
                              text-sm
                              font-semibold
                              text-slate-200
                            "
                          >
                            {item.label}
                          </div>

                          <div
                            className="
                              mt-1
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
