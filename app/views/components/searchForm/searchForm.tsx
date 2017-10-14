import {FormEvent} from 'react';
import {ICitiesRepository} from '../../../models/citiesRepository/i_citiesRepository';
import {ESortingTypes} from '../../../models/tripSorter/i_tripSorter';
import {CitiesSelect} from '../citiesSelect/citiesSelect';
import {SwitchingButton} from '../sortingButton/sortingButton';

interface ISearchFormProps {
    arrival: string;
    departure: string;
    cities: ICitiesRepository;
    sortBy: ESortingTypes;
    valid: boolean;

    requestSearch(): void;

    updateDeparture(departure: string): void;

    updateArrival(arrival: string): void;

    switchSortingTo(sortBy: ESortingTypes): void;
}

interface ISearchFormState {
    ready: boolean;
    departureOptions: string[];
    arrivalOptions: string[];
}

function getInitialState() {
    return {
        arrivalOptions: [],
        departureOptions: [],
        ready: false,
    };
}

export class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {
    public state: ISearchFormState = getInitialState();
    private wasMounted = false;

    public componentDidMount() {
        this.wasMounted = true;
        const cities = this.props.cities;
        cities.load().then(() => {
            if (this.wasMounted) {
                this.setState({
                    arrivalOptions: cities.getArrivalCities(),
                    departureOptions: cities.getDepartureCities(),
                    ready: true,
                });
            }
        });
    }

    public componentWillUnmount() {
        this.wasMounted = false;
    }

    public render(): JSX.Element {
        return (
            <form
                className={`b__search-form ${this.state.ready ? '' : 'h__disabled'}`}
                onSubmit={this.onSubmit.bind(this)}
            >
                <div className="form-group">
                    <CitiesSelect
                        options={this.state.departureOptions}
                        value={this.props.departure}
                        placeholder={'From'}
                        triggerChange={this.props.updateDeparture.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <CitiesSelect
                        options={this.state.arrivalOptions}
                        value={this.props.arrival}
                        placeholder={'To'}
                        triggerChange={this.props.updateArrival.bind(this)}
                    />
                </div>
                <div className="form-group btn-group btn-group-justified">
                    <div className="btn-group">
                        <SwitchingButton
                            text="Cheapest"
                            value={ESortingTypes.Cheapest}
                            isActive={this.props.sortBy === ESortingTypes.Cheapest}
                            triggerChange={this.props.switchSortingTo.bind(this)}
                        />
                    </div>
                    <div className="btn-group">
                        <SwitchingButton
                            text="Fastest"
                            value={ESortingTypes.Fastest}
                            isActive={this.props.sortBy === ESortingTypes.Fastest}
                            triggerChange={this.props.switchSortingTo.bind(this)}
                        />
                    </div>
                </div>
                <div className="form-group btn-group btn-group-justified">
                    <div className="btn-group">
                        <button disabled={!this.props.valid} className="btn btn-success">
                            <span className="mdi mdi-search-web"/> Search
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    private onSubmit(e: FormEvent<HTMLButtonElement>): void {
        e.preventDefault();
        this.props.requestSearch();
    }
}
