namespace ConsumerClasses;

class DailyAppliance : Appliances {

    public DailyAppliance(string name, float wattage) {
        this.name = name;
        this.wattage = wattage;
        this.weekly = false;
        this.always = false;
        this.daily = true;
    }
    public float[] setHours(float[] hours) {
        this.hours = hours;
    }
}