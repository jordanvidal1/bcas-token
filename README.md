# Token API

## Overview

This project is a simple API for managing token records in a PostgreSQL database. It provides endpoints for creating new token records and retrieving token records by their IDs.

### What are Tokens?

In the context of the cryptocurrency industry, tokens represent digital assets that can have various utilities. They can represent assets like currencies, commodities, or even rights to access certain services or platforms. Tokens are often built on existing blockchain platforms like Ethereum or Binance Smart Chain, utilizing smart contracts to define their behavior.

Tokens play a significant role in decentralized finance (DeFi), allowing users to participate in various financial activities such as lending, borrowing, trading, and providing liquidity.

### API Endpoints

- POST /tokens: Creates a new token record in the database.
  - Request Body:
    ```json
    {
      "name": "Token Name",
      "ticker": "TKN",
      "description": "Brief description of the token."
    }
    ```
  - Response:
    ```json
    {
      "id": 1,
      "name": "Token Name",
      "ticker": "TKN",
      "description": "Brief description of the token."
    }
    ```

- GET /tokens/:id: Retrieves a token record by its ID.
  - Response:
    ```json
    {
      "id": 1,
      "name": "Token Name",
      "ticker": "TKN",
      "description": "Brief description of the token."
    }
    ```
  - If the token with the specified ID does not exist, it returns a 404 Not Found status code with the message "Token not found".

## Setup Instructions

<!-- 1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/token-api.git -->
