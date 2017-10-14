import {v4} from 'uuid';
import {IRawDeal} from '../../rest/i_restApi';
import {IDeal} from './i_deal';

export class Deal implements IDeal {
    public readonly arrival: string;
    public readonly cost: number;
    public readonly departure: string;
    public readonly discount: number;
    public readonly duration: {
        readonly h: string;
        readonly m: string;
    };
    public readonly reference: string;
    public readonly transport: string;

    public readonly finalCost: number;
    public readonly id = v4();
    public readonly durationInMinutes: number;

    constructor(rawDeal: IRawDeal) {
        const {arrival, cost, departure, discount, duration, reference, transport} = rawDeal;
        this.arrival = arrival;
        this.cost = cost;
        this.departure = departure;
        this.discount = discount;
        this.duration = duration;
        this.reference = reference;
        this.transport = transport;
        this.finalCost = this.cost * (1 - this.discount / 100);
        this.durationInMinutes = parseInt(this.duration.h, 10) * 60 + parseInt(this.duration.m, 10);
    }
}
