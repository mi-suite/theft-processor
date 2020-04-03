import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import {
    useContainer as routingUseContainer,
    useExpressServer as routingUseExpressServer,
} from 'routing-controllers';
import { Container } from 'typedi';

import { HealthCheck } from '../../controllers/HealthCheck';
import { API_VERSION } from '../../settings';

export const app = express();

app.use(cors());

app.use(helmet());

routingUseContainer(Container);

routingUseExpressServer(app, {
    routePrefix: API_VERSION,
    controllers: [
        HealthCheck,
    ],
});
