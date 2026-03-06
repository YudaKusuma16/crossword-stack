# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies (for serve)
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Install serve to run the app
RUN npm install -g serve

# Use PORT from environment variable (Railway provides this)
ENV PORT=8080
EXPOSE 8080

# Use shell format to expand $PORT
CMD serve -s dist -l $PORT
