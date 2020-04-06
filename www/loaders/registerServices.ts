import { Container } from 'typedi';

import { ProcessTheftDataFromQueue } from '../../services/ProcessTheftDataFromQueue';

const theftDataProcessor = Container.get(ProcessTheftDataFromQueue);
(async (): Promise<void> => {
    await theftDataProcessor.getTheftDataFromQueue();
})();
