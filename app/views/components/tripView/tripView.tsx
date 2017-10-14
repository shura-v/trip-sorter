import {MouseEvent} from 'react';
import {IDealsRepository} from '../../../models/dealsRepository/i_dealsRepository';
import {ITripSorter} from '../../../models/tripSorter/i_tripSorter';
import {ISearchParams} from '../app/app';
import {TripTable} from '../tripTable/tripTable';
import '../tripTable/tripTable.css';

interface ITripViewProps {
    deals: IDealsRepository;
    tripSorter: ITripSorter;
    searchParams: ISearchParams;

    requestFormReset(): void;
}

export class TripView extends React.Component<ITripViewProps> {
    public render(): JSX.Element {
        const {searchParams, deals, tripSorter} = this.props;
        return (
            <div>
                <TripTable
                    searchParams={searchParams}
                    deals={deals}
                    tripSorter={tripSorter}
                    requestFormReset={this.onReset.bind(this)}
                />

                <div className="btn-group-justified">
                    <div className="btn-group">
                        <button onClick={this.onReset.bind(this)} className="btn btn-danger">
                            <span className="mdi mdi-refresh"/> Reset
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private onReset(e: MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        this.props.requestFormReset();
    }
}
