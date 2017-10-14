import {MouseEvent} from 'react';
import {ESortingTypes} from '../../../models/tripSorter/i_tripSorter';

interface ISortingButtonProps {
    text: string;
    value: ESortingTypes;
    isActive: boolean;

    triggerChange(value: ESortingTypes): void;
}

interface ISortingButtonState {
    className: string;
}

export class SwitchingButton extends React.Component<ISortingButtonProps, ISortingButtonState> {
    public render(): JSX.Element {
        return (
            <button onClick={this.onClick.bind(this)} className={this.getClassName()}>
                {this.props.text}
            </button>
        );
    }

    private onClick(e: MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        this.props.triggerChange(this.props.value);
    }

    private getClassName(): string {
        return `btn btn-${this.props.isActive ? 'primary' : 'secondary'}`;
    }
}
