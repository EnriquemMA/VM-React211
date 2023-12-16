# ICS211 Web Applications - Lab 2 SOP App

## Purpose:

This project is used for lab 2.

### Folders in this Project:

* `/src` - the source files for the web application.

* `/web` - contains the Dockerfile for building the App Web Server.

### Files in this Project:

* `docker-compose.yml` - instructions for docker-compose to bring up the app. **Don't change anything in this file.**  

* `README.md` - what you're reading right now!

## Directions:

To bring up the environment, do the following:

1. In a bash prompt in your VM, in the same directory as the docker compose file, type:

    `docker-compose up -d`

    This will build a web server image and create a container for the web server. It will also link the project's `/src` folder with `/var/www/html` in the web container.

2. Your application will be at `http://<your VM's IP Address>:8085`

    * If it isn't working, verify that the containers are running: `docker-compose ps`  

    * If you want to look at logs (might help with debugging): `docker-compose logs`

    * If you want an interactive shell within the web server: `docker exec -it php-apache bash`  

3. When you're done:

    * Stop and remove the container: `docker-compose down`
