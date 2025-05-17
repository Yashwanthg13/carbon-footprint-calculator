package com.example.carbon.model;

import java.time.LocalDate;

public class CarbonGoal {
    private double targetEmissions;
    private LocalDate targetDate;
    private String category; // e.g., "electricity", "transport", "overall"
    private double startingEmissions;
    private LocalDate startDate;
    
    public double getTargetEmissions() {
        return targetEmissions;
    }
    
    public void setTargetEmissions(double targetEmissions) {
        this.targetEmissions = targetEmissions;
    }
    
    public LocalDate getTargetDate() {
        return targetDate;
    }
    
    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public double getStartingEmissions() {
        return startingEmissions;
    }
    
    public void setStartingEmissions(double startingEmissions) {
        this.startingEmissions = startingEmissions;
    }
    
    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    
    public double getProgressPercentage(double currentEmissions) {
        if (startingEmissions == targetEmissions) return 100.0;
        return ((startingEmissions - currentEmissions) / (startingEmissions - targetEmissions)) * 100.0;
    }
    
    public boolean isAchieved(double currentEmissions) {
        return currentEmissions <= targetEmissions;
    }
    
    public long getDaysRemaining() {
        return LocalDate.now().until(targetDate).getDays();
    }
}
