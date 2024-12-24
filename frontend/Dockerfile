# Use an official Node.js LTS image
FROM node:18

# Create a non-root user and group
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json with correct ownership
COPY --chown=appuser:appgroup package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application source code with correct ownership
COPY --chown=appuser:appgroup . .

# Switch to the non-root user
USER appuser

# Expose the React development server port
EXPOSE 3000

# Run the React development server
CMD ["npm", "start"]
