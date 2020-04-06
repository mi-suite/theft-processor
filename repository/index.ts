import { Service } from 'typedi';

import { PG, IQueryConfig } from '../database/postgresql';
import { flattenArray, expandQueryValues } from '../utils';

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

    public bulkInsert = async (data: any[], model: string): Promise<void> => {
        const column = Object.keys(data[0]);
        const columnCount = column.length;
        const columnToString = column
            .map((value) => `"${value}"`)
            .join(', ');

        const nestColumns: any[] = [];
        data.forEach((value) => {
            const extractColumns = Object.values(value);

            nestColumns.push(extractColumns);
        });

        const queryValues = flattenArray(nestColumns);

        const result = await this.pgInstance.query({
            text: `INSERT INTO "${model}" (${columnToString}) VALUES ${expandQueryValues(data.length, columnCount)}`,
            values: queryValues,
        });

        return result.rows;
    };
}
