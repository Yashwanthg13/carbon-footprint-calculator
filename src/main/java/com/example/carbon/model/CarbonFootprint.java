package com.example.carbon.model;

public class CarbonFootprint {
    private double electricityEmissions;
    private double travelEmissions;
    private double foodEmissions;
    private double wasteEmissions;
    private double totalEmissions;
    private double perPersonEmissions;

    public double getElectricityEmissions() {
        // Round to one decimal place to avoid floating point precision issues
        return Math.round(electricityEmissions * 10) / 10.0;
    }

    public void setElectricityEmissions(double electricityEmissions) {
        this.electricityEmissions = electricityEmissions;
    }

    public double getTravelEmissions() {
        // Round to one decimal place to avoid floating point precision issues
        return Math.round(travelEmissions * 10) / 10.0;
    }

    public void setTravelEmissions(double travelEmissions) {
        this.travelEmissions = travelEmissions;
    }

    public double getFoodEmissions() {
        // Round to one decimal place to avoid floating point precision issues
        return Math.round(foodEmissions * 10) / 10.0;
    }

    public void setFoodEmissions(double foodEmissions) {
        this.foodEmissions = foodEmissions;
    }

    public double getWasteEmissions() {
        // Round to one decimal place to avoid floating point precision issues
        return Math.round(wasteEmissions * 10) / 10.0;
    }

    public void setWasteEmissions(double wasteEmissions) {
        this.wasteEmissions = wasteEmissions;
    }

    public double getTotalEmissions() {
        // Round to one decimal place to avoid floating point precision issues
        return Math.round(totalEmissions * 10) / 10.0;
    }

    public void setTotalEmissions(double totalEmissions) {
        this.totalEmissions = totalEmissions;
    }

    public double getPerPersonEmissions() {
        // Round to one decimal place to avoid floating point precision issues
        return Math.round(perPersonEmissions * 10) / 10.0;
    }

    public void setPerPersonEmissions(double perPersonEmissions) {
        this.perPersonEmissions = perPersonEmissions;
    }
}
