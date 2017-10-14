import {IRestApi} from '../../rest/i_restApi';
import {ICitiesRepository, ICitiesRepositoryOptions} from './i_citiesRepository';

export class CitiesRepository implements ICitiesRepository {
    private restApi: IRestApi;
    private departureCities: string[];
    private arrivalCities: string[];

    constructor(options: ICitiesRepositoryOptions) {
        const {restApi} = options;
        this.restApi = restApi;
    }

    public getDepartureCities(): string[] {
        return this.departureCities;
    }

    public getArrivalCities(): string[] {
        return this.arrivalCities;
    }

    public load(): Promise<void> {
        return this.restApi.fetchCities().then(({departure, arrival}) => {
            this.departureCities = departure;
            this.arrivalCities = arrival;
        });
    }
}
