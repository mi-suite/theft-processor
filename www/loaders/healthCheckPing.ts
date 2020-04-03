import {
    NODE_ENV,
    PROD_SERVER,
    PORT,
} from '../../env';
import { PRODUCTION, DEVELOPMENT, API_VERSION } from '../../settings';

import http from 'http';
import https from 'https';

const APP_URL: string = NODE_ENV.match(DEVELOPMENT)
    ? `http://localhost:${PORT}`
    : PROD_SERVER;

const HTTP_PROTOCOL = NODE_ENV.match(DEVELOPMENT) ? http : https;
const PING_INTERVAL: number = 1000 * 60;

const handlePing = (): void => {
    if (!NODE_ENV.match(PRODUCTION) && !NODE_ENV.match(DEVELOPMENT)) {
        return;
    }

    setInterval((): void => {
        HTTP_PROTOCOL.get(`${APP_URL}${API_VERSION}/health`, (res) => {
            console.log('Health check complete', res.statusMessage);
        });
    }, PING_INTERVAL);
};

handlePing();
