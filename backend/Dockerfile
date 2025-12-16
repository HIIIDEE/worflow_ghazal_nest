# -----------------------------------------------------------------
# STAGE 1: Build (Installs ALL dependencies, compiles TypeScript)
# -----------------------------------------------------------------
# Use an official Node.js runtime as a parent image
FROM node:22.15.0 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# 🔥 CRITICAL: Must build the application source code!
RUN npm run build

# Run Prisma generate (should be done before build, but works here too)
RUN npx prisma generate

# -----------------------------------------------------------------
# STAGE 2: Production Runtime (Lighter image for execution)
# -----------------------------------------------------------------
FROM node:22.15.0-slim AS stage-1

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
# 1. package*.json (for start script and prod dependencies list)
COPY --from=builder /usr/src/app/package*.json ./
# 2. node_modules (production dependencies only)
# Re-install dependencies using production flags for a clean, smaller set
RUN npm ci --omit=dev

# Copy the generated Prisma Client files (the binaries needed at runtime)
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# 3. Compiled NestJS code
COPY --from=builder /usr/src/app/dist ./dist
# 4. Prisma runtime files (schema, client, .env)
COPY --from=builder /usr/src/app/prisma ./prisma
COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

# Run the production build command
# This assumes 'npm run start:prod' exists and runs 'node dist/main.js'
CMD ["npm", "run", "start:prod"]
