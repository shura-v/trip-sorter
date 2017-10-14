import {CitiesRepository} from './models/citiesRepository/citiesRepository';
import {DealsRepository} from './models/dealsRepository/dealsRepository';
import {TripSorter} from './models/tripSorter/tripSorter';
import {DEFAULT_API_URL, RestApi} from './rest/restApi';
import {renderApp} from './views/index/index';

const restApi = new RestApi({
    cities: DEFAULT_API_URL,
    deals: DEFAULT_API_URL,
});

const cities = new CitiesRepository({restApi});
const deals = new DealsRepository({restApi});
const tripSorter = new TripSorter({deals});
const mountingNode = document.getElementById('app');

renderApp(restApi, cities, deals, tripSorter, mountingNode as HTMLElement);
