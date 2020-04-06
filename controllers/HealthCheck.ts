import { Controller, Get } from 'routing-controllers';
import { Container } from 'typedi';

import { Redis } from '../cache/redis';
import { PG } from '../database/postgresql';
import { KafkaClient } from '../kafka';

@Controller('/health')
export class HealthCheck {
    @Get('/')
    public async get (): Promise<boolean> {
        Container.get(PG);
        Container.get(Redis);
        await Container.get(KafkaClient).connectProducer();
        await Container.get(KafkaClient).disconnectProducer();

        return true;
    }
}
