FROM node:18-alpine as build-stage1

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first


# Set the working directory to /drf
# NOTE: all the directives that follow in the Dockerfile will be executed in
# that directory.

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
# Install any needed packages specified in requirements.txt
#RUN npm install
COPY . /app
#RUN npm install --save ckeditor5-simple-build.tar.gz
CMD npm run build
#EXPOSE 8080

#CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
# CMD ["%%CMD%%"]
# Copy the Nginx configuration
COPY .docker/nginx/prod.conf /temp/prod.conf

# Production Stage
FROM nginx:stable-alpine as production-stage1

# Create the conf.d directory
RUN mkdir -p /etc/nginx/conf.d

# Copy your Nginx configuration
COPY --from=build-stage1 /temp/prod.conf /etc/nginx/conf.d/default.conf

# Copy your Vue.js build
COPY --from=build-stage1 /app/dist /usr/share/nginx/html

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
