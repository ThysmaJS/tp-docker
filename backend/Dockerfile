# Use an official Node.js LTS image
FROM node:18

# Create a non-root user and group
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY --chown=appuser:appgroup package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY --chown=appuser:appgroup . .

# Install OpenBSD Netcat and clean up to reduce image size
RUN apt-get update && \
    apt-get install -y --no-install-recommends netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Copy the wait-for-it script for MySQL readiness check
COPY --chown=appuser:appgroup wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

# # Add the script to generate settings.json
# COPY generate-settings.js /app/generate-settings.js

# # Create a public directory for settings.json
# RUN mkdir -p /app/public && chown -R appuser:appgroup /app/public

# Run the script to generate settings.json at startup

# Switch to the non-root user
USER appuser

# Expose the backend application port
EXPOSE 5000

# Run the app with wait-for-it to ensure DB readiness
CMD ["wait-for-it.sh", "db", "3306", "--", "npm", "start"]
