import React, {FC} from "react";
import {Location} from "../../../models/Location";


export interface gridMapProps {
    locations: Array<Location>;
    isSearchedResults: boolean,
    inputValueX: number,
    inputValueY: number
}

const GridMap: FC<gridMapProps> = ({locations,isSearchedResults,inputValueX,inputValueY}) => {

    return (
        <div className='grid-map'>
            grid map
        </div>
    )
}

export default GridMap;