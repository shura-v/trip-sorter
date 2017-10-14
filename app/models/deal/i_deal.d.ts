import {IRawDeal} from '../../rest/i_restApi';

export interface IDeal extends IRawDeal {
    finalCost: number;
    durationInMinutes: number;

    /**
     * `reference` cannot be used as unique id, e.g. `BBP0545` is used for two different deals,
     * and we need unique ids in React components
     */
    id: string;
}
