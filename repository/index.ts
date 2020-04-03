import { Service } from 'typedi';

import { PG, IQueryConfig } from '../database/postgresql';

import { IRepo } from './repository.interface';

@Service()
export class BaseRepository implements IRepo {
    public pgInstance: PG;

    public constructor (pgInstance: PG) {
        this.pgInstance = pgInstance;
    }

    public find = async (queryConfig: IQueryConfig): Promise<any> => {
        try {
            const result = await this.pgInstance.query(queryConfig);
            const data = result.rows;

            return data;
        } catch (error) {
            return error;
        }
    };
}
