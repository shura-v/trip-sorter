import {groupBy, map, uniq} from 'lodash';
import {IRestApi} from '../../rest/i_restApi';
import {Deal} from '../deal/deal';
import {IDeal} from '../deal/i_deal';
import {IDealsRepository} from './i_dealsRepository';

interface IDealsByDepartureOrArrival {
    [departureOrArrival: string]: IDeal[];
}

interface IDealsRepositoryOptions {
    restApi: IRestApi;
}

export class DealsRepository implements IDealsRepository {
    private restApi: IRestApi;
    private currency: string;
    private arrivalCities: string[];
    private deals: IDeal[];
    private dealsByDeparture: IDealsByDepartureOrArrival;

    constructor(options: IDealsRepositoryOptions) {
        const {restApi} = options;
        this.restApi = restApi;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public getDealsWithDepartureFrom(departure: string): IDeal[] {
        return this.dealsByDeparture[departure];
    }

    public hasDealWithArrivalTo(arrival: string): boolean {
        return this.arrivalCities.indexOf(arrival) !== -1;
    }

    public hasDealWithDepartureFrom(departure: string): boolean {
        return this.dealsByDeparture.hasOwnProperty(departure);
    }

    public load(): Promise<void> {
        return this.restApi.fetchDeals().then(({currency, deals}) => {
            this.currency = currency;
            this.deals = deals.map((rawDeal) => new Deal(rawDeal));
            this.dealsByDeparture = groupBy(this.deals, 'departure');
            this.arrivalCities = uniq(map(this.deals, 'arrival'));
        });
    }
}
