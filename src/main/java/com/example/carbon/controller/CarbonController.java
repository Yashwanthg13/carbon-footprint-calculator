package com.example.carbon.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.example.carbon.model.InputData;
import com.example.carbon.model.CarbonFootprint;

@Controller
public class CarbonController {

    @GetMapping("/")
    public String showCalculator(Model model) {
        model.addAttribute("inputData", new InputData());
        return "index";
    }

    @PostMapping("/calculate")
    public String calculateFootprint(@ModelAttribute InputData inputData, Model model) {
        // Calculate carbon footprint
        CarbonFootprint result = calculateCarbonFootprint(inputData);
        
        // Add results to model
        model.addAttribute("result", result);
        model.addAttribute("inputData", inputData);
        
        // Add eco tip based on highest emission source
        model.addAttribute("ecoTip", getEcoTip(result));
        
        return "index";
    }

    private CarbonFootprint calculateCarbonFootprint(InputData input) {
        CarbonFootprint result = new CarbonFootprint();
        
        // Calculate electricity emissions (0.4 kg CO2 per kWh)
        double electricityEmissions = input.getElectricityUsage() * 0.4;
        
        // Calculate travel emissions
        // Car: 0.2 kg CO2 per km
        // Bus: 0.08 kg CO2 per km
        // Train: 0.04 kg CO2 per km
        double travelEmissions = (input.getCarDistance() * 0.2) +
                               (input.getBusDistance() * 0.08) +
                               (input.getTrainDistance() * 0.04);
        
        // Calculate food emissions (Meat: 6.0 kg CO2 per kg)
        double foodEmissions = input.getMeatConsumption() * 6.0;
        
        // Calculate waste emissions (0.5 kg CO2 per kg waste)
        double wasteEmissions = input.getWasteGeneration() * 0.5;
        
        // Set calculated values
        result.setElectricityEmissions(electricityEmissions);
        result.setTravelEmissions(travelEmissions);
        result.setFoodEmissions(foodEmissions);
        result.setWasteEmissions(wasteEmissions);
        
        // Calculate total emissions
        double totalEmissions = electricityEmissions + travelEmissions + 
                              foodEmissions + wasteEmissions;
        result.setTotalEmissions(totalEmissions);
        
        // Calculate per person emissions
        double perPersonEmissions = totalEmissions / input.getHouseholdSize();
        result.setPerPersonEmissions(perPersonEmissions);
        
        return result;
    }

    private String getEcoTip(CarbonFootprint result) {
        double electricityEmissions = result.getElectricityEmissions();
        double travelEmissions = result.getTravelEmissions();
        double foodEmissions = result.getFoodEmissions();
        double wasteEmissions = result.getWasteEmissions();
        
        double max = Math.max(
            Math.max(electricityEmissions, travelEmissions),
            Math.max(foodEmissions, wasteEmissions)
        );
        
        if (max == electricityEmissions) {
            return "Consider switching to LED bulbs and energy-efficient appliances to reduce your electricity consumption by up to 80%.";
        } else if (max == travelEmissions) {
            return "Try using public transportation, carpooling, or cycling for shorter distances to minimize your travel emissions.";
        } else if (max == foodEmissions) {
            return "Consider incorporating more plant-based meals into your diet to reduce your food-related carbon footprint.";
        } else {
            return "Practice recycling and composting to reduce your waste impact. Try to minimize single-use plastics.";
        }
    }
}
