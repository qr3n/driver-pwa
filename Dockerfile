FROM node:18-alpine AS base

WORKDIR /app

COPY . .

# Install dependencies
RUN yarn install --frozen-lockfile

# Build app
RUN yarn build

# Expose the listening port
EXPOSE 3000

# Run yarb start script when container starts
CMD yarn start