# Use an official Node.js image as the base image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN yarn build

# Use Nginx as the base image for serving the React app
FROM nginx:alpine

# Copy the built React app from the build stage to the Nginx web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow external access to the React app
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
