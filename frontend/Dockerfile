# Use official Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose dev port
EXPOSE 3000

# Start Next.js dev server with Webpack (disable Turbopack)
CMD ["npm", "run", "dev", "--", "--turbo", "false"]