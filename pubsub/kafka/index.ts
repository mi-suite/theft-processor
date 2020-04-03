import {
    Kafka, Producer, logLevel, CompressionTypes, Message, Consumer,
} from 'kafkajs';
import { Service } from 'typedi';

import { KAFKA_CLIENT_ID, KAFKA_BROKERS } from '../../env/index';
import { UNCAUGHT_EXCEPTION, UNHANDLED_REJECTION } from '../../settings';

interface IPublishOptions {
    topic: string;
    message: any;
}

interface ISubscribeOptions {
    topic: string;
    fromBeginning?: boolean;
}

@Service()
export class KafkaClient {
    public kafka: Kafka;
    public producer: Producer;
    public consumer: Consumer;

    public constructor () {
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

    private connectProducer = async (): Promise<void> => {
        const CONNECTION_EVENT = 'producer.connect';

        await this.producer.connect();

        this.producer.on(CONNECTION_EVENT, () => {
            console.log('KafkaClient:::connectProducer: Producer connected');
        });
    };

    private disconnectProducer = async (): Promise<void> => {
        const DISCONNECTION_EVENT = 'producer.disconnect';

        await this.producer.disconnect();

        this.producer.on(DISCONNECTION_EVENT, () => {
            console.log('KafkaClient:::disconnectProducer: Producer disconnected');
        });
    };

    private connectConsumer = async (): Promise<void> => {
        const CONNECTION_EVENT = 'consumer.connect';

        await this.consumer.connect();

        this.consumer.on(CONNECTION_EVENT, () => {
            console.log('KafkaClient:::connectConsumer: Producer connected');
        });
    };

    private disconnectConsumer = async (): Promise<void> => {
        const DISCONNECTION_EVENT = 'consumer.disconnect';

        await this.consumer.disconnect();

        this.consumer.on(DISCONNECTION_EVENT, () => {
            console.log('KafkaClient:::connectConsumer: Producer connected');
        });
    };

    private createMessage = (message: any): Message => ({
        value: JSON.stringify(message),
    });

    private sendMessage = async (config: IPublishOptions): Promise<any> => {
        const { topic, message } = config;

        try {
            await this.producer.send({
                topic: topic,
                compression: CompressionTypes.GZIP,
                messages: Array(this.createMessage(message)),
            });
        } catch (error) {
            console.error(`KafkaClient:::sendMessage: ${error.message}`, error);
        }
    };

    public publish = async (options: IPublishOptions): Promise<any> => {
        try {
            await this.connectProducer();

            await this.sendMessage(options);
        } catch (error) {
            console.error(`KafkaClient:::publish: ${error.message}`, error);
        }
    };

    public subscribe = async (options: ISubscribeOptions): Promise<any> => {
        try {
            await this.connectConsumer();

            await this.consumer.subscribe(options);

            const data = await this.consumer.run({
                // eachBatch: async ({ batch }) => {
                //   console.log(batch)
                // },
                eachMessage: async ({ topic, partition, message }) => {
                    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
                    console.log(`- ${prefix} ${message.key}#${message.value}`);
                },
            });

            return data;
        } catch (error) {
            console.error(`KafkaClient:::publish: ${error.message}`);
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
