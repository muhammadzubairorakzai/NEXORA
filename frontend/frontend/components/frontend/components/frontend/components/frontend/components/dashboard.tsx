"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  ChartCandlestick,
  CircleDollarSign,
  Clock3,
  Cpu,
  Gauge,
  Play,
  Radar,
  RefreshCw,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type MarketDirection = "BULLISH" | "BEARISH" | "NEUTRAL";

type MarketItem = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  direction: MarketDirection;
  confidence: number;
};

type SignalItem = {
  id: number;
  symbol: string;
  direction: "BUY" | "SELL";
  entry: string;
  target: string;
  stop: string;
  confidence: number;
  timeframe: string;
  status: "ACTIVE" | "WATCHING";
};

type QuickAction = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

/* =========================================================
   DASHBOARD
========================================================= */

export default function Dashboard() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [lastScan, setLastScan] = useState("Just now");
  const [activeTab, setActiveTab] = useState<
    "overview" | "markets" | "signals"
  >("overview");

  const [systemStatus, setSystemStatus] = useState("ONLINE");

  const [marketData, setMarketData] = useState<MarketItem[]>([
    {
      symbol: "XAU/USD",
      name: "Gold",
      price: "$2,348.20",
      change: "+0.84%",
      direction: "BULLISH",
      confidence: 84,
    },
    {
      symbol: "EUR/USD",
      name: "Euro / Dollar",
      price: "1.08426",
      change: "+0.31%",
      direction: "BULLISH",
      confidence: 71,
    },
    {
      symbol: "GBP/USD",
      name: "Pound / Dollar",
      price: "1.27480",
      change: "-0.42%",
      direction: "BEARISH",
      confidence: 76,
    },
    {
      symbol: "BTC/USD",
      name: "Bitcoin",
      price: "$68,420",
      change: "+1.26%",
      direction: "BULLISH",
      confidence: 89,
    },
  ]);

  const [signals, setSignals] = useState<SignalItem[]>([
    {
      id: 1,
      symbol: "XAU/USD",
      direction: "BUY",
      entry: "2345.20",
      target: "2380.00",
      stop: "2328.00",
      confidence: 88,
      timeframe: "H1",
      status: "ACTIVE",
    },
    {
      id: 2,
      symbol: "EUR/USD",
      direction: "BUY",
      entry: "1.08340",
      target: "1.09000",
      stop: "1.07950",
      confidence: 74,
      timeframe: "H4",
      status: "ACTIVE",
    },
    {
      id: 3,
      symbol: "GBP/USD",
      direction: "SELL",
      entry: "1.27620",
      target: "1.26900",
      stop: "1.28050",
      confidence: 81,
      timeframe: "H1",
      status: "WATCHING",
    },
  ]);

  /* =======================================================
     LIVE CLOCK
  ======================================================= */

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =======================================================
     QUICK ACTIONS
  ======================================================= */

  const quickActions: QuickAction[] = useMemo(
    () => [
      {
        title: "AI Market Scanner",
        description:
          "Scan markets using multi-agent AI intelligence.",
        href: "/scanner",
        icon: <ScanLine size={22} />,
        badge: "AI",
      },
      {
        title: "Trading Signals",
        description:
          "View AI-generated buy and sell opportunities.",
        href: "/signals",
        icon: <Zap size={22} />,
        badge: "LIVE",
      },
      {
        title: "Strategy Brain",
        description:
          "Analyze institutional and algorithmic strategies.",
        href: "/strategy",
        icon: <BrainCircuit size={22} />,
      },
      {
        title: "Risk Engine",
        description:
          "Monitor drawdown, exposure and portfolio risk.",
        href: "/risk",
        icon: <ShieldCheck size={22} />,
      },
      {
        title: "Execution Center",
        description:
          "Manage paper, assisted and live execution.",
        href: "/execution",
        icon: <Play size={22} />,
      },
      {
        title: "Backtesting Lab",
        description:
          "Test trading strategies against historical data.",
        href: "/backtesting",
        icon: <ChartCandlestick size={22} />,
      },
    ],
    []
  );

  /* =======================================================
     RUN AI SCANNER
  ======================================================= */

  const runScanner = () => {
    if (isScanning) return;

    setIsScanning(true);
    setScanProgress(0);
    setSystemStatus("SCANNING");

    const interval = setInterval(() => {
      setScanProgress((previous) => {
        if (previous >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setSystemStatus("ONLINE");
          setLastScan("Just now");

          setMarketData((current) =>
            current.map((item) => ({
              ...item,
              confidence: Math.min(
                99,
                item.confidence +
                  Math.floor(Math.random() * 5)
              ),
            }))
          );

          return 100;
        }

        return previous + 5;
      });
    }, 120);
  };

  /* =======================================================
     REFRESH DATA
  ======================================================= */

  const refreshDashboard = () => {
    setLastScan("Refreshing...");

    setTimeout(() => {
      setLastScan("Updated just now");

      setMarketData((current) =>
        current.map((item) => ({
          ...item,
          confidence: Math.max(
            50,
            Math.min(
              99,
              item.confidence +
                Math.floor(Math.random() * 7) - 3
            )
          ),
        }))
      );
    }, 800);
  };

  /* =======================================================
     DIRECTION STYLING
  ======================================================= */

  const getDirectionStyle = (
    direction: MarketDirection
  ) => {
    if (direction === "BULLISH") {
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
        icon: <TrendingUp size={14} />,
      };
    }

    if (direction === "BEARISH") {
      return {
        text: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20",
        icon: <TrendingDown size={14} />,
      };
    }

    return {
      text: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
      icon: <Activity size={14} />,
    };
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#080b11]
        text-white
      "
    >
      <div
        className="
          mx-auto
          max-w-[1800px]
          p-4
          sm:p-6
          lg:p-8
        "
      >
        {/* =================================================
            TOP WELCOME SECTION
        ================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/[0.08]
            bg-gradient-to-br
            from-[#0f1724]
            via-[#0c111b]
            to-[#090c13]
            p-5
            sm:p-7
          "
        >
          <div
            className="
              absolute
              -right-20
              -top-20
              h-72
              w-72
              rounded-full
              bg-cyan-400/10
              blur-[120px]
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-6
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  tracking-[0.2em]
                  text-cyan-400
                "
              >
                <Sparkles size={14} />

                NEXORA COMMAND CENTER
              </div>

              <h1
                className="
                  mt-3
                  text-2xl
                  font-bold
                  tracking-tight
                  sm:text-4xl
                "
              >
                AI-Powered Trading Intelligence
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-relaxed
                  text-slate-500
                "
              >
                Monitor markets, analyze opportunities,
                control AI agents and manage your complete
                trading ecosystem from one intelligent
                command center.
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <button
                  onClick={runScanner}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-cyan-400
                    px-4
                    py-3
                    text-xs
                    font-bold
                    text-[#041015]
                    transition
                    hover:bg-cyan-300
                  "
                >
                  <ScanLine
                    size={17}
                    className={
                      isScanning
                        ? "animate-spin"
                        : ""
                    }
                  />

                  {isScanning
                    ? "Scanning Markets..."
                    : "Run AI Scanner"}

                  <ArrowUpRight
                    size={15}
                    className="
                      transition
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </button>

                <Link
                  href="/signals"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-4
                    py-3
                    text-xs
                    font-semibold
                    text-slate-300
                    transition
                    hover:border-cyan-400/20
                    hover:bg-cyan-400/[0.05]
                    hover:text-cyan-300
                  "
                >
                  <Zap size={16} />

                  View Signals
                </Link>
              </div>
            </div>

            {/* SYSTEM CARD */}

            <div
              className="
                w-full
                rounded-2xl
                border
                border-white/[0.08]
                bg-black/20
                p-4
                xl:max-w-[360px]
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
                    size={17}
                    className="
                      text-cyan-400
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-300
                    "
                  >
                    NEXORA CORE
                  </span>
                </div>

                <span
                  className={`
                    rounded-lg
                    px-2
                    py-1
                    text-[9px]
                    font-bold
                    ${
                      systemStatus === "ONLINE"
                        ? `
                          bg-emerald-400/10
                          text-emerald-400
                        `
                        : `
                          bg-cyan-400/10
                          text-cyan-400
                        `
                    }
                  `}
                >
                  {systemStatus}
                </span>
              </div>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                <MiniStat
                  label="AI Agents"
                  value="08"
                  icon={<Bot size={15} />}
                />

                <MiniStat
                  label="Markets"
                  value="24"
                  icon={<Radar size={15} />}
                />

                <MiniStat
                  label="Signals"
                  value="03"
                  icon={<Zap size={15} />}
                />

                <MiniStat
                  label="Risk Score"
                  value="LOW"
                  icon={<ShieldCheck size={15} />}
                />
              </div>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/[0.06]
                  pt-4
                "
              >
                <span
                  className="
                    text-[10px]
                    text-slate-600
                  "
                >
                  {time.toLocaleTimeString()}
                </span>

                <span
                  className="
                    text-[10px]
                    text-cyan-400
                  "
                >
                  {lastScan}
                </span>
              </div>
            </div>
          </div>

          {/* SCANNER PROGRESS */}

          {isScanning && (
            <div className="mt-6">
              <div
                className="
                  mb-2
                  flex
                  items-center
                  justify-between
                  text-[10px]
                "
              >
                <span className="text-slate-500">
                  AI agents analyzing market structure,
                  momentum and risk...
                </span>

                <span className="font-bold text-cyan-400">
                  {scanProgress}%
                </span>
              </div>

              <div
                className="
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-white/[0.06]
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    via-blue-400
                    to-purple-400
                    transition-all
                    duration-200
                  "
                  style={{
                    width: `${scanProgress}%`,
                  }}
                />
              </div>
            </div>
          )}
        </section>

        {/* =================================================
            TAB SWITCHER
        ================================================== */}

        <section
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              p-1
            "
          >
            {[
              {
                id: "overview",
                label: "Overview",
              },
              {
                id: "markets",
                label: "Markets",
              },
              {
                id: "signals",
                label: "Signals",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "overview"
                      | "markets"
                      | "signals"
                  )
                }
                className={`
                  rounded-lg
                  px-4
                  py-2
                  text-[10px]
                  font-semibold
                  transition
                  ${
                    activeTab === tab.id
                      ? `
                        bg-cyan-400/10
                        text-cyan-300
                      `
                      : `
                        text-slate-600
                        hover:text-slate-300
                      `
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={refreshDashboard}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              px-3
              py-2
              text-[10px]
              text-slate-500
              transition
              hover:bg-white/[0.04]
              hover:text-cyan-300
            "
          >
            <RefreshCw size={14} />

            Refresh Dashboard
          </button>
        </section>

        {/* =================================================
            QUICK ACTIONS
        ================================================== */}

        {(activeTab === "overview" ||
          activeTab === "markets") && (
          <section className="mt-6">
            <SectionTitle
              title="AI Intelligence Modules"
              subtitle="Open a NEXORA system module"
              icon={<Sparkles size={18} />}
            />

            <div
              className="
                mt-4
                grid
                gap-4
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/[0.02]
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-cyan-400/20
                    hover:bg-cyan-400/[0.035]
                  "
                >
                  <div
                    className="
                      absolute
                      -right-10
                      -top-10
                      h-28
                      w-28
                      rounded-full
                      bg-cyan-400/[0.05]
                      blur-3xl
                      transition
                      group-hover:bg-cyan-400/[0.1]
                    "
                  />

                  <div
                    className="
                      relative
                      flex
                      items-start
                      justify-between
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
                        border-cyan-400/10
                        bg-cyan-400/[0.06]
                        text-cyan-400
                      "
                    >
                      {action.icon}
                    </div>

                    {action.badge && (
                      <span
                        className="
                          rounded-lg
                          bg-purple-400/10
                          px-2
                          py-1
                          text-[8px]
                          font-bold
                          text-purple-300
                        "
                      >
                        {action.badge}
                      </span>
                    )}
                  </div>

                  <div className="relative mt-5">
                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-slate-200
                        transition
                        group-hover:text-cyan-300
                      "
                    >
                      {action.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-xs
                        leading-relaxed
                        text-slate-600
                      "
                    >
                      {action.description}
                    </p>
                  </div>

                  <div
                    className="
                      relative
                      mt-5
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      font-semibold
                      text-slate-600
                      transition
                      group-hover:text-cyan-400
                    "
                  >
                    Open Module

                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* =================================================
            MARKET SECTION
        ================================================== */}

        {(activeTab === "overview" ||
          activeTab === "markets") && (
          <section className="mt-8">
            <SectionTitle
              title="Market Intelligence"
              subtitle="AI market direction and confidence"
              icon={<Radar size={18} />}
            />

            <div
              className="
                mt-4
                grid
                gap-4
                md:grid-cols-2
                xl:grid-cols-4
              "
            >
              {marketData.map((market) => {
                const style =
                  getDirectionStyle(
                    market.direction
                  );

                return (
                  <Link
                    key={market.symbol}
                    href={`/market/${market.symbol
                      .replace("/", "-")
                      .toLowerCase()}`}
                    className="
                      group
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-white/[0.02]
                      p-4
                      transition
                      hover:border-cyan-400/20
                      hover:bg-white/[0.035]
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                      "
                    >
                      <div>
                        <div
                          className="
                            text-xs
                            font-bold
                            text-slate-200
                          "
                        >
                          {market.symbol}
                        </div>

                        <div
                          className="
                            mt-1
                            text-[9px]
                            text-slate-600
                          "
                        >
                          {market.name}
                        </div>
                      </div>

                      <span
                        className={`
                          flex
                          items-center
                          gap-1
                          rounded-lg
                          border
                          px-2
                          py-1
                          text-[8px]
                          font-bold
                          ${style.bg}
                          ${style.border}
                          ${style.text}
                        `}
                      >
                        {style.icon}

                        {market.direction}
                      </span>
                    </div>

                    <div
                      className="
                        mt-5
                        text-xl
                        font-bold
                        tracking-tight
                        text-white
                      "
                    >
                      {market.price}
                    </div>

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className={`
                          flex
                          items-center
                          gap-1
                          text-[10px]
                          font-semibold
                          ${
                            market.direction ===
                            "BEARISH"
                              ? "text-red-400"
                              : "text-emerald-400"
                          }
                        `}
                      >
                        {market.direction ===
                        "BEARISH" ? (
                          <ArrowDownRight size={13} />
                        ) : (
                          <ArrowUpRight size={13} />
                        )}

                        {market.change}
                      </span>

                      <span
                        className="
                          text-[9px]
                          text-slate-600
                        "
                      >
                        AI {market.confidence}%
                      </span>
                    </div>

                    <div
                      className="
                        mt-3
                        h-1.5
                        overflow-hidden
                        rounded-full
                        bg-white/[0.06]
                      "
                    >
                      <div
                        className="
                          h-full
                          rounded-full
                          bg-cyan-400
                        "
                        style={{
                          width: `${market.confidence}%`,
                        }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* =================================================
            SIGNALS
        ================================================== */}

        {(activeTab === "overview" ||
          activeTab === "signals") && (
          <section className="mt-8">
            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <SectionTitle
                title="AI Trading Signals"
                subtitle="Multi-agent validated market opportunities"
                icon={<Zap size={18} />}
              />

              <Link
                href="/signals"
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  text-cyan-400
                  hover:text-cyan-300
                "
              >
                View All Signals

                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div
              className="
                mt-4
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.02]
              "
            >
              <div
                className="
                  hidden
                  grid-cols-[1.2fr_0.7fr_1fr_1fr_1fr_0.8fr]
                  gap-4
                  border-b
                  border-white/[0.06]
                  px-5
                  py-3
                  text-[9px]
                  font-bold
                  tracking-wide
                  text-slate-600
                  md:grid
                "
              >
                <span>SYMBOL</span>
                <span>TYPE</span>
                <span>ENTRY</span>
                <span>TARGET</span>
                <span>STOP</span>
                <span>AI SCORE</span>
              </div>

              {signals.map((signal) => (
                <Link
                  key={signal.id}
                  href={`/signals/${signal.id}`}
                  className="
                    group
                    block
                    border-b
                    border-white/[0.05]
                    px-5
                    py-4
                    transition
                    last:border-b-0
                    hover:bg-cyan-400/[0.025]
                  "
                >
                  <div
                    className="
                      grid
                      gap-3
                      md:grid-cols-[1.2fr_0.7fr_1fr_1fr_1fr_0.8fr]
                      md:items-center
                      md:gap-4
                    "
                  >
                    <div>
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <span
                          className="
                            text-sm
                            font-bold
                            text-slate-200
                          "
                        >
                          {signal.symbol}
                        </span>

                        <span
                          className="
                            rounded
                            bg-white/[0.04]
                            px-1.5
                            py-0.5
                            text-[8px]
                            text-slate-600
                          "
                        >
                          {signal.timeframe}
                        </span>
                      </div>

                      <div
                        className="
                          mt-1
                          text-[9px]
                          text-slate-700
                        "
                      >
                        {signal.status}
                      </div>
                    </div>

                    <div>
                      <span
                        className={`
                          inline-flex
                          rounded-lg
                          px-2.5
                          py-1.5
                          text-[9px]
                          font-bold
                          ${
                            signal.direction ===
                            "BUY"
                              ? `
                                bg-emerald-400/10
                                text-emerald-400
                              `
                              : `
                                bg-red-400/10
                                text-red-400
                              `
                          }
                        `}
                      >
                        {signal.direction}
                      </span>
                    </div>

                    <SignalValue
                      label="Entry"
                      value={signal.entry}
                    />

                    <SignalValue
                      label="Target"
                      value={signal.target}
                      accent="text-emerald-400"
                    />

                    <SignalValue
                      label="Stop"
                      value={signal.stop}
                      accent="text-red-400"
                    />

                    <div>
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          text-[10px]
                        "
                      >
                        <span className="text-slate-500">
                          AI Score
                        </span>

                        <span className="font-bold text-cyan-400">
                          {signal.confidence}%
                        </span>
                      </div>

                      <div
                        className="
                          mt-2
                          h-1.5
                          overflow-hidden
                          rounded-full
                          bg-white/[0.06]
                        "
                      >
                        <div
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-cyan-400
                            to-blue-400
                          "
                          style={{
                            width: `${signal.confidence}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* =================================================
            BOTTOM SYSTEM GRID
        ================================================== */}

        <section
          className="
            mt-8
            grid
            gap-4
            lg:grid-cols-3
          "
        >
          <SystemPanel
            title="Portfolio Status"
            icon={<Wallet size={18} />}
            status="HEALTHY"
            statusClass="text-emerald-400"
            items={[
              ["Active Accounts", "02"],
              ["Open Positions", "03"],
              ["Daily P/L", "+2.48%"],
              ["Exposure", "LOW"],
            ]}
          />

          <SystemPanel
            title="Risk Engine"
            icon={<ShieldAlert size={18} />}
            status="MONITORING"
            statusClass="text-cyan-400"
            items={[
              ["Drawdown", "1.24%"],
              ["Risk Per Trade", "1.00%"],
              ["Portfolio Risk", "LOW"],
              ["Protection", "ACTIVE"],
            ]}
          />

          <SystemPanel
            title="AI Activity"
            icon={<Activity size={18} />}
            status="LIVE"
            statusClass="text-purple-400"
            items={[
              ["Agent Tasks", "128"],
              ["Market Scans", "24"],
              ["Strategies", "12"],
              ["Automation", "RUNNING"],
            ]}
          />
        </section>

        {/* =================================================
            FOOTER STATUS
        ================================================== */}

        <section
          className="
            mt-6
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.015]
            px-5
            py-4
            text-[10px]
            text-slate-600
            sm:flex-row
            sm:items-center
            sm:justify-between
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

            NEXORA AI Core is operating normally
          </div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Clock3 size={13} />

            Last synchronization: {lastScan}
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="
          flex
          items-center
          gap-2
          text-cyan-400
        "
      >
        {icon}

        <h2
          className="
            text-lg
            font-bold
            text-slate-100
          "
        >
          {title}
        </h2>
      </div>

      <p
        className="
          mt-1
          text-xs
          text-slate-600
        "
      >
        {subtitle}
      </p>
    </div>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        p-3
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          text-slate-600
        "
      >
        {icon}
      </div>

      <div
        className="
          mt-3
          text-lg
          font-bold
          text-slate-200
        "
      >
        {value}
      </div>

      <div
        className="
          mt-1
          text-[9px]
          text-slate-700
        "
      >
        {label}
      </div>
    </div>
  );
}

