import { Service } from 'typedi';

import { KafkaClient } from '../kafka';
import { IPublishOptions, ISubscribeOptions } from '../kafka/kafka.interface';

import { IPubSuB } from './pubsub.interface';

@Service()
export class PubSub implements IPubSuB<IPublishOptions, ISubscribeOptions> {
    private kafkaClient: KafkaClient;

    public constructor (kafkaClient: KafkaClient) {
        this.kafkaClient = kafkaClient;
    }

    public publish = async (option: IPublishOptions): Promise<any> => {
        return await this.kafkaClient.publish(option);
    };

    public subscribe = async (option: ISubscribeOptions): Promise<any> => {
        return await this.kafkaClient.subscribe(option);
    };
}
