# NEXORA Trading Engine

Core trading intelligence and market analysis system.

Responsibilities:
- Forex market scanning
- Market trend detection
- Price action analysis
- Signal generation
- Trading strategy integration
- Trade workflow management
from dataclasses import dataclass
from typing import Optional, List, Dict


@dataclass
class Trade:
    symbol: str
    side: str
    entry_price: float
    quantity: float
    entry_time: Optional[str] = None
    stop_loss: Optional[float] = None
    take_profit: Optional[float] = None

    exit_price: Optional[float] = None
    exit_time: Optional[str] = None
    pnl: float = 0.0
    status: str = "OPEN"


class TradingEngine:
    """
    NEXORA Trading Engine

    Manages:
    - BUY / SELL execution
    - LONG / SHORT positions
    - Stop Loss
    - Take Profit
    - Position management
    - PnL calculation
    - Trade history
    """

    def __init__(
        self,
        initial_balance=10000.0,
        commission_rate=0.0002
    ):
        self.initial_balance = float(
            initial_balance
        )

        self.balance = float(
            initial_balance
        )

        self.equity = float(
            initial_balance
        )

        self.commission_rate = float(
            commission_rate
        )

        self.open_trade: Optional[
            Trade
        ] = None

        self.trade_history: List[
            Trade
        ] = []

    def calculate_commission(
        self,
        price,
        quantity
    ):
        trade_value = (
            float(price) *
            float(quantity)
        )

        return (
            trade_value *
            self.commission_rate
        )

    def can_open_trade(self):
        """
        Only one position at a time.
        """

        return self.open_trade is None

    def open_trade_position(
        self,
        symbol,
        side,
        price,
        quantity,
        timestamp=None,
        stop_loss=None,
        take_profit=None
    ):
        """
        Open a LONG or SHORT trade.
        """

        side = side.upper()

        if side not in [
            "LONG",
            "SHORT"
        ]:
            raise ValueError(
                "Side must be LONG or SHORT."
            )

        if not self.can_open_trade():
            return {
                "success": False,
                "message":
                    "Position already open."
            }

        if price <= 0:
            raise ValueError(
                "Price must be greater than zero."
            )

        if quantity <= 0:
            raise ValueError(
                "Quantity must be greater than zero."
            )

        entry_commission = (
            self.calculate_commission(
                price,
                quantity
            )
        )

        if entry_commission > self.balance:
            return {
                "success": False,
                "message":
                    "Insufficient balance."
            }

        self.balance -= (
            entry_commission
        )

        trade = Trade(
            symbol=symbol,
            side=side,
            entry_price=float(price),
            quantity=float(quantity),
            entry_time=timestamp,
            stop_loss=stop_loss,
            take_profit=take_profit
        )

        self.open_trade = trade

        return {
            "success": True,
            "message":
                f"{side} position opened.",
            "trade": trade
        }

    def calculate_pnl(
        self,
        trade,
        current_price
    ):
        """
        Calculate unrealized or realized PnL.
        """

        if trade.side == "LONG":
            pnl = (
                current_price -
                trade.entry_price
            ) * trade.quantity

        else:
            pnl = (
                trade.entry_price -
                current_price
            ) * trade.quantity

        return pnl

    def check_exit_conditions(
        self,
        current_price
    ):
        """
        Check Stop Loss and Take Profit.
        """

        if self.open_trade is None:
            return None

        trade = self.open_trade

        if trade.side == "LONG":

            if (
                trade.stop_loss is not None
                and current_price <=
                trade.stop_loss
            ):
                return "STOP_LOSS"

            if (
                trade.take_profit is not None
                and current_price >=
                trade.take_profit
            ):
                return "TAKE_PROFIT"

        if trade.side == "SHORT":

            if (
                trade.stop_loss is not None
                and current_price >=
                trade.stop_loss
            ):
                return "STOP_LOSS"

            if (
                trade.take_profit is not None
                and current_price <=
                trade.take_profit
            ):
                return "TAKE_PROFIT"

        return None

    def close_trade(
        self,
        price,
        timestamp=None,
        reason="MANUAL_CLOSE"
    ):
        """
        Close current trade.
        """

        if self.open_trade is None:
            return {
                "success": False,
                "message":
                    "No open trade."
            }

        trade = self.open_trade

        gross_pnl = (
            self.calculate_pnl(
                trade,
                float(price)
            )
        )

        exit_commission = (
            self.calculate_commission(
                price,
                trade.quantity
            )
        )

        net_pnl = (
            gross_pnl -
            exit_commission
        )

        self.balance += (
            gross_pnl -
            exit_commission
        )

        trade.exit_price =
