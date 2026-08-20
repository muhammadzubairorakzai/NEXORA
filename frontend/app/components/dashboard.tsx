"use client";

import { useEffect, useMemo, useState } from "react";

type MarketTrend = "BULLISH" | "BEARISH" | "NEUTRAL";
type TradeSide = "BUY" | "SELL";
type ExecutionMode = "PAPER" | "ASSISTED" | "LIVE";

type Market = {
  symbol: string;
  price: number;
  change: number;
  trend: MarketTrend;
  volume: string;
  confidence: number;
};

type Position = {
  id: string;
  symbol: string;
  side: TradeSide;
  entry: number;
  current: number;
  pnl: number;
  pnlPercent: number;
  size: number;
  status: "OPEN" | "PROTECTED";
};

type Signal = {
  id: number;
  symbol: string;
  side: TradeSide;
  setup: string;
  confidence: number;
  timeframe: string;
  entry: string;
  stopLoss: string;
  takeProfit: string;
};

type Activity = {
  time: string;
  title: string;
  description: string;
  status: "SUCCESS" | "INFO" | "WARNING";
};

type Agent = {
  id: string;
  name: string;
  role: string;
  status: "ONLINE" | "ANALYZING" | "STANDBY";
  progress: number;
};

const initialMarkets: Market[] = [
  {
    symbol: "XAU/USD",
    price: 2354.82,
    change: 1.24,
    trend: "BULLISH",
    volume: "HIGH",
    confidence: 92,
  },
  {
    symbol: "EUR/USD",
    price: 1.0842,
    change: 0.31,
    trend: "BULLISH",
    volume: "MEDIUM",
    confidence: 84,
  },
  {
    symbol: "GBP/USD",
    price: 1.2768,
    change: -0.42,
    trend: "BEARISH",
    volume: "HIGH",
    confidence: 78,
  },
  {
    symbol: "USD/JPY",
    price: 156.42,
    change: 0.18,
    trend: "BULLISH",
    volume: "MEDIUM",
    confidence: 73,
  },
  {
    symbol: "BTC/USD",
    price: 67420,
    change: 2.84,
    trend: "BULLISH",
    volume: "HIGH",
    confidence: 89,
  },
  {
    symbol: "NAS100",
    price: 18945,
    change: 0.72,
    trend: "BULLISH",
    volume: "HIGH",
    confidence: 81,
  },
];

const initialPositions: Position[] = [
  {
    id: "POS-001",
    symbol: "XAU/USD",
    side: "BUY",
    entry: 2348.4,
    current: 2354.82,
    pnl: 642.0,
    pnlPercent: 2.1,
    size: 0.5,
    status: "PROTECTED",
  },
  {
    id: "POS-002",
    symbol: "EUR/USD",
    side: "BUY",
    entry: 1.0825,
    current: 1.0842,
    pnl: 215.4,
    pnlPercent: 1.4,
    size: 1.2,
    status: "OPEN",
  },
  {
    id: "POS-003",
    symbol: "GBP/USD",
    side: "SELL",
    entry: 1.2814,
    current: 1.2768,
    pnl: 184.2,
    pnlPercent: 1.1,
    size: 0.8,
    status: "PROTECTED",
  },
];

const initialSignals: Signal[] = [
  {
    id: 1,
    symbol: "XAU/USD",
    side: "BUY",
    setup: "Liquidity Sweep + Bullish BOS",
    confidence: 92,
    timeframe: "H1",
    entry: "2351.20",
    stopLoss: "2342.00",
    takeProfit: "2378.00",
  },
  {
    id: 2,
    symbol: "EUR/USD",
    side: "BUY",
    setup: "Trend Continuation",
    confidence: 84,
    timeframe: "H4",
    entry: "1.0835",
    stopLoss: "1.0790",
    takeProfit: "1.0920",
  },
  {
    id: 3,
    symbol: "NAS100",
    side: "BUY",
    setup: "Momentum Breakout",
    confidence: 81,
    timeframe: "M30",
    entry: "18920",
    stopLoss: "18780",
    takeProfit: "19250",
  },
];

