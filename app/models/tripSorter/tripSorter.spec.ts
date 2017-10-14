import * as assert from 'assert';
import {IDeal} from '../deal/i_deal';
import {ESortingTypes} from './i_tripSorter';
import {TripSorter} from './tripSorter';

describe('TripSorter', () => {
    describe('#findBestTrip()', () => {
        it('Should find a great trip', () => {
            const deals = {
                load(): Promise<void> {
                    return new Promise((resolve) => resolve());
                },
                getCurrency(): string {
                    return 'EUR';
                },
                getDealsWithDepartureFrom(): IDeal[] {
                    return [{
                        arrival: 'Dubai',
                        cost: Infinity,
                        departure: 'Moscow',
                        discount: Infinity,
                        duration: {
                            h: ':)',
                            m: ':)',
                        },
                        durationInMinutes: -Infinity,
                        finalCost: -Infinity,
                        id: 'Best Trip',
                        reference: '',
                        transport: 'airplane',
                    }];
                },
                hasDealWithDepartureFrom(): boolean {
                    return Boolean('Of course!');
                },
                hasDealWithArrivalTo(): boolean {
                    return Boolean('Sure');
                },
            };

            const tripSorter = new TripSorter({deals});
            const foundTrip = tripSorter.findBestTrip('Moscow', 'Dubai', ESortingTypes.Fastest);
            assert(foundTrip !== undefined);
        });
    });
});
