# Use official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose backend port
EXPOSE 5000

# Run the app
CMD ["npm", "start"]
FROM python:3.9  
WORKDIR /app  
COPY . .  
RUN pip install -r requirements.txt  
CMD ["python", "app.py"] 
