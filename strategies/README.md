# NEXORA Strategies

Trading strategies, price action, trend, breakout, and strategy logic.
import pandas as pd


class StrategyEngine:
    """
    NEXORA Strategy Engine

    Generates trading signals for backtesting.
    """

    def __init__(
        self,
        fast_period=10,
        slow_period=30
    ):
        self.fast_period = fast_period
        self.slow_period = slow_period

    def add_moving_averages(
        self,
        data
    ):
        data = data.copy()

        data["sma_fast"] = (
            data["close"]
            .rolling(
                window=self.fast_period
            )
            .mean()
        )

        data["sma_slow"] = (
            data["close"]
            .rolling(
                window=self.slow_period
            )
            .mean()
        )

        return data

    def generate_signals(
        self,
        data
    ):
        """
        Generate BUY, SELL and HOLD signals.
        """

        data = self.add_moving_averages(
            data
        )

        data["signal"] = "HOLD"

        data.loc[
            data["sma_fast"] >
            data["sma_slow"],
            "signal"
        ] = "BUY"

        data.loc[
            data["sma_fast"] <
            data["sma_slow"],
            "signal"
        ] = "SELL"

        return data

    def get_signal(
        self,
        data
    ):
        """
        Return latest strategy signal.
        """

        if data.empty:
            return "HOLD"

        latest_signal = (
            data["signal"]
            .iloc[-1]
        )

        return latest_signal

    def get_strategy_info(self):
        """
        Return strategy configuration.
        """

        return {
            "strategy_name":
                "SMA_CROSSOVER",

            "fast_period":
                self.fast_period,

            "slow_period":
                self.slow_period,

            "signals":
                [
                    "BUY",
                    "SELL",
                    "HOLD"
                ]
        }
