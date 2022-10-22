import { number } from "prop-types";
import {Appliances} from "./Appliances";


export class WeeklyAppliances extends Appliances {

    constructor (name: String, wattage: number) {
        super(name, false, false, true, wattage);
    }

    calculateEnergyCosts(hours: number[]) {
        super.wattageByHour = hours;
    }
}