namespace ConsumerClasses;

class WeeklyAppliance : Appliances {

    public WeeklyAppliance(string name, float wattage) {
        this.name = name;
        this.wattage = wattage;
        this.weekly = true;
        this.always = false;
        this.daily = false;
    }
    public void setHours(float[] hours) {
        this.hours = hours;
    }
}