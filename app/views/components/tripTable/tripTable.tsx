import {isEqual} from 'lodash';
import {IDeal} from '../../../models/deal/i_deal';
import {IDealsRepository} from '../../../models/dealsRepository/i_dealsRepository';
import {ITrip} from '../../../models/trip/i_trip';
import {ITripSorter} from '../../../models/tripSorter/i_tripSorter';
import {ISearchParams} from '../app/app';
import {currencyToSymbol, formatDuration, transportNameToIconName} from './helpers';

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

        const deals = this.dealsToJsx(trip.getDeals());

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

    private dealsToJsx(deals: IDeal[]): JSX.Element[] {
        return deals.map((deal) => (
            <tr key={deal.id}>
                <td>
                    <div>
                        <span>{deal.departure}</span>
                        <span className={`b__trip-icon mdi mdi-${transportNameToIconName(deal.transport)}`}/>
                        <span>{deal.arrival}</span>
                    </div>
                    <div className="b__trip-route-info small">
                        <b>{deal.transport}</b> {deal.reference} for {deal.duration.h}:{deal.duration.m}
                    </div>
                </td>
                <td className="text-right">{this.getCurrency()}{deal.finalCost}</td>
            </tr>
        ));
    }

    private getCurrency() {
        return currencyToSymbol(this.state.currency);
    }

    private ifNotReady() {
        return !this.state || this.state.fetching;
    }
}