/* =========================================================
   SIGNAL VALUE
========================================================= */

function SignalValue({
  label,
  value,
  accent = "text-slate-300",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div>
      <div
        className="
          text-[9px]
          text-slate-700
          md:hidden
        "
      >
        {label}
      </div>

      <div
        className={`
          text-xs
          font-semibold
          ${accent}
        `}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   SYSTEM PANEL
========================================================= */

function SystemPanel({
  title,
  icon,
  status,
  statusClass,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  status: string;
  statusClass: string;
  items: [string, string][];
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.02]
        p-5
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
            text-slate-300
          "
        >
          <span className="text-cyan-400">
            {icon}
          </span>

          <h3
            className="
              text-sm
              font-semibold
            "
          >
            {title}
          </h3>
        </div>

        <span
          className={`
            text-[9px]
            font-bold
            ${statusClass}
          `}
        >
          {status}
        </span>
      </div>

      <div
        className="
          mt-5
          space-y-3
        "
      >
        {items.map(([label, value]) => (
          <div
            key={label}
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/[0.04]
              pb-3
              last:border-b-0
              last:pb-0
            "
          >
            <span
              className="
                text-[10px]
                text-slate-600
              "
            >
              {label}
            </span>

            <span
              className="
                text-[10px]
                font-semibold
                text-slate-300
              "
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
