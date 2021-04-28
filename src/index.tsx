import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);


/**
 * @desc Generates random integer
 * @param min
 * @param max
 */
const generateRandomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
