# Deployment Guide for Carbon Footprint Calculator

## Deploying to Render.com (Recommended - Free Tier)

1. Create a Render.com account at https://render.com

2. Fork or push your project to GitHub

3. On Render Dashboard:
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Choose your repository

4. Configure the deployment:
   - Name: carbon-footprint-calculator
   - Environment: Docker
   - Branch: main
   - Plan: Free
   - Click "Create Web Service"

The application will automatically deploy using the configuration in `render.yaml`.

## Alternative Deployment Options

### Local Docker Deployment

```bash
# Build the Docker image
docker build -t carbon-footprint-calculator .

# Run the container
docker run -p 8080:8080 carbon-footprint-calculator
```

### Manual JAR Deployment

```bash
# Build the JAR
./mvnw clean package -DskipTests

# Run the JAR
java -jar -Dspring.profiles.active=prod target/*.jar
```

## Environment Variables

The following environment variables can be configured:

- `SPRING_PROFILES_ACTIVE`: Set to `prod` for production environment
- `PORT`: The port number (default: 8080)

## Deployment Checklist

1. Ensure all files are committed to Git
2. Verify application.properties and application-prod.properties settings
3. Test the application locally using the production profile
4. Build and test Docker image locally before deployment
5. Monitor application logs after deployment

## Troubleshooting

1. If the application fails to start, check:
   - Logs in Render.com dashboard
   - Application configuration
   - Database connection (if using external database)

2. Common issues:
   - Port conflicts (resolved by Render.com automatically)
   - Memory limits (upgrade plan if needed)
   - Build failures (check build logs)

## Support

For issues:
1. Check Render.com documentation
2. Review application logs
3. Create an issue in the GitHub repository

## Post-Deployment

1. Monitor the application performance
2. Set up alerts for downtime (available in Render.com)
3. Regular backups of any persistent data
4. Keep dependencies updated
