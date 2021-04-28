import React, {Component} from "react";
import {Location} from "./models/Location";
import {NUMBER_OF_CLOSEST_LOCATIONS} from "./constants";


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
        const {
            inputValue,
            inputValueX,
            inputValueY,
            locationsToShow,
            isSearchedResults,
            inputHasError,
            inputErrorMessage,
            resultsMessage
        } = this.state;

    }
}

/**
 * @desc Get the closest locations which have events to the input coordinates
 * @param inputX
 * @param inputY
 * @param locations
 */
const getClosestLocations = (inputX: number, inputY: number,locations: Array<Location>) => {
    let closestLocations = [];

    // Sort the locations in ascending order of the distances away the input coordinates
    locations.sort(function (locationA: Location, locationB: Location) {
        return locationA.getDistance(inputX, inputY) - locationB.getDistance(inputX, inputY);
    });

    // Get at most five of the closest locations
    for (let i =0; i<NUMBER_OF_CLOSEST_LOCATIONS && i<locations.length; i++) {
        closestLocations.push(locations[i]);
    }

    return closestLocations;
}