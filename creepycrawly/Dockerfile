# Use Node LTS
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose ports
EXPOSE 4000

# Start backend in dev mode (with nodemon if you use it)
CMD ["npm", "run", "start"]