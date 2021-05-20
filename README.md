![Alt text](carna.png?raw=true "CARNA")


The take home project is built by Django Rest Framework and ReactJS as a web project.
Backend is built by DRF + Postgresql and frontend is built by ReactJS.

I could built backend by nodejs also but I already used javascript for reactjs and I wanted use django rest framework to combine Javascript and Python stacks. Also I wanted to show I have skills on both of them.

The authentication is done by JWT and used Axios to make post, get, delete request.

After activate virtual env (source ./python_env/bin/activate) install all requiremets (pip3 install -r requirements.txt) from the requirements.txt you can migrate database tables to the postgres (python manage.py migate) and create superuser (python manage.py createsuperuser) and run the backend server (python manage.py runserver). At the same time you can start reactjs (npm start) and login page will be appear. You can use superuser username and password.

I had limited time and I could not add more functions to the project.
Here are other things what I want to add extra if I had more time:
- Export/Import data function
- Restrict all pages for not logged user
- Sing out
- Reactjs test (backend test is done)
- Non-blocking concurrent request
- Containerizing the project