const activities: Activity[] = [
  {
    time: "10:42",
    title: "Risk Engine Updated",
    description: "Dynamic stop protection applied to XAU/USD.",
    status: "SUCCESS",
  },
  {
    time: "10:31",
    title: "AI Signal Generated",
    description: "High-confidence bullish continuation detected.",
    status: "INFO",
  },
  {
    time: "10:15",
    title: "Macro Volatility Alert",
    description: "USD-sensitive assets entered elevated volatility.",
    status: "WARNING",
  },
  {
    time: "09:58",
    title: "Position Protected",
    description: "Trailing protection activated on GBP/USD.",
    status: "SUCCESS",
  },
];

const initialAgents: Agent[] = [
  {
    id: "01",
    name: "Market Analyst",
    role: "Price Action & Structure Intelligence",
    status: "ANALYZING",
    progress: 91,
  },
  {
    id: "02",
    name: "Quant Strategist",
    role: "Probability & Strategy Evaluation",
    status: "ONLINE",
    progress: 84,
  },
  {
    id: "03",
    name: "Risk Guardian",
    role: "Exposure & Drawdown Protection",
    status: "ONLINE",
    progress: 97,
  },
  {
    id: "04",
    name: "News Intelligence",
    role: "Macro & Sentiment Monitoring",
    status: "ANALYZING",
    progress: 88,
  },
  {
    id: "05",
    name: "Execution Agent",
    role: "Order Validation & Automation",
    status: "STANDBY",
    progress: 72,
  },
  {
    id: "06",
    name: "Portfolio Optimizer",
    role: "Capital Allocation Intelligence",
    status: "ONLINE",
    progress: 86,
  },
];

