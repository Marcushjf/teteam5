# Use Node LTS
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema first and generate client for Linux
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the app
COPY . .

# Expose ports
EXPOSE 8000 5555

# Start backend in dev mode (with nodemon if you use it)
CMD ["npm", "run", "dev"]