# NEXORA Risk Engine

Risk management layer of the NEXORA trading ecosystem.

Responsibilities:
- Risk percentage calculation
- Position sizing
- Stop-loss and take-profit management
- Drawdown monitoring
- Exposure management
- Risk protection rules
class RiskEngine:
    """
    NEXORA Backtesting Risk Engine

    Handles risk management, position sizing,
    drawdown protection and trade validation.
    """

    def __init__(
        self,
        initial_balance=10000,
        risk_per_trade=0.01,
        max_daily_loss=0.05,
        max_drawdown=0.10,
        max_open_positions=1
    ):
        self.initial_balance = initial_balance
        self.current_balance = initial_balance

        self.risk_per_trade = risk_per_trade
        self.max_daily_loss = max_daily_loss
        self.max_drawdown = max_drawdown
        self.max_open_positions = max_open_positions

        self.peak_balance = initial_balance
        self.daily_start_balance = initial_balance
        self.open_positions = 0

        self.trading_enabled = True

    def calculate_risk_amount(self):
        """
        Calculate maximum money risked per trade.
        """

        return (
            self.current_balance *
            self.risk_per_trade
        )

    def calculate_position_size(
        self,
        entry_price,
        stop_loss_price
    ):
        """
        Calculate position size based on risk.
        """

        risk_amount = (
            self.calculate_risk_amount()
        )

        price_risk = abs(
            entry_price -
            stop_loss_price
        )

        if price_risk <= 0:
            return 0

        position_size = (
            risk_amount /
            price_risk
        )

        return position_size

    def calculate_risk_reward(
        self,
        entry_price,
        stop_loss_price,
        take_profit_price
    ):
        """
        Calculate Risk / Reward Ratio.
        """

        risk = abs(
            entry_price -
            stop_loss_price
        )

        reward = abs(
            take_profit_price -
            entry_price
        )

        if risk == 0:
            return 0

        return reward / risk

    def update_balance(
        self,
        pnl
    ):
        """
        Update balance after a trade.
        """

        self.current_balance += pnl

        if (
            self.current_balance >
            self.peak_balance
        ):
            self.peak_balance = (
                self.current_balance
            )

        self.check_risk_limits()

    def calculate_drawdown(self):
        """
        Calculate current drawdown percentage.
        """

        if self.peak_balance <= 0:
            return 0

        drawdown = (
            (
                self.peak_balance -
                self.current_balance
            )
            /
            self.peak_balance
        ) * 100

        return drawdown

    def calculate_daily_loss(self):
        """
        Calculate daily loss percentage.
        """

        if self.daily_start_balance <= 0:
            return 0

        daily_loss = (
            (
                self.daily_start_balance -
                self.current_balance
            )
            /
            self.daily_start_balance
        ) * 100

        return max(
            daily_loss,
            0
        )

    def check_risk_limits(self):
        """
        Check daily loss and maximum drawdown.
        """

        drawdown_percent = (
            self.calculate_drawdown()
        )

        daily_loss_percent = (
            self.calculate_daily_loss()
        )

        max_drawdown_percent = (
            self.max_drawdown * 100
        )

        max_daily_loss_percent = (
            self.max_daily_loss * 100
        )

        if (
            drawdown_percent >=
            max_drawdown_percent
        ):
            self.trading_enabled = False

            return {
                "allowed": False,
                "reason": "MAX_DRAWDOWN_REACHED"
            }

        if (
            daily_loss_percent >=
            max_daily_loss_percent
        ):
            self.trading_enabled = False

            return {
                "allowed": False,
                "reason": "MAX_DAILY_LOSS_REACHED"
            }

        return {
            "allowed": True,
            "reason": "RISK_OK"
        }

    def can_open_position(self):
        """
        Check if a new trade is allowed.
        """

        if not self.trading_enabled:
            return False

        if (
            self.open_positions >=
            self.max_open_positions
        ):
            return False

        return True

    def open_position(self):
        """
        Register an open position.
        """

        if not self.can_open_position():
            return False

        self.open_positions += 1

        return True

    def close_position(
        self,
        pnl
    ):
        """
        Close position and update balance.
        """

        if self.open_positions > 0:
            self.open_positions -= 1

        self.update_balance(pnl)

    def reset_daily_risk(self):
        """
        Reset daily trading limits.
        """

        self.daily_start_balance = (
            self.current_balance
        )

        if (
            self.calculate_drawdown()
            <
            self.max_drawdown * 100
        ):
            self.trading_enabled = True

    def get_risk_summary(self):
        """
        Return complete risk information.
        """

        return {
            "initial_balance":
                round(
                    self.initial_balance,
                    2
                ),

            "current_balance":
                round(
                    self.current_balance,
                    2
                ),

            "peak_balance":
                round(
                    self.peak_balance,
                    2
                ),

            "drawdown_percent":
                round(
                    self.calculate_drawdown(),
                    2
                ),

            "daily_loss_percent":
                round(
                    self.calculate_daily_loss(),
                    2
                ),

            "risk_per_trade_percent":
                self.risk_per_trade * 100,

            "max_daily_loss_percent":
                self.max_daily_loss * 100,

            "max_drawdown_percent":
                self.max_drawdown * 100,

            "open_positions":
                self.open_positions,

            "trading_enabled":
                self.trading_enabled
        }
  backtesting/risk/risk_engine.py
