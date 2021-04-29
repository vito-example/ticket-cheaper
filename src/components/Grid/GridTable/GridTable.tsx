import React, {FC} from "react";
import {Location} from "../../../models/Location";

export interface gridTableProps {
    locations: Array<Location>;
    isSearchedResults: boolean;
    inputValueX: number,
    inputValueY: number
}


const GridTable: FC<gridTableProps> = ({locations, isSearchedResults, inputValueX, inputValueY}) => {
    return (
        <div className='grid-table'>
            <table>
                <tr>
                    <th>Event</th>
                    <th>Location</th>
                    {isSearchedResults ? (
                        <th>Distance from ({inputValueX},{inputValueY})</th>
                    ) : null}
                    <th>Price from</th>
                </tr>
                {locations.map((location, i) => (
                    <tr>
                        <td>
                            <h4>
                                Event {location.event.id}
                            </h4>
                        </td>
                        <td>
                            ({location.coordinateX}, {location.coordinateY})
                        </td>
                        {isSearchedResults ? (
                            <td>
                                {location.getDistance(inputValueX, inputValueY)}
                            </td>
                        ) : null}
                        <td>
                            <div className='grid-table-price'>
                                {location.event.hasTicket() ? (
                                    <div className='grid-table-price-active'>
                                        {location.event.getCheapestTicketPrice()}
                                    </div>
                                ) : (
                                    <div className='grid-table-price-inactive'>
                                        Sold out
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default GridTable;
