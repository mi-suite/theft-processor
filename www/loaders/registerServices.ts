import { Container } from 'typedi';

import { TheftService } from '../../services/TheftService';

const theftService = Container.get(TheftService);
(async (): Promise<void> => {
    await theftService.getTheftData();
})();
