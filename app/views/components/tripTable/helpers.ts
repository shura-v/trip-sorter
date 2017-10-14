import {pad} from 'lodash';

const transportToIconClassNameMap: {
    [transport: string]: string;
} = {
    airplane: 'airplane-takeoff',
    bus: 'bus-school',
    car: 'car-side',
    train: 'train',
};

export function transportNameToIconName(transport: string): string {
    return transportToIconClassNameMap[transport];
}

export function formatDuration(durationInMinutes: number): string {
    const minutes = Math.round(durationInMinutes % 60);
    const hours = Math.round((durationInMinutes - minutes) / 60);
    return [
        pad(String(hours), 2, '0'),
        pad(String(minutes), 2, '0'),
    ].join('h');
}

// tslint:disable:object-literal-sort-keys
const currencyToSymbolMap: {
    [currency: string]: string;
} = {
    USD: '$',
    EUR: '€',
    JPY: '¥',
    GBP: '£',
    RUB: '₽',
    DH: 'د.إ',
};
// tslint:enable:object-literal-sort-keys

export function currencyToSymbol(currency: string) {
    return currencyToSymbolMap[currency] || currency;
}
