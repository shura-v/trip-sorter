import {IDeal} from '../deal/i_deal';

export interface IDealsRepository {
    load(): Promise<void>;

    getCurrency(): string;

    getDealsWithDepartureFrom(departure: string): IDeal[];

    hasDealWithDepartureFrom(departure: string): boolean;

    hasDealWithArrivalTo(arrival: string): boolean;
}
