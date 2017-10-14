import {omit} from 'lodash';
import {ICitiesRepository} from '../../../models/citiesRepository/i_citiesRepository';
import {IDealsRepository} from '../../../models/dealsRepository/i_dealsRepository';
import {ESortingTypes, ITripSorter} from '../../../models/tripSorter/i_tripSorter';
import {IRestApi} from '../../../rest/i_restApi';
import {SearchForm} from '../searchForm/searchForm';
import {TripView} from '../tripView/tripView';
import './app.css';

export interface IAppProps {
    restApi: IRestApi;
    deals: IDealsRepository;
    tripSorter: ITripSorter;
    cities: ICitiesRepository;
}

export interface ISearchParams {
    departure: string;
    arrival: string;
    sortBy: ESortingTypes;
}

export interface IAppState extends ISearchParams {
    searchParams: ISearchParams;
}

export class App extends React.Component<IAppProps, IAppState> {
    private static isValid(searchParams: ISearchParams): boolean {
        if (!searchParams) {
            return false;
        }
        const {sortBy, departure, arrival} = searchParams;
        return sortBy !== null
            && departure !== ''
            && arrival !== ''
            && departure !== arrival;
    }

    public state = getInitialState();

    public render(): JSX.Element {
        const {cities, deals, tripSorter} = this.props;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h1>TripSorter <span className="mdi mdi-bus-articulated-front"/></h1>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="b__column col-md-6">
                                <SearchForm
                                    cities={cities}
                                    departure={this.state.departure}
                                    arrival={this.state.arrival}
                                    sortBy={this.state.sortBy}
                                    valid={App.isValid(this.state)}
                                    updateDeparture={this.updateDeparture.bind(this)}
                                    updateArrival={this.updateArrival.bind(this)}
                                    switchSortingTo={this.switchSortingTo.bind(this)}
                                    requestSearch={this.startSearch.bind(this)}
                                />
                            </div>
                            <div className="b__column col-md-6">
                                {
                                    App.isValid(this.state.searchParams)
                                        ?
                                    <TripView
                                        searchParams={this.state.searchParams}
                                        deals={deals}
                                        tripSorter={tripSorter}
                                        requestFormReset={this.reset.bind(this)}
                                    />
                                        :
                                    ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private startSearch(): void {
        const {arrival, departure, sortBy} = this.state;
        this.setAndStoreState({
            searchParams: {
                arrival, departure, sortBy,
            },
        });
    }

    private setAndStoreState<K extends keyof IAppState>(state: Pick<IAppState, K>): void {
        this.setState(state, this.storeStateToLocaleStorage.bind(this));
    }

    private reset(): void {
        this.setAndStoreState(getInitialStateObject());
    }

    private storeStateToLocaleStorage(): void {
        const json = JSON.stringify(
            omit(this.state, 'searchParams'),
        );
        localStorage.setItem('state', json);
    }

    private updateDeparture(departure: string): void {
        this.setAndStoreState({departure});
    }

    private updateArrival(arrival: string): void {
        this.setAndStoreState({arrival});
    }

    private switchSortingTo(sortBy: ESortingTypes): void {
        this.setAndStoreState({sortBy});
    }
}

export function getInitialState(): IAppState {
    return loadStateFromLocaleStorage() || getInitialStateObject();
}

function getInitialStateObject(): IAppState {
    const searchParams = {
        arrival: '',
        departure: '',
        sortBy: ESortingTypes.Cheapest,
    };
    return {
        ...searchParams,
        searchParams,
    };
}

function loadStateFromLocaleStorage(): IAppState | null {
    const storedJson = localStorage.getItem('state');
    return storedJson ? JSON.parse(storedJson) : null;
}
