import React, {Component} from "react";
import {Location} from "./models/Location";


interface AppProps {
    locationArray: Array<Location>
}

interface AppState {
    inputValue: string;
    inputValueX: number;
    inputValueY: number;
    locationsToShow: Array<Location>;
    isSearchedResults: boolean;
    inputHasError: boolean;
    inputErrorMessage: string;
    resultsMessage: string
}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            inputValue: '',
            inputValueX: NaN,
            inputValueY: NaN,
            locationsToShow: [],
            isSearchedResults: false,
            inputHasError: false,
            inputErrorMessage: '',
            resultsMessage: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClearInput = this.handleClearInput.bind(this);
    }

    /**
     * @desc Load locations when this component did mount
     */
    componentDidMount() {
        this.setState({
            locationsToShow: this.props.locationArray,
            resultsMessage: `There are currently ${this.props.locationArray.length} events in the neighborhood`;
        });
    }



    /**
     * @desc Update the inputValue from the input form
     * @param event
     */
    handleChange(event: any) {
        this.setState({
            inputValue: event.target.value
        })
    }


    handleClearInput() {
        this.setState({
            inputValue: '',
            inputValueX: NaN,
            inputValueY: NaN,
            locationsToShow: this.props.locationArray,
            isSearchedResults: false,
            inputErrorMessage: '',
            resultsMessage: `There are currently ${this.props.locationArray.length} events in the neighborhood`
        });
    }


    render() {

    }
}
