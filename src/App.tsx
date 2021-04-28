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


    }


}
