
# Carbon Footprint Calculator - Spring Boot Web Application

## 🌱 Overview
This is a simple Spring Boot web application that calculates the carbon footprint based on user input, such as electricity usage, travel distance, and fuel type.

## 🧰 Technologies Used
- Java 17+
- Spring Boot 3.x
- Thymeleaf (for frontend templating)
- Maven

## 📁 Project Structure
```
carbon-footprint-calculator/
├── src/
│   ├── main/
│   │   ├── java/com/example/carbon/
│   │   │   ├── CarbonFootprintCalculatorApplication.java
│   │   │   ├── controller/CarbonController.java
│   │   │   └── model/InputData.java
│   │   └── resources/
│   │       ├── templates/index.html
│   │       └── application.properties
├── pom.xml
```

## 📦 pom.xml (Dependencies)
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" ...>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>carbon-footprint-calculator</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>
    <name>carbon-footprint-calculator</name>
    <description>Simple Spring Boot Web App</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
    </dependencies>
</project>
```

## 🧠 Backend Logic

### `CarbonFootprintCalculatorApplication.java`
```java
@SpringBootApplication
public class CarbonFootprintCalculatorApplication {
    public static void main(String[] args) {
        SpringApplication.run(CarbonFootprintCalculatorApplication.class, args);
    }
}
```

### `InputData.java`
```java
public class InputData {
    private double electricityUsage;
    private double travelDistance;

    // Getters and setters
}
```

### `CarbonController.java`
```java
@Controller
public class CarbonController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("inputData", new InputData());
        return "index";
    }

    @PostMapping("/calculate")
    public String calculate(@ModelAttribute InputData data, Model model) {
        double result = data.getElectricityUsage() * 0.92 + data.getTravelDistance() * 0.21;
        model.addAttribute("result", result);
        return "index";
    }
}
```

## 🖥️ Frontend - `index.html`
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Carbon Footprint Calculator</title>
</head>
<body>
    <h2>Carbon Footprint Calculator</h2>
    <form th:action="@{/calculate}" th:object="${inputData}" method="post">
        <label>Electricity Usage (kWh):</label>
        <input type="number" step="0.1" th:field="*{electricityUsage}" required/><br/>
        <label>Travel Distance (km):</label>
        <input type="number" step="0.1" th:field="*{travelDistance}" required/><br/>
        <button type="submit">Calculate</button>
    </form>
    <div th:if="${result != null}">
        <h3>Your Carbon Footprint: <span th:text="${result}"/> kg CO₂</h3>
    </div>
</body>
</html>
```

## ▶️ Run the App
```bash
./mvnw spring-boot:run
```

## 🔚 Conclusion
This is a basic Carbon Footprint Calculator built with Spring Boot. You can expand it with a database, user login, graphs, and REST APIs.
