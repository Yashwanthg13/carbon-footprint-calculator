# Carbon Footprint Calculator

A modern web application to calculate and track your carbon footprint with an intuitive interface and real-time visualization.

*Last updated: May 27, 2025*

## Features

- 🌱 Calculate your carbon footprint based on multiple factors
- 📊 Interactive charts and visualizations
- 🌓 Dark/Light theme with beautiful transitions
- 🎯 Set and track emission reduction goals
- 💡 Get personalized eco-friendly tips

## Live Demo

[Access the live application](https://ecocalc.yashwanthg.com)

## Tech Stack

- Java Spring Boot
- Thymeleaf
- Bootstrap
- Chart.js
- H2 Database
- Docker

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/carbon-footprint-calculator.git
cd carbon-footprint-calculator
```

2. Build the application:
```bash
./mvnw clean package
```

3. Run locally:
```bash
./mvnw spring-boot:run
```

Visit `http://localhost:8080` in your browser.

## Docker Deployment

1. Build the Docker image:
```bash
docker build -t carbon-footprint-calculator .
```

2. Run the container:
```bash
docker run -p 8080:8080 carbon-footprint-calculator
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to your branch: `git push origin feature-name`
5. Submit a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
