/**
 * Trip is a container for one or more deals
 */
import {IDeal} from '../deal/i_deal';
import {ITrip} from './i_trip';

export class Trip implements ITrip {
    private deals: IDeal[] = [];
    private departure: string;
    private visitedCities: string[] = [];
    private arrival: string;
    private finalCost: number = 0;
    private durationInMinutes: number = 0;

    constructor(deals: IDeal[]) {
        deals.forEach(this.addDeal, this);
    }

    public getDeals(): IDeal[] {
        return this.deals.slice();
    }

    public getFinalCost(): number {
        return this.finalCost;
    }

    public getDurationInMinutes(): number {
        return this.durationInMinutes;
    }

    public getDepartureCity(): string {
        return this.departure;
    }

    public getArrivalCity(): string {
        return this.arrival;
    }

    public alreadyBeenTo(city: string): boolean {
        return this.visitedCities.indexOf(city) !== -1;
    }

    public addDeal(deal: IDeal): void {
        if (deal.departure === deal.arrival) {
            throw Error(`Departure and arrival couldn't be the same (${deal.departure})`);
        }

        if (this.deals.length > 0 && this.arrival !== deal.departure) {
            throw Error(`Next departure city (${deal.departure}) should be
            the same as previous arrival city (${this.arrival})`);
        }

        if (this.alreadyBeenTo(deal.arrival)) {
            throw Error(`We already visited ${deal.arrival}`);
        }

        this.deals.push(deal);
        this.finalCost += deal.finalCost;
        this.durationInMinutes += deal.durationInMinutes;

        if (this.deals.length === 1) {
            this.departure = deal.departure;
            this.visitedCities.push(deal.departure);
        }
        this.arrival = deal.arrival;
        this.visitedCities.push(deal.arrival);
    }
}
