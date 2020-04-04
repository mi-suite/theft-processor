import {
    Kafka, Producer, logLevel, CompressionTypes, Message, Consumer,
} from 'kafkajs';
import { Service } from 'typedi';

import { KAFKA_CLIENT_ID, KAFKA_BROKERS } from '../env/index';
import { IPubSuB } from '../pubsub/pubsub.interface';
import { UNCAUGHT_EXCEPTION, UNHANDLED_REJECTION } from '../settings';

import { IPublishOptions, ISubscribeOptions } from './kafka.interface';

@Service()
export class KafkaClient implements IPubSuB<IPublishOptions, ISubscribeOptions> {
    public kafka: Kafka;
    public producer: Producer;
    public consumer: Consumer;

    public constructor () {
        console.log(KAFKA_BROKERS, 'KAFKA_BROKERS');

        this.kafka = new Kafka({
            clientId: KAFKA_CLIENT_ID,
            brokers: KAFKA_BROKERS,
            logLevel: logLevel.INFO,
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'test-group' });

        this.bindSignalTraps();
        this.bindErrorTraps();
    }

    public connectProducer = async (): Promise<void> => {
        const CONNECTION_EVENT = 'producer.connect';

        await this.producer.connect();

        this.producer.on(CONNECTION_EVENT, () => {
            console.log('KafkaClient:::connectProducer: Producer connected');
        });
    };

    public disconnectProducer = async (): Promise<void> => {
        const DISCONNECTION_EVENT = 'producer.disconnect';

        await this.producer.disconnect();

        this.producer.on(DISCONNECTION_EVENT, () => {
            console.log('KafkaClient:::disconnectProducer: Producer disconnected');
        });
    };

    public connectConsumer = async (): Promise<void> => {
        const CONNECTION_EVENT = 'consumer.connect';

        await this.consumer.connect();

        this.consumer.on(CONNECTION_EVENT, () => {
            console.log('KafkaClient:::connectConsumer: Producer connected');
        });
    };

    public disconnectConsumer = async (): Promise<void> => {
        const DISCONNECTION_EVENT = 'consumer.disconnect';

        await this.consumer.disconnect();

        this.consumer.on(DISCONNECTION_EVENT, () => {
            console.log('KafkaClient:::connectConsumer: Producer connected');
        });
    };

    private createMessage = (message: any): Message => ({
        value: JSON.stringify(message),
    });

    public publish = async (options: IPublishOptions): Promise<any> => {
        try {
            const { topic, message } = options;

            await this.connectProducer();

            await this.producer.send({
                topic: topic,
                compression: CompressionTypes.GZIP,
                messages: Array(this.createMessage(message)),
            });
        } catch (error) {
            console.error(`KafkaClient:::publish: ${error.message}`, error);
        }
    };

    public subscribe = async (options: ISubscribeOptions): Promise<any> => {
        const { callback } = options;

        try {
            await this.connectConsumer();

            Reflect.deleteProperty(options, 'callback');

            await this.consumer.subscribe(options);

            await this.consumer.run({
                eachMessage: async ({ message }) => {
                    if (callback) {
                        callback(message);
                    }
                },
            });
        } catch (error) {
            console.error(`KafkaClient:::subscribe: ${error.message}`);
        }
    };

    private bindSignalTraps = (): void => {
        const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

        signals.forEach((type) => {
            process.once(type, async () => {
                try {
                    await this.disconnectProducer();
                    await this.disconnectConsumer();
                } finally {
                    process.kill(process.pid, type);
                }
            });
        });
    };

    private bindErrorTraps = (): void => {
        const errorTypes: any[] = [UNHANDLED_REJECTION, UNCAUGHT_EXCEPTION];

        errorTypes.forEach((type) => {
            process.on(type, async () => {
                try {
                    await this.disconnectProducer();
                    await this.disconnectConsumer();
                    process.exit(0);
                } catch (_) {
                    process.exit(1);
                }
            });
        });
    };
}
