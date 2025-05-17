package com.example.carbon.model;

public class CarbonFootprint {
    private double electricityEmissions;
    private double travelEmissions;
    private double foodEmissions;
    private double wasteEmissions;
    private double totalEmissions;
    private double perPersonEmissions;

    public double getElectricityEmissions() {
        return electricityEmissions;
    }

    public void setElectricityEmissions(double electricityEmissions) {
        this.electricityEmissions = electricityEmissions;
    }

    public double getTravelEmissions() {
        return travelEmissions;
    }

    public void setTravelEmissions(double travelEmissions) {
        this.travelEmissions = travelEmissions;
    }

    public double getFoodEmissions() {
        return foodEmissions;
    }

    public void setFoodEmissions(double foodEmissions) {
        this.foodEmissions = foodEmissions;
    }

    public double getWasteEmissions() {
        return wasteEmissions;
    }

    public void setWasteEmissions(double wasteEmissions) {
        this.wasteEmissions = wasteEmissions;
    }

    public double getTotalEmissions() {
        return totalEmissions;
    }

    public void setTotalEmissions(double totalEmissions) {
        this.totalEmissions = totalEmissions;
    }

    public double getPerPersonEmissions() {
        return perPersonEmissions;
    }

    public void setPerPersonEmissions(double perPersonEmissions) {
        this.perPersonEmissions = perPersonEmissions;
    }
}
