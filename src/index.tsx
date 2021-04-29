import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {generateRandomLocations} from "./utils/generateRandom";

ReactDOM.render(
    <React.StrictMode>
    <App locationArray={generateRandomLocations()} />
    </React.StrictMode>,
    document.getElementById('root')
);

