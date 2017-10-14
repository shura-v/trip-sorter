export interface IDealsResponse {
    currency: string;
    deals: IRawDeal[];
}

export interface IRawDeal {
    arrival: string;
    cost: number;
    departure: string;
    discount: number;
    duration: {
        h: string;
        m: string;
    };
    reference: string;
    transport: string;
}

export interface IDepartureAndArrivalCities {
    departure: string[];
    arrival: string[];
}

export interface IRestApi {
    fetchDeals(): Promise<IDealsResponse>;

    fetchCities(): Promise<IDepartureAndArrivalCities>;
}

export interface IRestApiUrls {
    cities: string;
    deals: string;
}

export type DepartureOrArrival = 'departure' | 'arrival';
