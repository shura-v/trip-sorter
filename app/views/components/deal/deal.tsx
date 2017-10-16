import {IDeal} from '../../../models/deal/i_deal';
import {transportNameToIconName} from '../tripTable/helpers';

export function getDeal(deal: IDeal, currency: string) {
    return (
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
            <td className="text-right">{currency}{deal.finalCost}</td>
        </tr>
    );
}
