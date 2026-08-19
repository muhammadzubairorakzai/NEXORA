# NEXORA Data Layer

Market data, forex data, gold data, news, and economic data infrastructure.
import pandas as pd
import numpy as np


class MarketDataLoader:
    """
    NEXORA Market Data Loader
    Handles historical market data for backtesting.
    """

    REQUIRED_COLUMNS = [
        "open",
        "high",
        "low",
        "close"
    ]

    def __init__(self, symbol="XAUUSD"):
        self.symbol = symbol
        self.data = None

    def load_csv(self, file_path):
        """
        Load historical market data from CSV.
        """

        data = pd.read_csv(file_path)

        data.columns = [
            column.lower().strip()
            for column in data.columns
        ]

        self.validate_data(data)

        self.data = data

        return data

    def validate_data(self, data):
        """
        Validate required market data columns.
        """

        missing_columns = [
            column
            for column in self.REQUIRED_COLUMNS
            if column not in data.columns
        ]

        if missing_columns:
            raise ValueError(
                f"Missing required columns: "
                f"{missing_columns}"
            )

        if data.empty:
            raise ValueError(
                "Market data is empty."
            )

        return True

    def clean_data(self, data):
        """
        Clean missing and invalid data.
        """

        data = data.copy()

        data = data.dropna()

        data = data.drop_duplicates()

        data = data.reset_index(
            drop=True
        )

        return data

    def add_returns(self, data):
        """
        Calculate percentage returns.
        """

        data = data.copy()

        data["returns"] = (
            data["close"]
            .pct_change()
            .fillna(0)
        )

        return data

    def add_log_returns(self, data):
        """
        Calculate logarithmic returns.
        """

        data = data.copy()

        data["log_returns"] = np.log(
            data["close"] /
            data["close"].shift(1)
        )

        data["log_returns"] = (
            data["log_returns"]
            .fillna(0)
        )

        return data

    def prepare_data(self, data):
        """
        Complete data preparation pipeline.
        """

        data = self.clean_data(data)

        data = self.add_returns(data)

        data = self.add_log_returns(data)

        self.data = data

        return data

    def get_data(self):
        """
        Return processed market data.
        """

        if self.data is None:
            raise ValueError(
                "No market data loaded."
            )

        return self.data

    def get_latest_price(self):
        """
        Return latest closing price.
        """

        if self.data is None:
            return None

        return self.data[
            "close"
        ].iloc[-1]

    def get_market_summary(self):
        """
        Return basic market statistics.
        """

        if self.data is None:
            raise ValueError(
                "No market data available."
            )

        return {
            "symbol": self.symbol,
            "total_candles": len(
                self.data
            ),
            "first_price": float(
                self.data[
                    "close"
                ].iloc[0]
            ),
            "last_price": float(
                self.data[
                    "close"
                ].iloc[-1]
            ),
            "highest_price": float(
                self.data[
                    "high"
                ].max()
            ),
            "lowest_price": float(
                self.data[
                    "low"
                ].min()
            )
        }
