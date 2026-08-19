# NEXORA Backtesting

Historical market testing, strategy evaluation, performance analysis, and optimization.
NEXORA Backtesting Engine

import pandas as pd
import numpy as np


class NEXORABacktestEngine:
    def __init__(
        self,
        initial_balance=10000,
        risk_per_trade=0.01,
        stop_loss_pct=0.02,
        take_profit_pct=0.04
    ):
        self.initial_balance = initial_balance
        self.balance = initial_balance
        self.risk_per_trade = risk_per_trade
        self.stop_loss_pct = stop_loss_pct
        self.take_profit_pct = take_profit_pct

        self.position = None
        self.entry_price = 0
        self.equity_curve = []
        self.trades = []

    def calculate_sma(self, data, period):
        return data["close"].rolling(window=period).mean()

    def generate_signals(self, data):
        data["sma_fast"] = self.calculate_sma(data, 10)
        data["sma_slow"] = self.calculate_sma(data, 30)

        data["signal"] = 0

        data.loc[
            data["sma_fast"] > data["sma_slow"],
            "signal"
        ] = 1

        data.loc[
            data["sma_fast"] < data["sma_slow"],
            "signal"
        ] = -1

        return data

    def calculate_position_size(self, price):
        risk_amount = self.balance * self.risk_per_trade

        stop_loss_distance = price * self.stop_loss_pct

        if stop_loss_distance == 0:
            return 0

        position_size = risk_amount / stop_loss_distance

        return position_size

    def open_position(self, price, direction, timestamp):
        position_size = self.calculate_position_size(price)

        self.position = direction
        self.entry_price = price

        self.current_trade = {
            "entry_time": timestamp,
            "entry_price": price,
            "direction": direction,
            "position_size": position_size
        }

    def close_position(self, price, timestamp, reason):
        if self.position is None:
            return

        if self.position == "LONG":
            pnl = (
                price - self.entry_price
            ) * self.current_trade["position_size"]

        elif self.position == "SHORT":
            pnl = (
                self.entry_price - price
            ) * self.current_trade["position_size"]

        else:
            pnl = 0

        self.balance += pnl

        self.current_trade.update({
            "exit_time": timestamp,
            "exit_price": price,
            "pnl": pnl,
            "reason": reason
        })

        self.trades.append(self.current_trade)

        self.position = None
        self.entry_price = 0

    def check_risk_levels(self, price, timestamp):
        if self.position is None:
            return

        if self.position == "LONG":
            stop_loss_price = (
                self.entry_price *
                (1 - self.stop_loss_pct)
            )

            take_profit_price = (
                self.entry_price *
                (1 + self.take_profit_pct)
            )

            if price <= stop_loss_price:
                self.close_position(
                    price,
                    timestamp,
                    "STOP LOSS"
                )

            elif price >= take_profit_price:
                self.close_position(
                    price,
                    timestamp,
                    "TAKE PROFIT"
                )

        elif self.position == "SHORT":
            stop_loss_price = (
                self.entry_price *
                (1 + self.stop_loss_pct)
            )

            take_profit_price = (
                self.entry_price *
                (1 - self.take_profit_pct)
            )

            if price >= stop_loss_price:
                self.close_position(
                    price,
                    timestamp,
                    "STOP LOSS"
                )

            elif price <= take_profit_price:
                self.close_position(
                    price,
                    timestamp,
                    "TAKE PROFIT"
                )

    def run_backtest(self, data):
        data = self.generate_signals(data)

        for index, row in data.iterrows():
            price = row["close"]
            signal = row["signal"]
            timestamp = index

            if pd.isna(row["sma_fast"]):
                continue

            self.check_risk_levels(
                price,
                timestamp
            )

            if self.position is None:

                if signal == 1:
                    self.open_position(
                        price,
                        "LONG",
                        timestamp
                    )

                elif signal == -1:
                    self.open_position(
                        price,
                        "SHORT",
                        timestamp
                    )

            elif self.position == "LONG" and signal == -1:

                self.close_position(
                    price,
                    timestamp,
                    "SIGNAL REVERSAL"
                )

            elif self.position == "SHORT" and signal == 1:

                self.close_position(
                    price,
                    timestamp,
                    "SIGNAL REVERSAL"
                )

            self.equity_curve.append({
                "time": timestamp,
                "equity": self.balance
            })

        if self.position is not None:
            final_price = data["close"].iloc[-1]

            self.close_position(
                final_price,
                data.index[-1],
                "END OF BACKTEST"
            )

        return self.generate_report()

    def generate_report(self):
        total_trades = len(self.trades)

        if total_trades == 0:
            return {
                "initial_balance": self.initial_balance,
                "final_balance": self.balance,
                "total_return_percent": 0,
                "total_trades": 0,
                "win_rate": 0,
                "profit_factor": 0,
                "max_drawdown_percent": 0
            }

        winning_trades = [
            trade for trade in self.trades
            if trade["pnl"] > 0
        ]

        losing_trades = [
            trade for trade in self.trades
            if trade["pnl"] < 0
        ]

        total_profit = sum(
            trade["pnl"]
            for trade in winning_trades
        )

        total_loss = abs(sum(
            trade["pnl"]
            for trade in losing_trades
        ))

        if total_loss == 0:
            profit_factor = float("inf")
        else:
            profit_factor = (
                total_profit /
                total_loss
            )

        win_rate = (
            len(winning_trades) /
            total_trades
        ) * 100

        equity_values = [
            item["equity"]
            for item in self.equity_curve
        ]

        max_drawdown = 0

        if len(equity_values) > 0:
            peak = equity_values[0]

            for equity in equity_values:
                if equity > peak:
                    peak = equity

                drawdown = (
                    (peak - equity) /
                    peak
                ) * 100

                if drawdown > max_drawdown:
                    max_drawdown = drawdown

        total_return = (
            (
                self.balance -
                self.initial_balance
            ) /
            self.initial_balance
        ) * 100

        report = {
            "initial_balance": round(
                self.initial_balance,
                2
            ),

            "final_balance": round(
                self.balance,
                2
            ),

            "total_return_percent": round(
                total_return,
                2
            ),

            "total_trades": total_trades,

            "winning_trades": len(
                winning_trades
            ),

            "losing_trades": len(
                losing_trades
            ),

            "win_rate": round(
                win_rate,
                2
            ),

            "profit_factor": round(
                profit_factor,
                2
            ),

            "max_drawdown_percent": round(
                max_drawdown,
                2
            )
        }

        return report


def create_sample_market_data():
    np.random.seed(42)

    dates = pd.date_range(
        start="2025-01-01",
        periods=500,
        freq="h"
    )

    price = 2000

    prices = []

    for _ in range(500):
        movement = np.random.normal(
            0,
            5
        )

        price += movement

        prices.append(price)

    data = pd.DataFrame({
        "close": prices
    })

    data.index = dates

    return data


def main():
    print("=" * 50)
    print("NEXORA BACKTESTING ENGINE")
    print("=" * 50)

    market_data = create_sample_market_data()

    engine = NEXORABacktestEngine(
        initial_balance=10000,
        risk_per_trade=0.01,
        stop_loss_pct=0.02,
        take_profit_pct=0.04
    )

    report = engine.run_backtest(
        market_data
    )

    print("\nBACKTEST REPORT")
    print("-" * 50)

    for key, value in report.items():
        print(
            f"{key}: {value}"
        )

    print("-" * 50)


if __name__ == "__main__":
    main()

Required packages

Create another file:

File name: "requirements.txt"

pandas
numpy
