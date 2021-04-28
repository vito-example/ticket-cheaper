import {Ticket} from "./Ticket";


export class Event {
    id: number;
    protected tickets: Array<Ticket>;

    constructor(id: number, tickets: Array<Ticket>) {
        this.id = id;
        this.tickets = tickets;
    }

    hasTicket(): boolean {
        // Return true if there is at least one ticket in this event; Otherwise, return false;
        return this.tickets.length > 0;
    }


    getCheapestTicketPrice(): string {
        // Sort the tickets in ascending order by the price of the tickets
        let cheapestTicketPrice = '';
        if (this.tickets.length > 0) {
            this.tickets.sort(function (ticketA: Ticket,ticketB: Ticket) {
                return ticketA.price - ticketB.price;
            });
            cheapestTicketPrice = `&${this.tickets[0].price}`
        } else {
            // There is no tickets in this event
        }
        return cheapestTicketPrice;
    }
}