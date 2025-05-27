package com.example.carbon.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

import java.util.logging.Level;
import java.util.logging.Logger;

@Controller
public class CustomErrorController implements ErrorController {
    
    private static final Logger logger = Logger.getLogger(CustomErrorController.class.getName());

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        // Get error details
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        Object message = request.getAttribute(RequestDispatcher.ERROR_MESSAGE);
        Object exception = request.getAttribute(RequestDispatcher.ERROR_EXCEPTION);
        Object path = request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);
        
        // Log error details
        logger.log(Level.SEVERE, "Error occurred: Status={0}, Path={1}, Message={2}", 
                   new Object[]{status, path, message});
        
        if (exception != null) {
            logger.log(Level.SEVERE, "Exception details:", (Throwable)exception);
        }
        
        // Add attributes to model
        model.addAttribute("status", status != null ? status : "Unknown");
        model.addAttribute("error", getErrorMessage(status));
        model.addAttribute("message", message != null ? message : "No additional information available");
        model.addAttribute("path", path != null ? path : "Unknown");
        model.addAttribute("timestamp", java.time.LocalDateTime.now());
        
        if (exception != null) {
            model.addAttribute("exception", exception.toString());
        }
        
        return "error";
    }
    
    private String getErrorMessage(Object status) {
        if (status == null) {
            return "Unknown Error";
        }
        
        try {
            int statusCode = Integer.parseInt(status.toString());
            switch (statusCode) {
                case 400: return "Bad Request";
                case 401: return "Unauthorized";
                case 403: return "Forbidden";
                case 404: return "Not Found";
                case 500: return "Internal Server Error";
                default: return "HTTP Error " + statusCode;
            }
        } catch (NumberFormatException e) {
            return status.toString();
        }
    }
}
