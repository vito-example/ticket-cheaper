import React from "react";
import {Location} from "../../../models/Location";


export interface gridMapProps {
    locations: Array<Location>;
    isSearchedResults: boolean,
    inputValueX: number,
    inputValueY: number
}