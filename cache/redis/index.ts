import redis, { RedisClient } from 'redis';
import { Service } from 'typedi';

import { REDIS_URL } from '../../env';

@Service()
export class Redis {
    public redisClient: RedisClient;

    public constructor () {
        this.redisClient = this.createClient();
    }

    /**
     *
     * @memberof Redis
     */
    private createClient = (): RedisClient => {
        const redisClient: RedisClient = redis.createClient(REDIS_URL);

        redisClient.on('connect', () => {
            console.log(
                'Redis:::createClient: Connection to redis established',
            );
        });

        redisClient.on('error', (err) => {
            throw new Error(
                `Redis:::createClient: Connection to redis failed ${err} --`,
            );
        });

        return redisClient;
    };

    /**
     *
     * @param {string} key - redis data key
     * @param {*} value - value to store
     * @memberof Redis
     */
    public addDataToRedis = (key: string, value: any): void => {
        if (value === undefined) {
            console.error('Redis:::addDataToRedis: Value is not defined');

            return;
        }

        this.redisClient.set(key, JSON.stringify(value), (err) => {
            if (err) {
                console.log('Redis:::addDataToRedis: Error writing to redis', err);

                throw err;
            }

            console.log('Redis:::addDataToRedis: Data added to redis store');
        });
    };

    /**
     *
     * @param {string} key - redis data key
     * @memberof Redis
     */
    public getDataFromRedis = async (key: string): Promise<any> =>
        new Promise((resolve, reject) => {
            this.redisClient.get(key, (err, result) => {
                if (err) {
                    reject(err);

                    throw new Error(
                        `Redis:::getDataFromRedis: Unable to retried data ${err}`,
                    );
                }

                if (result !== 'undefined') {
                    resolve(JSON.parse(result));
                }

                resolve();
            });
        });
}
