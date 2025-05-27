package com.example.carbon.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class InputData {
    @NotNull
    @Min(value = 1, message = "Household size must be at least 1")
    private int householdSize;
    @NotNull
    @Min(value = 0, message = "Electricity usage cannot be negative")
    private double electricityUsage;
    @NotNull
    @Min(value = 0, message = "Car distance cannot be negative")
    private double carDistance;
    @NotNull
    @Min(value = 0, message = "Bus distance cannot be negative")
    private double busDistance;
    @NotNull
    @Min(value = 0, message = "Train distance cannot be negative")
    private double trainDistance;
    @NotNull
    @Min(value = 0, message = "Meat consumption cannot be negative")
    private double meatConsumption;
    @NotNull
    @Min(value = 0, message = "Waste generation cannot be negative")
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
