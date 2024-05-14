# Use the nginx:alpine base image
FROM nginx:alpine

# Copy the contents of the build directory to the Nginx html directory
COPY build/ /usr/share/nginx/html

# Expose port 80 (Nginx's default port)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

