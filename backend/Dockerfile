# Use an official Node.js runtime as a parent image
FROM node:22.15.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g prisma

# Copy Prisma schema
COPY prisma ./prisma

# Copy the .env file
COPY .env .env

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:dev"]
