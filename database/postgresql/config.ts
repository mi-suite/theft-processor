import {
    PG_PASSWORD,
    PG_HOST,
    PG_USER,
    PG_PORT,
    PG_NAME,
    NODE_ENV,
    HEROKU_POSTGRESQL_AMBER_URL,
    PG_TEST_DB_NAME,
} from '../../env';
import { PRODUCTION, TEST } from '../../settings';

interface IDBConfig {
    connectionString?: string;
    database?: string;
}

const DATABASE_URL: string =
    `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_NAME}`;

export let config: IDBConfig = {
    connectionString: DATABASE_URL,
};

if (NODE_ENV.match(PRODUCTION)) {
    config = {
        connectionString: HEROKU_POSTGRESQL_AMBER_URL,
    };
}

if (NODE_ENV.match(TEST)) {
    config.database = PG_TEST_DB_NAME;
}
