import { Service } from 'typedi';

import { KAFKA_THEFT_TOPIC } from '../env';
import { PubSub } from '../pubsub';
import { BaseRepository } from '../repository';

interface IMessagePayload {
    key: string;
    value: any;
}

@Service()
export class ProcessTheftDataFromQueue {
    private pubsub: PubSub;
    private repository: BaseRepository;

    public constructor (pubsub: PubSub, repository: BaseRepository) {
        this.pubsub = pubsub;
        this.repository = repository;
    }

    public getTheftDataFromQueue = async (): Promise<void> => {
        await this.pubsub.subscribe({
            topic: KAFKA_THEFT_TOPIC,
            fromBeginning: true,
            callback: this.writeDataToDB,
        });
    };

    public writeDataToDB = async (message: IMessagePayload): Promise<void> => {
        const { value } = message;

        if (!value) {
            return;
        }

        const MODEL = 'crimes.theft';
        let parsedData: any;

        try {
            parsedData = JSON.parse(value);
        } catch (error) {
            console.log(`
            ProcessTheftDataFromQueue:::writeDataToDB: Error occured parsing message to JSON
            `);
        }

        await this.repository.bulkInsert(parsedData, MODEL);
    };
}
