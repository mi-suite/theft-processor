import dotenv from 'dotenv-safe';

dotenv.config({
    allowEmptyValues: true,
});

// environments
export const NODE_ENV = process.env.NODE_ENV || '';

export const PORT = process.env.PORT || 7000;
export const PROD_SERVER = process.env.PROD_SERVER || '';

// postgresql credentials
export const PG_TEST_DB_NAME = process.env.PG_TEST_DB_NAME;
export const HEROKU_POSTGRESQL_AMBER_URL =
    process.env.HEROKU_POSTGRESQL_AMBER_URL;

export const PG_USER = process.env.PG_USER;
export const PG_PASSWORD = process.env.PG_PASSWORD;
export const PG_HOST = process.env.PG_HOST;
export const PG_PORT = process.env.PG_PORT;
export const PG_NAME = process.env.PG_NAME;

// redis
export const REDIS_URL = process.env.REDIS_URL || '';

// kafka
export const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || '';
export const KAFKA_BROKERS = [
    // process.env.KAFKA_BROKER_1 || '',
    process.env.KAFKA_BROKER_2 || '',
];
export const KAFKA_THEFT_TOPIC = process.env.KAFKA_THEFT_TOPIC || '';
