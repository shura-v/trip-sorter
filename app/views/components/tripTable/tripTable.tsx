import {isEqual} from 'lodash';
import {IDealsRepository} from '../../../models/dealsRepository/i_dealsRepository';
import {ITrip} from '../../../models/trip/i_trip';
import {ITripSorter} from '../../../models/tripSorter/i_tripSorter';
import {ISearchParams} from '../app/app';
import {getDeal} from '../deal/deal';
import {currencyToSymbol, formatDuration} from './helpers';

interface ITripTableProps {
    searchParams: ISearchParams;
    deals: IDealsRepository;
    tripSorter: ITripSorter;

    requestFormReset(): void;
}

interface ITripTableState {
    fetching: boolean;
    trip: ITrip | undefined;
    currency: string;
}

export class TripTable extends React.Component<ITripTableProps, ITripTableState> {
    private wasMounted = false;

    public componentWillReceiveProps(props: ITripTableProps): void {
        if (!isEqual(this.props.searchParams, props.searchParams)) {
            this.load(props);
        }
    }

    public componentDidMount() {
        this.wasMounted = true;
        this.load(this.props);
    }

    public componentWillUnmount() {
        this.wasMounted = false;
    }

    public render(): JSX.Element {
        if (this.ifNotReady()) {
            return (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped active" style={{width: '100%'}}/>
                </div>
            );
        }

        const {trip} = this.state;

        if (trip === undefined) {
            return (
                <div className="alert alert-danger">Sorry, nothing found, try again.</div>
            );
        }

        const deals = trip.getDeals()
            .map((deal) => getDeal(deal, this.getCurrency()));

        return (
            <div>
                {
                    <table className="table">
                        <tbody>{deals}</tbody>
                        <tfoot>
                        <tr className="active">
                            <td><b>Total</b>: {formatDuration(trip.getDurationInMinutes())}</td>
                            <td className="text-right">
                                <b>{currencyToSymbol(this.state.currency)}{trip.getFinalCost()}</b></td>
                        </tr>
                        </tfoot>
                    </table>
                }
            </div>
        );
    }

    private load(props: ITripTableProps): void {
        this.setState({fetching: true});
        this.props.deals.load().then(() => setTimeout(this.onLoaded.bind(this), 250));
    }

    private onLoaded() {
        if (!this.wasMounted) {
            return;
        }
        const {departure, arrival, sortBy} = this.props.searchParams;
        const trip = this.props.tripSorter.findBestTrip(departure, arrival, sortBy);
        const currency = this.props.deals.getCurrency();
        if (trip) {
            this.setState({fetching: false, trip, currency});
        } else {
            this.setState({fetching: false, trip: undefined});
        }
    }

    private getCurrency() {
        return currencyToSymbol(this.state.currency);
    }

    private ifNotReady() {
        return !this.state || this.state.fetching;
    }
}
