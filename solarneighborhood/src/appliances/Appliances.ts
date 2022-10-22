export class Appliances {

    public always: boolean;
    public daily: boolean;
    public weekly: boolean;
    public wattage: number;
    public name: String;
    public wattageByHour: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    constructor(name: String, always: boolean, daily: boolean, weekly: boolean, wattage: number) {
        this.always = always;
        this.daily = daily;
        this.weekly = weekly;
        this.wattage = wattage;
        this.name = name;
    }

    computeEnergyCosts() {
        return this.wattageByHour;
    }
}
