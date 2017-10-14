import {IDealsRepository} from '../dealsRepository/i_dealsRepository';
import {ITrip} from '../trip/i_trip';

export enum ESortingTypes {
    Cheapest = 'finalCost',
    Fastest = 'durationInMinutes',
}

export interface ITripSorter {
    findBestTrip(departure: string, arrival: string, sortBy: ESortingTypes): ITrip;
}

export interface ITripsDictionary {
    [departure: string]: {
        [arrival: string]: ITrip,
    };
}

export interface ITripSorterOptions {
    deals: IDealsRepository;
}
