# Platform Setup Guide for Carbon Footprint Calculator

This guide provides detailed instructions for deploying the application on various cloud platforms.

## Prerequisites

- Java 21
- Git
- Docker (optional)
- Heroku CLI (for Heroku deployment)
- AWS CLI (for AWS deployment)

## Quick Deploy Options

### 1. Using Render (Recommended)

1. **Setup**
   ```bash
   git push your-repo main
   ```
2. Navigate to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Web Service"
4. Connect your repository
5. Select "Docker" environment
6. Configuration will be loaded from `render.yaml`

**Expected Cost**: Free tier available

### 2. Using Railway

1. **Setup**
   ```bash
   git push your-repo main
   ```
2. Visit [Railway](https://railway.app)
3. Create new project
4. Select your repository
5. Configuration will be loaded from `railway.toml`

**Expected Cost**: Free tier available (limited hours)

### 3. Using Heroku

1. **Deploy**
   ```bash
   heroku login
   heroku create carbon-footprint-app
   git push heroku main
   ```

2. **Configure**
   ```bash
   heroku config:set SPRING_PROFILES_ACTIVE=prod
   heroku config:set JAVA_OPTS=-Xmx512m
   ```

**Expected Cost**: Basic Dyno ($7/month)

## Manual Deployment Options

### 1. Using Docker

```bash
# Build
docker build -t carbon-footprint-calculator .

# Run
docker run -p 8080:8080 carbon-footprint-calculator
```

### 2. Using JAR File

```bash
# Build
./mvnw clean package -DskipTests

# Run
java -jar target/carbon-0.0.1-SNAPSHOT.jar
```

## Database Configuration

### H2 (Default - In-memory)
No configuration needed. Data will be lost on restart.

### PostgreSQL
```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

### MySQL
```properties
spring.datasource.url=jdbc:mysql://${DB_HOST}:3306/${DB_NAME}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

## Environment Variables

Set these variables in your platform's configuration:

| Variable | Description | Default |
|----------|-------------|---------|
| `SPRING_PROFILES_ACTIVE` | Active Spring profile | `prod` |
| `SERVER_PORT` | Application port | `8080` |
| `JAVA_OPTS` | JVM options | `-Xmx512m` |
| `DATABASE_URL` | Database connection URL | `h2:mem:carbdb` |

## Platform-Specific Features

### Render
- Automatic HTTPS
- Zero-downtime deployments
- Built-in Docker support
- Auto-scaling available

### Railway
- Automatic deployments
- Built-in monitoring
- Auto-scaling
- Volume persistence

### Heroku
- Easy scaling
- Add-ons marketplace
- Built-in PostgreSQL
- Automatic SSL

## Monitoring & Maintenance

### Health Checks
Access these endpoints to monitor application health:
- `/actuator/health` - Basic health status
- `/actuator/metrics` - Detailed metrics
- `/actuator/info` - Application information

### Logs
```bash
# Render
render logs --app carbon-footprint-calculator

# Railway
railway logs

# Heroku
heroku logs --tail
```

### Scaling
- **Render**: Adjust instance count in dashboard
- **Railway**: Configure in `railway.toml`
- **Heroku**: `heroku ps:scale web=2`

## Troubleshooting

### Common Issues

1. **Application Won't Start**
   - Check logs using platform-specific commands
   - Verify environment variables
   - Ensure database connection (if using external DB)

2. **Memory Issues**
   - Adjust `JAVA_OPTS` memory settings
   - Monitor memory usage in platform dashboard
   - Consider upgrading plan if needed

3. **Database Connection**
   - Verify connection string
   - Check database credentials
   - Ensure database service is running

## Support

For deployment issues:
1. Check application logs
2. Review platform-specific documentation
3. Create an issue in the GitHub repository
4. Contact platform support

## Security Notes

1. Always use HTTPS in production
2. Secure environment variables
3. Regularly update dependencies
4. Monitor application logs
5. Set up proper authentication

Remember to always test in staging before deploying to production!
