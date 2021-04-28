import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    MAX_NUMBER_OF_LOCATIONS,
    MAX_NUMBER_OF_TICKETS,
    MAX_TICKET_PRICE,
    MIN_NUMBER_OF_TICKETS,
    MIN_TICKET_PRICE
} from "./constants";
import {Ticket} from "./components/Ticket";

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);


/**
 * @desc Generates random number of tickets with random prices.
 * @return {Array<Ticket>} - An array of Tickets.
 */
const generateRandomTickets = () => {
    // Generate a random number for the number of tickets
    let numberOfTicket: number = generateRandomInteger(MIN_NUMBER_OF_TICKETS,MAX_NUMBER_OF_TICKETS);
    let tickets: any[] = [];
    for (let i=0; i < numberOfTicket; i++) {
        // Define the price of the ticket
        let ticket = new Ticket(generateRandomDouble(MIN_TICKET_PRICE,MAX_TICKET_PRICE));
        tickets.push(ticket);
    }

    return tickets;
}

/**
 * @desc Generates random integer
 * @param min
 * @param max
 */
const generateRandomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @desc Generates random double number with two decimal places
 * @param min
 * @param max
 */
const generateRandomDouble = (min: number, max: number): number => {
    return Math.floor((Math.random() * (max - min + 1) + min) * 100) / 100;
}

/**
 * Generates an array of random exclusive location ids
 * @param maxLength
 */
const generateRandomNumberArray = (maxLength: number) => {
    let randomArray: number[] = [];
    while (randomArray.length < maxLength) {
        let randomNumber = Math.floor(Math.random() * MAX_NUMBER_OF_LOCATIONS);
        if (randomArray.indexOf(randomNumber) > -1) continue;
        randomArray[randomArray.length] = randomNumber;
    }

    return randomArray;
}
