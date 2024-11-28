# Use an official Node.js LTS image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json to leverage caching for dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application source code
COPY . .

# Expose the React development server port
EXPOSE 3000

# Run the React development server
CMD ["npm", "start"]
