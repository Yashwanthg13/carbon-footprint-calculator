package com.example.carbon.model;

import java.time.LocalDateTime;

public class CarbonFootprint {
    private LocalDateTime calculationDate;
    private double electricityEmissions;
    private double travelEmissions;
    private double meatEmissions;
    private double wasteEmissions;
    private double totalEmissions;
    private double perPersonEmissions;
    private int householdSize;

    // Source data
    private double electricityUsage;
    private double carDistance;
    private double busDistance;
    private double trainDistance;
    private double meatConsumption;
    private double wasteGeneration;

    public LocalDateTime getCalculationDate() {
        return calculationDate;
    }

    public void setCalculationDate(LocalDateTime calculationDate) {
        this.calculationDate = calculationDate;
    }

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

    public double getMeatEmissions() {
        return meatEmissions;
    }

    public void setMeatEmissions(double meatEmissions) {
        this.meatEmissions = meatEmissions;
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

    // Helper method to create from InputData
    public static CarbonFootprint fromInputData(InputData input, 
                                              double electricityEmissions,
                                              double travelEmissions,
                                              double meatEmissions,
                                              double wasteEmissions,
                                              double totalEmissions,
                                              double perPersonEmissions) {
        CarbonFootprint footprint = new CarbonFootprint();
        footprint.setCalculationDate(LocalDateTime.now());
        footprint.setElectricityUsage(input.getElectricityUsage());
        footprint.setCarDistance(input.getCarDistance());
        footprint.setBusDistance(input.getBusDistance());
        footprint.setTrainDistance(input.getTrainDistance());
        footprint.setMeatConsumption(input.getMeatConsumption());
        footprint.setWasteGeneration(input.getWasteGeneration());
        footprint.setHouseholdSize(input.getHouseholdSize());
        
        footprint.setElectricityEmissions(electricityEmissions);
        footprint.setTravelEmissions(travelEmissions);
        footprint.setMeatEmissions(meatEmissions);
        footprint.setWasteEmissions(wasteEmissions);
        footprint.setTotalEmissions(totalEmissions);
        footprint.setPerPersonEmissions(perPersonEmissions);
        
        return footprint;
    }
}
