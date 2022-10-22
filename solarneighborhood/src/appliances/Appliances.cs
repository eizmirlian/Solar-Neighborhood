namespace ConsumerClasses;

class Appliances {

    public boolean always;
    public boolean daily;
    public boolean weekly;
    public float wattage;
    public string name;
    public float[] hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    public float computeEnergyCosts() {
        return 0;
    }
}