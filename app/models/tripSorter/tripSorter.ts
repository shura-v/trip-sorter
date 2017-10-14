/**
 * We have unordered graph `deals` - a collection of edges from which we are trying to find the best
 * possible path (ITrip) from `departure` to `arrival`.
 *
 * No path can go into the same node twice (see `alreadyBeenTo()` method).
 *
 * When we traverse the graph we sum up the lengths of the edges:
 * `durationInMinutes` or `finalCost` – depends on the setting.
 *
 * If current path arrives at some node earlier (or more cheaper) than the current path will become
 * the best path and we will continue the job by extending this path further.
 *
 * If current path (or trip) arrives at some node later (or more costly), then this trip ends.
 */

import {IDealsRepository} from '../dealsRepository/i_dealsRepository';
import {ITrip} from '../trip/i_trip';
import {Trip} from '../trip/trip';
import {ESortingTypes, ITripsDictionary, ITripSorter, ITripSorterOptions} from './i_tripSorter';

export class TripSorter implements ITripSorter {
    private sortBy: ESortingTypes;
    private departure: string;
    private arrival: string;
    private deals: IDealsRepository;
    private bestTrips: ITripsDictionary;

    constructor(options: ITripSorterOptions) {
        const {deals} = options;
        this.deals = deals;
    }

    public findBestTrip(departure: string, arrival: string, sortBy: ESortingTypes): ITrip {
        if (!this.deals.hasDealWithDepartureFrom(departure)) {
            throw Error(`Unknown departure city: ${departure}`);
        }
        if (!this.deals.hasDealWithArrivalTo(arrival)) {
            throw Error(`Unknown arrival city: ${arrival}`);
        }

        this.departure = departure;
        this.arrival = arrival;
        this.sortBy = sortBy;
        this.bestTrips = {};

        this.deals.getDealsWithDepartureFrom(this.departure)
            .map((deal) => new Trip([deal]))
            .forEach(this.continueTrip, this);
        return this.bestTrips[this.departure] && this.bestTrips[this.departure][this.arrival];
    }

    private continueTrip(trip: ITrip): void {
        const tripDeparture = trip.getDepartureCity();
        const tripArrival = trip.getArrivalCity();

        const noRecordsForCurrentDepartureCity = !this.bestTrips.hasOwnProperty(tripDeparture);
        if (noRecordsForCurrentDepartureCity) {
            this.bestTrips[tripDeparture] = {};
        }

        const noRecordsForCurrentArrivalCity = !this.bestTrips[tripDeparture].hasOwnProperty(tripArrival);
        if (
            noRecordsForCurrentArrivalCity ||
            this.weFoundNewBestTrip(trip, this.bestTrips[tripDeparture][tripArrival])
        ) {
            this.bestTrips[tripDeparture][tripArrival] = trip;
        }

        const nextDeals = this.deals.getDealsWithDepartureFrom(tripArrival);
        if (nextDeals && this.shouldContinueSearch(trip)) {
            nextDeals
                .filter((deal) => !trip.alreadyBeenTo(deal.arrival))
                .map((deal) => new Trip(trip.getDeals().concat(deal)))
                .forEach(this.continueTrip, this);
        }
    }

    private noFinishedPathFound(): boolean {
        return !this.bestTrips.hasOwnProperty(this.departure)
            || !this.bestTrips[this.departure].hasOwnProperty(this.arrival);
    }

    private weFoundNewBestTrip(candidate: ITrip, existing: ITrip): boolean {
        return this.sortBy === ESortingTypes.Fastest
            ? candidate.getDurationInMinutes() < existing.getDurationInMinutes()
            : candidate.getFinalCost() < existing.getFinalCost();
    }

    private shouldContinueSearch(trip: ITrip): boolean {
        return this.noFinishedPathFound()
            || this.weFoundNewBestTrip(trip, this.bestTrips[this.departure][this.arrival]);
    }
}
