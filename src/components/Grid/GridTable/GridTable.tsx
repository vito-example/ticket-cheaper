import React from "react";
import {Location} from "../../../models/Location";

export interface gridTableProps {
    locations: Array<Location>;
    isSearchedResults: boolean;
    inputValueX: number,
    inputValueY: number
}