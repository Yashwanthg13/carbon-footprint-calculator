package com.example.carbon.model;

public class InputData {
    private double electricityUsage;
    private double carDistance;      // km per month
    private double busDistance;      // km per month
    private double trainDistance;    // km per month
    private int householdSize;
    private double wasteGeneration;  // kg per month
    private double meatConsumption; // kg per month

    // Default constructor
    public InputData() {
    }

    // Getters and setters
    public double getElectricityUsage() {
        return electricityUsage;
    }

    public void setElectricityUsage(double electricityUsage) {
        this.electricityUsage = electricityUsage;
    }

    public double getCarDistance() {
        return carDistance;
    }

    public void setCarDistance(double carDistance) {
        this.carDistance = carDistance;
    }

    public double getBusDistance() {
        return busDistance;
    }

    public void setBusDistance(double busDistance) {
        this.busDistance = busDistance;
    }

    public double getTrainDistance() {
        return trainDistance;
    }

    public void setTrainDistance(double trainDistance) {
        this.trainDistance = trainDistance;
    }

    public int getHouseholdSize() {
        return householdSize;
    }

    public void setHouseholdSize(int householdSize) {
        this.householdSize = householdSize;
    }

    public double getWasteGeneration() {
        return wasteGeneration;
    }

    public void setWasteGeneration(double wasteGeneration) {
        this.wasteGeneration = wasteGeneration;
    }

    public double getMeatConsumption() {
        return meatConsumption;
    }

    public void setMeatConsumption(double meatConsumption) {
        this.meatConsumption = meatConsumption;
    }

    // Helper method to get total travel distance
    public double getTotalTravelDistance() {
        return carDistance + busDistance + trainDistance;
    }
}
