import { Controller, Get } from 'routing-controllers';
import { Container } from 'typedi';

import { Redis } from '../cache/redis';
import { PG } from '../database/postgresql';

@Controller('/health')
export class HealthCheck {
    @Get('/')
    public async get (): Promise<any> {
        Container.get(PG);
        Container.get(Redis);

        return true;
    }
}
