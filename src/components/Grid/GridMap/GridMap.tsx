import React, {FC} from "react";
import {Location} from "../../../models/Location";
import {RANGE_OF_X_AXIS, RANGE_OF_Y_AXIS} from "../../../constants";


export interface gridMapProps {
    locations: Array<Location>;
    isSearchedResults: boolean,
    inputValueX: number,
    inputValueY: number
}

const GridMap: FC<gridMapProps> = ({locations, isSearchedResults, inputValueX, inputValueY}) => {

    const gridMapHTML = [];

    for (let i = 0; i < RANGE_OF_Y_AXIS; i++) {
        for (var j = 0; j < RANGE_OF_X_AXIS; j++) {
            // Mark the searched coordinate with red border
            let searchedLocationStyle = '';
            if ((j - 10) === inputValueX && (10 - i) === inputValueY) {
                searchedLocationStyle = 'grid-item-searched';
            } else {
                // do nothing
            }

            let gridItemID = i * 21 + j;
            let location = getLocationById(locations, gridItemID);

            if (location) {
                // If the location is in the array of locations to show
                // Color this grid with green and show relevant information of the event on this location
                gridMapHTML.push(
                    <div key={location.id} className={"grid-item grid-item-active " + searchedLocationStyle}
                         style={{display: "inline-block"}}>
                        <div className={"grid-item-hover-over"}>
                            <h4>Event {location.event.id}</h4>
                            <p>Location: ({j - 10},{10 - i})</p>
                            <p>Price from: {location.event.getCheapestTicketPrice()}</p>
                            {isSearchedResults ? (<p style={{visibility: !{isSearchedResults} ? 'visible' : 'hidden'}}>Distance from
                                ({inputValueX},{inputValueY}): {location.getDistance(inputValueX, inputValueY)}</p>) : ''}
                        </div>

                    </div>
                );
            } else {
                // If the location is not in the array of locations to show
                // Color this grid with gray and show only show the coordinate of this location
                gridMapHTML.push(<div key={`${i}-${j}`} className={"grid-item grid-item-inactive " + searchedLocationStyle}
                                      style={{display: "inline-block"}}>
                    <div className={"grid-item-hover-over"}>
                        <p>Location:({j - 10},{10 - i})</p>
                    </div>
                </div>);
            }
        }
        // Break the row and start a new row
        gridMapHTML.push(<br key={`br-${i}`}/>)
    }

    return (
        <div className='grid-map'>
            {gridMapHTML}
        </div>
    )
}

export default GridMap;


/**
 *
 * @param locations
 * @param id
 */
const getLocationById = (locations: Array<Location>, id: number) => {
    for (let location of locations) {
        if (location.id === id) {
            return location;
        } else {
            // do nothing
        }
    }

    return null;
}