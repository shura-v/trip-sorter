import {IRestApi} from '../../rest/i_restApi';

export interface ICitiesRepository {
    load(): Promise<void>;

    getDepartureCities(): string[];

    getArrivalCities(): string[];
}

export interface ICitiesRepositoryOptions {
    restApi: IRestApi;
}
