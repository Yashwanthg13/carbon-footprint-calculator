package com.example.carbon.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.carbon.model.InputData;

@Controller
public class CarbonController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("inputData", new InputData());
        // Initialize with default values
        model.addAttribute("result", 0.0);
        model.addAttribute("perPerson", 0.0);
        model.addAttribute("electricityEmissions", 0.0);
        model.addAttribute("travelEmissions", 0.0);
        model.addAttribute("meatEmissions", 0.0);
        model.addAttribute("wasteEmissions", 0.0);
        return "index";
    }

    @PostMapping("/calculate")
    public String calculate(@ModelAttribute InputData data, Model model) {
        // Calculate carbon footprint from different sources
        
        // Electricity: 0.92 kg CO2 per kWh
        double electricityEmissions = data.getElectricityUsage() * 0.92;
        
        // Travel emissions by vehicle type
        // Car: 0.171 kg CO2 per km (average car)
        double carEmissions = data.getCarDistance() * 0.171;
        
        // Bus: 0.089 kg CO2 per km per person
        double busEmissions = data.getBusDistance() * 0.089;
        
        // Train: 0.041 kg CO2 per km per person (electric train)
        double trainEmissions = data.getTrainDistance() * 0.041;
        
        // Total travel emissions
        double travelEmissions = carEmissions + busEmissions + trainEmissions;
        
        // Waste generation: 0.5 kg CO2 per kg of waste
        double wasteEmissions = data.getWasteGeneration() * 0.5;
        
        // Meat consumption: 13.3 kg CO2 per kg of meat (average across different types)
        double meatEmissions = data.getMeatConsumption() * 13.3;
        
        // Calculate total footprint
        double totalEmissions = electricityEmissions + travelEmissions + wasteEmissions + meatEmissions;
        
        // Adjust for household size (per person footprint)
        double perPersonEmissions = data.getHouseholdSize() > 0 ? 
            totalEmissions / data.getHouseholdSize() : totalEmissions;
        
        // Round to 2 decimal places
        perPersonEmissions = Math.round(perPersonEmissions * 100.0) / 100.0;
        totalEmissions = Math.round(totalEmissions * 100.0) / 100.0;
        
        // Add calculation results to model
        model.addAttribute("inputData", data);
        model.addAttribute("result", totalEmissions);
        model.addAttribute("perPerson", perPersonEmissions);
        model.addAttribute("electricityEmissions", Math.round(electricityEmissions * 100.0) / 100.0);
        model.addAttribute("travelEmissions", Math.round(travelEmissions * 100.0) / 100.0);
        model.addAttribute("meatEmissions", Math.round(meatEmissions * 100.0) / 100.0);
        model.addAttribute("wasteEmissions", Math.round(wasteEmissions * 100.0) / 100.0);
        
        return "index";
    }
}
