import { number } from "prop-types";
import {Appliances} from "./Appliances.ts";


export class AlwaysAppliances extends Appliances {

    constructor (name: String, wattage: number) {
        super(name, true, false, false, wattage);
    }

    calculateEnergyCosts(hours: number[]) {
        super.wattageByHour = hours;
    }
}