export default function Dashboard() {
  const [markets, setMarkets] = useState<Market[]>(initialMarkets);
  const [positions, setPositions] =
    useState<Position[]>(initialPositions);
  const [signals, setSignals] =
    useState<Signal[]>(initialSignals);

  const [agents, setAgents] =
    useState<Agent[]>(initialAgents);

  const [mode, setMode] =
    useState<ExecutionMode>("PAPER");

  const [automation, setAutomation] =
    useState(true);

  const [connected, setConnected] =
    useState(true);

  const [balance, setBalance] =
    useState(50000);

  const [dailyPnl, setDailyPnl] =
    useState(1248.65);

  const [selectedSymbol, setSelectedSymbol] =
    useState("XAU/USD");

  const [scannerRunning, setScannerRunning] =
    useState(false);

  const [notification, setNotification] =
    useState("NEXORA AI Core Online");

  const [activeTab, setActiveTab] =
    useState("Overview");

  useEffect(() => {
    const timer = setInterval(() => {
      setMarkets((previous) =>
        previous.map((market) => {
          const volatility =
            market.symbol === "XAU/USD"
              ? 0.18
              : market.symbol === "BTC/USD"
              ? 12
              : 0.0003;

          const movement =
            (Math.random() - 0.5) * volatility;

          const nextPrice =
            market.price + movement;

          const nextChange =
            market.change +
            (Math.random() - 0.5) * 0.08;

          let trend: MarketTrend = "NEUTRAL";

          if (nextChange > 0.12) {
            trend = "BULLISH";
          }

          if (nextChange < -0.12) {
            trend = "BEARISH";
          }

          return {
            ...market,
            price: Number(nextPrice.toFixed(
              market.price > 100 ? 2 : 4
            )),
            change: Number(nextChange.toFixed(2)),
            trend,
          };
        })
      );

      setDailyPnl((previous) => {
        const next =
          previous +
          (Math.random() - 0.46) * 22;

        return Number(next.toFixed(2));
      });

      setAgents((previous) =>
        previous.map((agent) => ({
          ...agent,
          progress: Math.max(
            60,
            Math.min(
              99,
              agent.progress +
                Math.round(
                  (Math.random() - 0.5) * 6
                )
            )
          ),
        }))
      );
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const totalPositionPnl = useMemo(() => {
    return positions.reduce(
      (total, position) =>
        total + position.pnl,
      0
    );
  }, [positions]);

  const totalExposure = useMemo(() => {
    return positions.reduce(
      (total, position) =>
        total + position.size,
      0
    );
  }, [positions]);

  const averageConfidence = useMemo(() => {
    if (signals.length === 0) {
      return 0;
    }

    const total = signals.reduce(
      (sum, signal) =>
        sum + signal.confidence,
      0
    );

    return Math.round(total / signals.length);
  }, [signals]);

  const selectedMarket =
    markets.find(
      (market) =>
        market.symbol === selectedSymbol
    ) || markets[0];

  const formatPrice = (
    value: number,
    symbol: string
  ) => {
    if (
      symbol === "XAU/USD" ||
      symbol === "BTC/USD" ||
      symbol === "NAS100"
    ) {
      return value.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      );
    }

    return value.toFixed(4);
  };

  const runScanner = () => {
    if (scannerRunning) {
      return;
    }

    setScannerRunning(true);
    setNotification(
      "AI Scanner is analyzing global markets..."
    );

    setTimeout(() => {
      const newSignal: Signal = {
        id: Date.now(),
        symbol: "USD/JPY",
        side: "BUY",
        setup:
          "Institutional Momentum + BOS",
        confidence:
          Math.floor(
            Math.random() * 10
          ) + 82,
        timeframe: "H1",
        entry: "156.35",
        stopLoss: "155.90",
        takeProfit: "157.20",
      };

      setSignals((previous) => [
        newSignal,
        ...previous,
      ]);

      setScannerRunning(false);

      setNotification(
        "Scanner completed: new high-confidence opportunity found."
      );
    }, 1800);
  };

  const generateSignal = () => {
    const symbols = [
      "XAU/USD",
      "EUR/USD",
      "GBP/USD",
      "BTC/USD",
      "NAS100",
    ];

    const symbol =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    const side: TradeSide =
      Math.random() > 0.45
        ? "BUY"
        : "SELL";

    const signal: Signal = {
      id: Date.now(),
      symbol,
      side,
      setup:
        side === "BUY"
          ? "Liquidity Reversal + Bullish Structure"
          : "Supply Reaction + Bearish Continuation",
      confidence:
        Math.floor(
          Math.random() * 13
        ) + 82,
      timeframe: "M30",
      entry: "AI ENTRY",
      stopLoss: "AI SL",
      takeProfit: "AI TP",
    };

    setSignals((previous) => [
      signal,
      ...previous,
    ]);

    setNotification(
      `New ${side} signal generated for ${symbol}`
    );
  };

  const closePosition = (
    id: string
  ) => {
    const target =
      positions.find(
        (position) =>
          position.id === id
      );

    if (!target) {
      return;
    }

    setBalance((previous) =>
      Number(
        (
          previous + target.pnl
        ).toFixed(2)
      )
    );

    setDailyPnl((previous) =>
      Number(
        (
          previous + target.pnl
        ).toFixed(2)
      )
    );

    setPositions((previous) =>
      previous.filter(
        (position) =>
          position.id !== id
      )
    );

    setNotification(
      `${target.symbol} position closed successfully`
    );
  };

  const toggleAutomation = () => {
    setAutomation((previous) => {
      const next = !previous;

      setNotification(
        next
          ? "Autonomous trading workflow activated"
          : "Autonomous trading workflow paused"
      );

      return next;
    });
  };

  const changeMode = (
    nextMode: ExecutionMode
  ) => {
    setMode(nextMode);

    setNotification(
      `Execution mode changed to ${nextMode}`
    );
  };

  return (
    <div className="nexora-dashboard-component">
      <section className="dashboard-hero">
        <div className="dashboard-hero-left">
          <span className="dashboard-kicker">
            NEXORA MULTI-AGENT CORE
          </span>

          <h1>
            Autonomous
            <span> Trading Intelligence</span>
          </h1>

          <p>
            AI-powered market analysis,
            execution intelligence,
            risk protection and portfolio
            automation in one command system.
          </p>

          <div className="dashboard-hero-actions">
            <button
              className="dashboard-primary-action"
              onClick={generateSignal}
            >
              Generate AI Signal
            </button>

            <button
              className="dashboard-secondary-action"
              onClick={runScanner}
            >
              {scannerRunning
                ? "Scanning Markets..."
                : "Run Global Scanner"}
            </button>
          </div>
        </div>

        <div className="dashboard-hero-right">
          <div className="hero-ai-core">
            <div className="hero-ai-ring hero-ai-ring-one" />
            <div className="hero-ai-ring hero-ai-ring-two" />
            <div className="hero-ai-center">
              <span>AI</span>
              <small>CORE</small>
            </div>
          </div>

          <div className="hero-system-info">
            <span>CORE STATUS</span>
            <strong>
              {automation
                ? "AUTONOMOUS"
                : "MANUAL CONTROL"}
            </strong>
          </div>
        </div>
      </section>

      <section className="dashboard-notification">
        <span className="notification-dot" />
        <p>{notification}</p>
        <button
          onClick={() =>
            setNotification(
              "NEXORA system monitoring active"
            )
          }
        >
          Clear
        </button>
      </section>

      <section className="dashboard-tabs">
        {[
          "Overview",
          "Markets",
          "Signals",
          "Portfolio",
          "Agents",
        ].map((tab) => (
          <button
            key={tab}
            className={
              activeTab === tab
                ? "dashboard-tab active"
                : "dashboard-tab"
            }
            onClick={() =>
              setActiveTab(tab)
            }
          >
            {tab}
          </button>
        ))}
      </section>

      <section className="dashboard-stat-grid">
        <div className="dashboard-stat-box">
          <span>ACCOUNT BALANCE</span>
          <strong>
            $
            {balance.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
              }
            )}
          </strong>
          <small className="positive">
            +4.82% Monthly Growth
          </small>
        </div>

        <div className="dashboard-stat-box">
          <span>LIVE P&L</span>
          <strong
            className={
              dailyPnl >= 0
                ? "positive-text"
                : "negative-text"
            }
          >
            {dailyPnl >= 0 ? "+" : ""}
            ${dailyPnl.toLocaleString()}
          </strong>
          <small>
            Real-time AI performance
          </small>
        </div>

        <div className="dashboard-stat-box">
          <span>OPEN POSITIONS</span>
          <strong>
            {positions.length}
          </strong>
          <small>
            Exposure:{" "}
            {totalExposure.toFixed(2)} lots
          </small>
        </div>

        <div className="dashboard-stat-box">
          <span>AI CONFIDENCE</span>
          <strong>
            {averageConfidence}%
          </strong>
          <div className="dashboard-progress">
            <div
              style={{
                width: `${averageConfidence}%`,
              }}
            />
          </div>
        </div>
      </section>

      <section className="dashboard-market-header">
        <div>
          <span>LIVE MARKET FEED</span>
          <h2>Global Market Intelligence</h2>
        </div>

        <button
          className="dashboard-scan-button"
          onClick={runScanner}
        >
          {scannerRunning
            ? "ANALYZING..."
            : "SCAN NOW"}
        </button>
      </section>

      <section className="dashboard-market-grid">
        {markets.map((market) => (
          <button
            key={market.symbol}
            className={
              selectedSymbol === market.symbol
                ? "dashboard-market-card selected"
                : "dashboard-market-card"
            }
            onClick={() =>
              setSelectedSymbol(
                market.symbol
              )
            }
          >
            <div className="market-card-top">
              <strong>
                {market.symbol}
              </strong>

              <span
                className={
                  market.trend ===
                  "BULLISH"
                    ? "trend bullish"
                    : market.trend ===
                      "BEARISH"
                    ? "trend bearish"
                    : "trend neutral"
                }
              >
                {market.trend}
              </span>
            </div>

            <h3>
              {formatPrice(
                market.price,
                market.symbol
              )}
            </h3>

            <div className="market-card-bottom">
              <span
                className={
                  market.change >= 0
                    ? "positive"
                    : "negative"
                }
              >
                {market.change >= 0
                  ? "+"
                  : ""}
                {market.change.toFixed(2)}%
              </span>

              <small>
                AI {market.confidence}%
              </small>
            </div>
          </button>
        ))}
      </section>

      <section className="dashboard-main
