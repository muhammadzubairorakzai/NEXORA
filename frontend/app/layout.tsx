"use client";

import { useEffect, useState } from "react";

type Market = {
  symbol: string;
  price: string;
  change: string;
  trend: "BULLISH" | "BEARISH";
};

export default function NexoraDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [mode, setMode] = useState("PAPER");
  const [connected, setConnected] = useState(true);
  const [automation, setAutomation] = useState(true);
  const [balance, setBalance] = useState(50000);
  const [pnl, setPnl] = useState(1248.65);
  const [signal, setSignal] = useState("BUY");

  const markets: Market[] = [
    { symbol: "XAU/USD", price: "2,354.82", change: "+1.24%", trend: "BULLISH" },
    { symbol: "EUR/USD", price: "1.0842", change: "+0.31%", trend: "BULLISH" },
    { symbol: "GBP/USD", price: "1.2768", change: "-0.42%", trend: "BEARISH" },
    { symbol: "USD/JPY", price: "156.42", change: "+0.18%", trend: "BULLISH" },
    { symbol: "BTC/USD", price: "67,420", change: "+2.84%", trend: "BULLISH" },
    { symbol: "NAS100", price: "18,945", change: "+0.72%", trend: "BULLISH" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPnl((prev) => Number((prev + (Math.random() - 0.45) * 25).toFixed(2)));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    "Dashboard",
    "Forex Scanner",
    "AI Strategy Brain",
    "Signals",
    "Execution",
    "Risk Engine",
    "Backtesting",
    "News Intelligence",
    "Portfolio",
    "Settings",
  ];

  const toggleAutomation = () => {
    setAutomation(!automation);
  };

  const executeSignal = () => {
    setSignal(signal === "BUY" ? "SELL" : "BUY");
  };

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">N</div>
          <div>
            <h1>NEXORA</h1>
            <span>AI TRADING SYSTEM</span>
          </div>
        </div>

        <div className="nav-menu">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${
                activeMenu === item ? "active" : ""
              }`}
              onClick={() => setActiveMenu(item)}
            >
              <span className="nav-dot" />
              {item}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot" />
            <div>
              <strong>System Online</strong>
              <small>AI Engine Connected</small>
            </div>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">WELCOME BACK</p>
            <h2>Command Center</h2>
            <span className="subtitle">
              Autonomous Forex Intelligence & Automation
            </span>
          </div>

          <div className="top-actions">
            <div className="connection">
              <span className={`connection-dot ${connected ? "online" : ""}`} />
              {connected ? "CONNECTED" : "OFFLINE"}
            </div>

            <button
              className="profile"
              onClick={() => setConnected(!connected)}
            >
              ZX
            </button>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Balance</span>
            <h3>${balance.toLocaleString()}</h3>
            <p className="positive">+4.82% this month</p>
          </div>

          <div className="stat-card">
            <span>Today's P&L</span>
            <h3 className={pnl >= 0 ? "positive-text" : "negative-text"}>
              {pnl >= 0 ? "+" : ""}${pnl.toLocaleString()}
            </h3>
            <p>Live performance</p>
          </div>

          <div className="stat-card">
            <span>AI Confidence</span>
            <h3>87%</h3>
            <div className="mini-bar">
              <div style={{ width: "87%" }} />
            </div>
          </div>

          <div className="stat-card">
            <span>Active Positions</span>
            <h3>06</h3>
            <p>Across 4 markets</p>
          </div>
        </section>

        <section className="market-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">LIVE INTELLIGENCE</p>
              <h3>Market Overview</h3>
            </div>
            <button className="ghost-btn">View All Markets</button>
          </div>

          <div className="market-grid">
            {markets.map((market) => (
              <div className="market-card" key={market.symbol}>
                <div className="market-top">
                  <strong>{market.symbol}</strong>
                  <span
                    className={
                      market.trend === "BULLISH" ? "bullish" : "bearish"
                    }
                  >
                    {market.trend}
                  </span>
                </div>
                <h4>{market.price}</h4>
                <p
                  className={
                    market.change.startsWith("+")
                      ? "positive"
                      : "negative"
                  }
                >
                  {market.change}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="command-grid">
          <div className="panel large-panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">AI CORE</p>
                <h3>Strategy Brain</h3>
              </div>
              <span className="live-tag">LIVE</span>
            </div>

            <div className="ai-summary">
              <div className="ai-orb">
                <div className="orb-inner">AI</div>
              </div>

              <div className="ai-text">
                <span>Primary Market Bias</span>
                <h2 className="buy">{signal}</h2>
                <p>
                  Multi-agent analysis confirms institutional momentum,
                  liquidity alignment and bullish market structure.
                </p>
              </div>
            </div>

            <div className="strategy-metrics">
              <div>
                <span>Trend</span>
                <strong>BULLISH</strong>
              </div>
              <div>
                <span>Structure</span>
                <strong>BOS CONFIRMED</strong>
              </div>
              <div>
                <span>Liquidity</span>
                <strong>HIGH</strong>
              </div>
              <div>
                <span>Confidence</span>
                <strong>87%</strong>
              </div>
            </div>

            <button className="primary-btn" onClick={executeSignal}>
              Generate New AI Signal
            </button>
          </div>

          <div className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">EXECUTION</p>
                <h3>Trading Mode</h3>
              </div>
            </div>

            <div className="mode-list">
              {["PAPER", "ASSISTED", "LIVE"].map((item) => (
                <button
                  key={item}
                  className={`mode-item ${
                    mode === item ? "selected" : ""
                  }`}
                  onClick={() => setMode(item)}
                >
                  <div>
                    <strong>{item}</strong>
                    <span>
                      {item === "PAPER"
                        ? "Simulation environment"
                        : item === "ASSISTED"
                        ? "AI + manual approval"
                        : "Autonomous execution"}
                    </span>
                  </div>
                  <span className="radio" />
                </button>
              ))}
            </div>

            <button className="primary-btn full">
              Activate {mode} Mode
            </button>
          </div>
        </section>

        <section className="command-grid">
          <div className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">RISK CONTROL</p>
                <h3>AI Risk Engine</h3>
              </div>
              <span className="safe-tag">PROTECTED</span>
            </div>

            <div className="risk-meter">
              <div className="risk-circle">
                <strong>32%</strong>
                <span>Risk Usage</span>
              </div>

              <div className="risk-details">
                <div>
                  <span>Daily Drawdown</span>
                  <strong>1.2%</strong>
                </div>
                <div>
                  <span>Max Exposure</span>
                  <strong>2.5%</strong>
                </div>
                <div>
                  <span>Open Risk</span>
                  <strong>$640</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">AUTOMATION</p>
                <h3>Autonomous Control</h3>
              </div>
            </div>

            <div className="automation-box">
              <div>
                <strong>
                  {automation
                    ? "Automation Active"
                    : "Automation Paused"}
                </strong>
                <p>
                  AI agents are monitoring markets and executing configured
                  workflows.
                </p>
              </div>

              <button
                className={`switch ${automation ? "on" : ""}`}
                onClick={toggleAutomation}
                aria-label="Toggle automation"
              >
                <span />
              </button>
            </div>

            <div className="automation-list">
              <div>
                <span>Market Scanner</span>
                <strong>ACTIVE</strong>
              </div>
              <div>
                <span>Signal Engine</span>
                <strong>ACTIVE</strong>
              </div>
              <div>
                <span>News Monitor</span>
                <strong>ACTIVE</strong>
              </div>
              <div>
                <span>Risk Protection</span>
                <strong>ACTIVE</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="command-grid">
          <div className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">SCANNER</p>
                <h3>Top AI Opportunities</h3>
              </div>
              <button className="ghost-btn">Scan Now</button>
            </div>

            <div className="opportunity-list">
              <div className="opportunity">
                <div>
                  <strong>XAU/USD</strong>
                  <span>ICT + Liquidity Setup</span>
                </div>
                <div className="score">
                  <strong>92</strong>
                  <span>Score</span>
                </div>
              </div>

              <div className="opportunity">
                <div>
                  <strong>EUR/USD</strong>
                  <span>Trend Continuation</span>
                </div>
                <div className="score">
                  <strong>88</strong>
                  <span>Score</span>
                </div>
              </div>

              <div className="opportunity">
                <div>
                  <strong>NAS100</strong>
                  <span>Momentum Breakout</span>
                </div>
                <div className="score">
                  <strong>84</strong>
                  <span>Score</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="section-header">
              <div>
                <p className="eyebrow">INTELLIGENCE</p>
                <h3>News Sentiment</h3>
              </div>
              <span className="live-tag">LIVE</span>
            </div>

            <div className="sentiment-score">
              <span>Market Sentiment</span>
              <h2>POSITIVE</h2>
              <div className="sentiment-bar">
                <div />
              </div>
              <div className="sentiment-labels">
                <span>Fear</span>
                <span>Neutral</span>
                <span>Greed</span>
              </div>
            </div>

            <div className="news-item">
              <span className="news-time">09:30</span>
              <p>USD volatility expected around upcoming macro releases.</p>
            </div>

            <div className="news-item">
              <span className="news-time">08:45</span>
              <p>Gold maintains strong institutional demand.</p>
            </div>
          </div>
        </section>

        <section className="panel portfolio-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">PERFORMANCE</p>
              <h3>Portfolio Overview</h3>
            </div>
            <button className="ghost-btn">Export Report</button>
          </div>

          <div className="portfolio-grid">
            <div className="performance-card">
              <span>Win Rate</span>
              <h2>68.4%</h2>
              <p className="positive">+5.2% improvement</p>
            </div>

            <div className="performance-card">
              <span>Total Trades</span>
              <h2>247</h2>
              <p>Current period</p>
            </div>

            <div className="performance-card">
              <span>Profit Factor</span>
              <h2>2.14</h2>
              <p className="positive">Healthy performance</p>
            </div>

            <div className="performance-card">
              <span>Max Drawdown</span>
              <h2>4.8%</h2>
              <p>Risk controlled</p>
            </div>
          </div>
        </section>

        <section className="panel system-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">NEXORA CORE</p>
              <h3>Multi-Agent AI System</h3>
            </div>
            <span className="safe-tag">ALL SYSTEMS NORMAL</span>
          </div>

          <div className="agent-grid">
            <div className="agent-card">
              <div className="agent-icon">01</div>
              <strong>Market Analyst</strong>
              <span>Monitoring price action</span>
              <small>ONLINE</small>
            </div>

            <div className="agent-card">
              <div className="agent-icon">02</div>
              <strong>Quant Strategist</strong>
              <span>Evaluating strategies</span>
              <small>ONLINE</small>
            </div>

            <div className="agent-card">
              <div className="agent-icon">03</div>
              <strong>Risk Guardian</strong>
              <span>Protecting capital</span>
              <small>ONLINE</small>
            </div>

            <div className="agent-card">
              <div className="agent-icon">04</div>
              <strong>News Intelligence</strong>
              <span>Processing macro events</span>
              <small>ONLINE</small>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div>
            <strong>NEXORA</strong>
            <span>AI-Powered Forex Trading & Automation Ecosystem</span>
          </div>

          <span>© 2026 NEXORA Intelligence Systems</span>
        </footer>
      </section>
    </main>
  );
    }
