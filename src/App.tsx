import React, {Component} from "react";
import {Location} from "./models/Location";
import {NUMBER_OF_CLOSEST_LOCATIONS} from "./constants";
import {isInteger} from "./utils/is-integer";
import GridMap from "./components/Grid/GridMap/GridMap";
import GridTable from "./components/Grid/GridTable/GridTable";


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
        this.handleSearch = this.handleSearch.bind(this);
    }

    /**
     * @desc Load locations when this component did mount
     */
    componentDidMount() {
        this.setState({
            locationsToShow: this.props.locationArray,
            resultsMessage: `There are currently ${this.props.locationArray.length} events in the neighborhood`
        });
    }

    handleSearch(event: any) {
        console.log(`Input coordinate: ${this.state.inputValue}`);

        let inputValue = this.state.inputValue;
        let inputValues = inputValue.split(',');

        this.setState({
            inputHasError: false,
            inputErrorMessage: ''
        });

        let hasError = false;

        if (inputValues) {
            if (inputValues.length === 2) {
                let inputValueX = inputValue[0];
                let inputValueY = inputValue[1];

                if (isInteger(inputValueX) && isInteger(inputValueY)) {
                    let inputX = parseInt(inputValueX, 10);
                    let inputY = parseInt(inputValueY, 10);

                    // Validate input value
                    if ((inputX >= -10 && inputX <= 10) && (inputY >= -10 && inputY <= 10)) {
                        this.setState({
                            inputValueX: inputX,
                            inputValueY: inputY,
                            locationsToShow: getClosestLocations(inputX, inputY, this.props.locationArray),
                            isSearchedResults: true,
                            resultsMessage: `Here are the closest event from (${inputX},${inputY}.`
                        })
                    } else {
                        // coordinate outside the scope
                        hasError = true;
                    }
                } else {
                    // Input values contain non-interger(s)
                    hasError = true;
                }
            } else {
                // More than one comma in the input
                hasError = true;
            }
        } else {
            // Input value is not valid
            hasError = true;
        }

        // Update the error message if there is error
        if (hasError) {
            this.setState({
                inputHasError: true,
                inputErrorMessage: "(Error: Please input the right format of coordinate: x,y , where x and y are integer and both within [-10,10].)",
                locationsToShow: [],
                resultsMessage: "Sorry, there is no event to display."
            })
        } else {
            //
        }
        event.preventDefault();
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
        return (
            <div className='App'>
                <div className='SearchInput'>
                    <form onSubmit={this.handleSearch}>
                        <label>
                            <h2>Search for a location</h2>
                            <p>The location coordinate x,y should be integers and both within [-10,10].</p>
                            <input type='text' value={inputValue} onChange={this.handleChange} placeholder='e.g 4,2'/>
                        </label>
                        <input type='submit' value='Search'/>
                        {(inputValue.length > 0) ? (
                            <button onClick={this.handleClearInput}>Clear input</button>
                        ) : null}
                    </form>
                    <p style={{color: 'lightsalmon', visibility: inputHasError ? 'visible' : 'hidden'}}>
                        {inputErrorMessage}
                    </p>
                </div>

                <div className='Results'>
                    <h4 style={{textAlign: 'center'}}>
                        {resultsMessage}
                    </h4>
                    <GridMap locations={locationsToShow} isSearchedResults={isSearchedResults} inputValueX={inputValueX}
                             inputValueY={inputValueY}/>
                    <GridTable locations={locationsToShow} isSearchedResults={isSearchedResults}
                               inputValueX={inputValueX} inputValueY={inputValueY}/>
                </div>
            </div>
        )
    }
}

export default App;

/**
 * @desc Get the closest locations which have events to the input coordinates
 * @param inputX
 * @param inputY
 * @param locations
 */
const getClosestLocations = (inputX: number, inputY: number, locations: Array<Location>) => {
    let closestLocations = [];

    // Sort the locations in ascending order of the distances away the input coordinates
    locations.sort(function (locationA: Location, locationB: Location) {
        return locationA.getDistance(inputX, inputY) - locationB.getDistance(inputX, inputY);
    });

    // Get at most five of the closest locations
    for (let i = 0; i < NUMBER_OF_CLOSEST_LOCATIONS && i < locations.length; i++) {
        closestLocations.push(locations[i]);
    }

    return closestLocations;
}