import {map, uniq} from 'lodash';
import {DepartureOrArrival, IDealsResponse, IDepartureAndArrivalCities, IRestApi, IRestApiUrls} from './i_restApi';

export const DEFAULT_API_URL: string = require('./response'); // tslint:disable-line:no-var-requires

export class RestApi implements IRestApi {
    constructor(private urls: IRestApiUrls) {
    }

    public fetchCities(): Promise<IDepartureAndArrivalCities> {
        return this.fetchDeals()
            .then(({deals}) => {
                const getCities = (departureOrArrival: DepartureOrArrival): string[] => {
                    return uniq(map(deals, departureOrArrival));
                };

                return {
                    arrival: getCities('arrival'),
                    departure: getCities('departure'),
                };
            });
    }

    public fetchDeals(): Promise<IDealsResponse> {
        return fetch(this.urls.deals)
            .then((response) => response.json());
    }
}
