import { Service } from 'typedi';

import { PubSub } from '../pubsub/index';

@Service()
export class TheftService {
    private pubsub: PubSub;

    public constructor (pubsub: PubSub) {
        this.pubsub = pubsub;
    }

    public async getTheftData (): Promise<any> {
        await this.pubsub.subscribe({
            topic: 'kafka-test',
            fromBeginning: true,
            callback: (message: any) => {
                if (message) {
                    console.log(true, 'message was received');
                }
            },
        });
    }
}
