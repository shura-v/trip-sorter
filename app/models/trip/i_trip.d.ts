import {IDeal} from '../deal/i_deal';

export interface ITrip {
    getFinalCost(): number;

    getDurationInMinutes(): number;

    getArrivalCity(): string;

    getDepartureCity(): string;

    getDeals(): IDeal[];

    addDeal(deal: IDeal): void;

    alreadyBeenTo(city: string): boolean;
}
