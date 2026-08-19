# NEXORA Execution

Trade execution infrastructure for paper, demo, and future live trading environments.
from dataclasses import dataclass
from typing import Optional


@dataclass
class Position:
    symbol: str
    side: str
    entry_price: float
    quantity: float
    stop_loss: Optional[float] = None
    take_profit: Optional[float] = None


class ExecutionEngine:
    """
    NEXORA Backtesting Execution Engine

    Simulates order execution for historical backtesting.
    """

    def __init__(
        self,
        commission_rate=0.0002,
        slippage_rate=0.0001
    ):
        self.commission_rate = commission_rate
        self.slippage_rate = slippage_rate

        self.current_position = None
        self.orders = []
        self.executed_trades = []

    def apply_slippage(
        self,
        price,
        side
    ):
        """
        Apply simulated market slippage.
        """

        if side == "BUY":
            return price * (
                1 + self.slippage_rate
            )

        if side == "SELL":
            return price * (
                1 - self.slippage_rate
            )

        return price

    def calculate_commission(
        self,
        price,
        quantity
    ):
        """
        Calculate trading commission.
        """

        trade_value = price * quantity

        commission = (
            trade_value *
            self.commission_rate
        )

        return commission

    def execute_buy(
        self,
        symbol,
        price,
        quantity,
        stop_loss=None,
        take_profit=None,
        timestamp=None
    ):
        """
        Simulate BUY order execution.
        """

        executed_price = self.apply_slippage(
            price,
            "BUY"
        )

        commission = self.calculate_commission(
            executed_price,
            quantity
        )

        position = Position(
            symbol=symbol,
            side="LONG",
            entry_price=executed_price,
            quantity=quantity,
            stop_loss=stop_loss,
            take_profit=take_profit
        )

        self.current_position = position

        order = {
            "timestamp": timestamp,
            "symbol": symbol,
            "side": "BUY",
            "price": executed_price,
            "quantity": quantity,
            "commission": commission,
            "status": "FILLED"
        }

        self.orders.append(order)

        return order

    def execute_sell(
        self,
        symbol,
        price,
        quantity,
        timestamp=None
    ):
        """
        Simulate SELL order execution.
        """

        executed_price = self.apply_slippage(
            price,
            "SELL"
        )

        commission = self.calculate_commission(
            executed_price,
            quantity
        )

        order = {
            "timestamp": timestamp,
            "symbol": symbol,
            "side": "SELL",
            "price": executed_price,
            "quantity": quantity,
            "commission": commission,
            "status": "FILLED"
        }

        self.orders.append(order)

        return order

    def close_position(
        self,
        price,
        timestamp=None,
        reason="MANUAL"
    ):
        """
        Close the active position and calculate PnL.
        """

        if self.current_position is None:
            return None

        position = self.current_position

        if position.side == "LONG":
            exit_price = self.apply_slippage(
                price,
                "SELL"
            )

            gross_pnl = (
               
