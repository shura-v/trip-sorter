import 'bootstrap/dist/css/bootstrap-theme.min';
import 'bootstrap/dist/css/bootstrap.min';
import 'mdi/css/materialdesignicons.min';
import './index.css';

import * as ReactObj from 'react';
import * as ReactDOMObj from 'react-dom';

import {ICitiesRepository} from '../../models/citiesRepository/i_citiesRepository';
import {IDealsRepository} from '../../models/dealsRepository/i_dealsRepository';
import {ITripSorter} from '../../models/tripSorter/i_tripSorter';
import {IRestApi} from '../../rest/i_restApi';
import {App} from '../components/app/app';

declare global {
    const React: typeof ReactObj;
    const ReactDOM: typeof ReactDOMObj;
}

export function renderApp(restApi: IRestApi,
                          cities: ICitiesRepository,
                          deals: IDealsRepository,
                          tripSorter: ITripSorter,
                          domNode: HTMLElement) {
    const props = {restApi, cities, deals, tripSorter};
    ReactDOMObj.render(<App {... props} />, domNode);
}
