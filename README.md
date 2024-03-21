# Token API

## Overview

### What are tokens?

In the context of the cryptocurrency industry, tokens represent digital assets that can have various utilities. They can represent assets like currencies, commodities, or even rights to access certain services or platforms. Tokens are often built on existing blockchain platforms like Ethereum or Binance Smart Chain, utilizing smart contracts to define their behaviour.

Tokens play a significant role in decentralized finance (DeFi), allowing users to participate in various financial activities such as lending, borrowing, trading, and providing liquidity.

### API rationale

This project is a simple API for managing token records in a PostgreSQL database. It provides endpoints for creating new token records and retrieving token records by ID. This API would aim to simplify the process of handling token-related data, thereby accelerating the development of innovative blockchain solutions and fostering broader adoption of tokenized assets.

This functionality would be essential for applications dealing with tokenized assets, decentralized finance (DeFi) platforms, non-fungible tokens (NFTs), and various other blockchain-based use cases.

## How to Use the API

You can access the API at [https://bcas-token.onrender.com/](https://bcas-token.onrender.com/).

The Swagger documentation is available at [https://bcas-token.onrender.com/api-docs](https://bcas-token.onrender.com/api-docs). Use the provided endpoints to create and retrieve token records.

### API Endpoints

-   POST /tokens: Creates a new token record in the database.

    -   Request Body:
        ```json
        {
            "name": "Token Name",
            "ticker": "TKN",
            "description": "Brief description of the token."
        }
        ```
    -   Response:
        ```json
        {
            "id": 1,
            "name": "Token Name",
            "ticker": "TKN",
            "description": "Brief description of the token."
        }
        ```

-   GET /tokens/:id: Retrieves a token record by its ID.
    -   Response:
        ```json
        {
            "id": 1,
            "name": "Token Name",
            "ticker": "TKN",
            "description": "Brief description of the token."
        }
        ```
    -   If the token with the specified ID does not exist, it returns a 404 Not Found status code with the response:
        ```json
        {
            "error": {
                "message": "Token not found"
            }
        }
        ```

## How to access the database

You can access the database using the following credentials:

-   host: dpg-cntv82821fec73bki450-a.frankfurt-postgres.render.com
-   name: bcas_token_postgresql
-   user: bcas_token_postgresql_user
-   password: QOFt8t3HVuu4qupfwGvyRCupHxGQmy71

or

-   connection_string: [postgres://bcas_token_postgresql_user:QOFt8t3HVuu4qupfwGvyRCupHxGQmy71@dpg-cntv82821fec73bki450-a.frankfurt-postgres.render.com/bcas_token_postgresql](postgres://bcas_token_postgresql_user:QOFt8t3HVuu4qupfwGvyRCupHxGQmy71@dpg-cntv82821fec73bki450-a.frankfurt-postgres.render.com/bcas_token_postgresql)

## How to setup the project locally

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/jordanvidal1/bcas-token.git

# Navigate to the project directory
cd bcas-token

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
echo "PORT=3000" >> .env
echo "DB_HOST=your_database_host" >> .env
echo "DB_USER=your_database_username" >> .env
echo "DB_PASSWORD=your_database_password" >> .env
echo "DB_NAME=your_database_name" >> .env

# Start the server
npm dev
# or
yarn dev
```
