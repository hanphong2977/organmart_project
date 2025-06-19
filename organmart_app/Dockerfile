# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install
COPY package.json package-lock.json* ./
RUN npm install

# Copy full source code
COPY . .

# Expo ports
EXPOSE 19000 19001 19002 8081

# Default command
CMD ["npm", "run", "start:qr"]
