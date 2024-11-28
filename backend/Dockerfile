# Use an official Node.js LTS image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Install OpenBSD Netcat and clean up to reduce image size
RUN apt-get update && \
    apt-get install -y --no-install-recommends netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Copy the wait-for-it script for MySQL readiness check
COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expose the backend application port
EXPOSE 5000

# Run the app with wait-for-it to ensure DB readiness
CMD ["wait-for-it.sh", "db", "3306", "--", "npm", "start"]
