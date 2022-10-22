import { number } from "prop-types";
import {Appliances} from "./Appliances";


export class DailyAppliances extends Appliances {

    constructor (name: String, wattage: number) {
        super(name, false, true, false, wattage);
    }

    calculateEnergyCosts(hours: number[]) {
        super.wattageByHour = hours;
    }
}