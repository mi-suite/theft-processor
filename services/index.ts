import { Service } from 'typedi';

import { BaseRepository } from '../repository/index';

interface IGetCrimeData {
    model: string;
    offset: number;
    limit: number;
    caseType: string;
}

@Service()
export class CrimesService {
    private repository: BaseRepository;

    public constructor (repository: BaseRepository) {
        this.repository = repository;
    }

    public async getCrimeData (config: IGetCrimeData): Promise<any> {
        const { model, offset, limit, caseType } = config;

        const query = `
            select *
            FROM "${model}"
            WHERE "${model}"."Primary Type" = '${caseType.trim().toUpperCase()}'
            LIMIT ${limit}
            OFFSET ${offset};
        `;
        const data = await this.repository.find({
            text: query,
        });

        return data;
    }
}
