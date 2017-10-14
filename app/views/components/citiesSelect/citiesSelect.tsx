import {ChangeEvent} from 'react';

interface ICitiesSelectProps {
    options: string[];
    value: string;
    placeholder: string;

    triggerChange(city: string): void;
}

interface ICitiesSelectState {
    options: JSX.Element[];
    value: string;
}

export class CitiesSelect extends React.Component<ICitiesSelectProps, ICitiesSelectState> {
    public state = {
        options: [],
        value: this.props.value,
    };

    public render(): JSX.Element {
        return (
            <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
                {this.state.options}
            </select>
        );
    }

    public componentWillReceiveProps(props: ICitiesSelectProps) {
        this.setState({
            options: this.getOptionsElementsFromList(props.options),
            value: props.value,
        });
    }

    private getOptionsElementsFromList(options: string[]): JSX.Element[] {
        const placeholder = this.props.placeholder;
        const placeholderOption = <option key={placeholder} value={''}>{placeholder}</option>;
        const otherOptions = options.map((city) => <option key={city} value={city}>{city}</option>);
        return [placeholderOption, ...otherOptions];
    }

    private onChange(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        this.props.triggerChange(value);
        this.setState({value});
    }
}
