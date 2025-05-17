package com.example.carbon.model;

public class InputData {
    private int householdSize;
    private double electricityUsage;
    private double carDistance;
    private double busDistance;
    private double trainDistance;
    private double meatConsumption;
    private double wasteGeneration;

    public int getHouseholdSize() {
        return householdSize;
    }

    public void setHouseholdSize(int householdSize) {
        this.householdSize = householdSize;
    }

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

    public double getMeatConsumption() {
        return meatConsumption;
    }

    public void setMeatConsumption(double meatConsumption) {
        this.meatConsumption = meatConsumption;
    }

    public double getWasteGeneration() {
        return wasteGeneration;
    }

    public void setWasteGeneration(double wasteGeneration) {
        this.wasteGeneration = wasteGeneration;
    }
}
