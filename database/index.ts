import { PG } from './postgresql';

import fs from 'fs';

const pgClient = new PG();
const directoryPath = `${__dirname}/sql/`;

fs.readdir(directoryPath, (err: any, files: string[]) => {
    if (err) {
        console.log('Error occured at read directory');

        throw err;
    };

    Promise.all(
        files.map((file) => {
            return fs.readFile(`${directoryPath}${file}`, async (err: any, data: any) => {
                if (err) {
                    console.log('Error occured at read file');
                    throw err;
                };

                const sqlString = data.toString();

                await pgClient.query({
                    text: sqlString,
                });
            });
        }),
    );
});
