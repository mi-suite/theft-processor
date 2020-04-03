import {
    Kafka, Producer, logLevel, CompressionTypes, Message,
} from 'kafkajs';
import { Service } from 'typedi';

import { KAFKA_CLIENT_ID, KAFKA_BROKERS } from '../../env/index';
import { UNCAUGHT_EXCEPTION, UNHANDLED_REJECTION } from '../../settings';

interface IPublishOptions {
    topic: string;
    message: any;
}

@Service()
export class KafkaClient {
    public kafka: Kafka;
    public producer: Producer;

    public constructor () {
        this.kafka = new Kafka({
            clientId: KAFKA_CLIENT_ID,
            brokers: KAFKA_BROKERS,
            logLevel: logLevel.DEBUG,
        });
        this.producer = this.kafka.producer();

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

    private createMessage = (message: any): Message => ({
        value: JSON.stringify(message),
    });

    public sendMessage = async (config: IPublishOptions): Promise<any> => {
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

    private bindSignalTraps = (): void => {
        const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

        signals.forEach((type) => {
            process.once(type, async () => {
                try {
                    await this.disconnectProducer();
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
                    process.exit(0);
                } catch (_) {
                    process.exit(1);
                }
            });
        });
    };
}
