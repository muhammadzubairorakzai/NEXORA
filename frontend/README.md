# NEXORA Frontend

Luxury web interface and dashboard for the NEXORA AI Trading Ecosystem.
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEXORA Backtesting Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <header>
        <h1>NEXORA BACKTESTING</h1>
        <p>AI Trading Strategy Performance Dashboard</p>
    </header>

    <main>

        <section class="stats">

            <div class="card">
                <h3>Initial Balance</h3>
                <p id="initialBalance">$10,000</p>
            </div>

            <div class="card">
                <h3>Final Balance</h3>
                <p id="finalBalance">$10,000</p>
            </div>

            <div class="card">
                <h3>Total Return</h3>
                <p id="totalReturn">0%</p>
            </div>

            <div class="card">
                <h3>Win Rate</h3>
                <p id="winRate">0%</p>
            </div>

        </section>

        <section class="backtest-panel">

            <h2>Run Backtest</h2>

            <label>Trading Symbol</label>
            <input
                type="text"
                id="symbol"
                value="XAUUSD"
            >

            <label>Initial Balance</label>
            <input
                type="number"
                id="balance"
                value="10000"
            >

            <label>Risk Per Trade (%)</label>
            <input
                type="number"
                id="risk"
                value="1"
            >

            <button onclick="runBacktest()">
                RUN BACKTEST
            </button>

        </section>

        <section class="results">

            <h2>Backtest Results</h2>

            <div id="results">
                Waiting for backtest execution...
            </div>

        </section>

    </main>

    <script src="app.js"></script>

</body>
</html>
backtesting/frontend/dashboard.html
