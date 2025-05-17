# Hosting Guide for Carbon Footprint Calculator

## 1. Deploy on Render (Recommended)

1. Sign up for a [Render](https://render.com) account
2. Push your code to GitHub
3. In Render Dashboard:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select "Docker" as environment
   - Settings will be loaded from `render.yaml`

## 2. Deploy Using Docker

### Local Deployment
```bash
# Build the image
docker build -t carbon-footprint-calculator .

# Run the container
docker run -p 8080:8080 carbon-footprint-calculator
```

### Cloud Deployment (Docker Hub)
```bash
# Tag your image
docker tag carbon-footprint-calculator yourusername/carbon-footprint-calculator

# Push to Docker Hub
docker push yourusername/carbon-footprint-calculator
```

## 3. Deploy on Railway

1. Create account on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Create new project and select your repo
4. Railway will automatically detect Dockerfile
5. Configure environment variables if needed

## 4. Deploy on AWS Elastic Beanstalk

1. Create an AWS account
2. Install AWS CLI and EB CLI
3. Initialize EB project:
   ```bash
   eb init carbon-footprint-calculator
   ```
4. Create environment:
   ```bash
   eb create carbon-footprint-prod
   ```

## 5. Deploy on Heroku

1. Install Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create Heroku app:
   ```bash
   heroku create carbon-footprint-app
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

## Environment Variables

Set these variables in your hosting platform:

```
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
JAVA_OPTS=-Xmx512m
```

## Database Options

### H2 Database (Default)
- No configuration needed
- Data is in-memory (will be lost on restart)

### PostgreSQL
1. Add to application-prod.properties:
   ```properties
   spring.datasource.url=${DATABASE_URL}
   spring.datasource.username=${DB_USERNAME}
   spring.datasource.password=${DB_PASSWORD}
   ```

### MySQL
1. Add to application-prod.properties:
   ```properties
   spring.datasource.url=jdbc:mysql://${DB_HOST}:3306/${DB_NAME}
   spring.datasource.username=${DB_USERNAME}
   spring.datasource.password=${DB_PASSWORD}
   ```

## Troubleshooting

### Common Issues

1. Application won't start:
   - Check logs: `docker logs container-id`
   - Verify environment variables
   - Check port availability

2. Memory issues:
   - Adjust JVM settings: `-Xmx512m`
   - Monitor memory usage
   - Consider upgrading plan

3. Database connection:
   - Check database credentials
   - Verify network access
   - Check database service status

## Health Checks

Monitor application health:
- `/actuator/health` - Basic health info
- `/actuator/metrics` - Detailed metrics
- `/actuator/info` - Application info

## Support

For deployment issues:
1. Check application logs
2. Review error messages
3. Consult platform-specific documentation
4. Create an issue in the GitHub repository

Remember to:
- Always test in staging first
- Keep environment variables secure
- Monitor application performance
- Set up automated backups
- Configure proper logging
