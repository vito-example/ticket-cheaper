import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    MAX_NUMBER_OF_LOCATIONS,
    MAX_NUMBER_OF_TICKETS,
    MAX_TICKET_PRICE, MIN_NUMBER_OF_LOCATIONS,
    MIN_NUMBER_OF_TICKETS,
    MIN_TICKET_PRICE
} from "./constants";
import {Ticket} from "./models/Ticket";
import {Event} from "./models/Event";
import {Location} from "./models/Location";

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

/**
 * @desc Generates a random of locations which contains one event
 * @return {Array<Location>} - An array of locations
 */
const generateRandomLocations = () => {
    let locations = [];

    // Generate the number of locations which have event
    let numberOfLocations: number = generateRandomInteger(MIN_NUMBER_OF_LOCATIONS,MAX_NUMBER_OF_LOCATIONS);
    let locationIdArray: number[] = generateRandomNumberArray(numberOfLocations);

    // Load the locations with one event
    for( let i =0; i < numberOfLocations; i++) {
        let locationID = locationIdArray[i];
        let coordinateX = -10 + locationID%21;
        let coordinateY = 10 - Math.floor(locationID/21);
        let event = generateRandomEvent(i);
        let location = new Location(locationID,coordinateX,coordinateY,event);
        locations.push(location);
    }

    return locations;
}

/**
 * @desc Generates a event with random number of tickets
 * @param id
 */
const generateRandomEvent = (id: number) => {
    let tickets = generateRandomTickets();
    return  new Event(id, tickets);
}

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
