FROM node:18-alpine AS base

WORKDIR /app

COPY . .

# Install dependencies
RUN npm install --force

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run yarb start script when container starts
CMD npm run start