# NEXORA Documentation

Technical documentation, architecture, setup guides, and project specifications.
# NEXORA Backtesting Documentation

## Overview

NEXORA Backtesting is designed to test trading strategies using historical market data.

The system evaluates strategy performance before live deployment.

## Core Features

- Historical market data analysis
- Strategy signal testing
- Long and short positions
- Stop loss and take profit
- Risk management
- Position sizing
- Profit and loss calculation
- Win rate calculation
- Profit factor analysis
- Maximum drawdown calculation
- Equity curve tracking
- Performance reporting

## Project Structure

```text
backtesting/
├── data/
│   └── data_loader.py
├── strategies/
├── engine/
├── indicators/
├── risk/
├── reports/
├── config/
├── tests/
├── docs/
│   └── README.md
├── main.py
└── requirements.txt
