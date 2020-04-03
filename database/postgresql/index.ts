import { Pool, QueryResult } from 'pg';
import { Service } from 'typedi';

import { config } from './config';

export interface IQueryConfig {
    text: string;
    values?: any;
}

@Service()
export class PG {
    public db: Pool;

    public constructor () {
        this.db = new Pool(config);

        this.createConnection();
    }

    private createConnection = (): void => {
        this.db.connect((err) => {
            if (err) {
                throw new Error(
                    `PG:::createConnection:
                    Unable to establish a connection to pg database`,
                );
            }

            console.log(
                'PG:::createConnection: Connection to pg database established',
            );
        });
    };

    public query = async (queryConfig: IQueryConfig): Promise<any> => {
        try {
            const start = Date.now();
            const executedQuery: QueryResult<any> = await this.db.query(queryConfig);
            const duration = Date.now() - start;
            console.log(
                `Executed query: ${JSON.stringify({
                    query: queryConfig.text,
                    duration: duration,
                })}`,
            );

            return executedQuery;
        } catch (error) {
            console.error(`PG:::query: Error eexcuting query::::::::${error}`);

            return error;
        }
    };
}
