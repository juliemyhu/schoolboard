# SchoolBoard 

School Board is a personalized school planner app that helps pre-graduate students in their application process. Users can register with the app,  add colleges they are interested in, and keep track of a programs prerequisite requirements. 

### Technologies Used
- Python
- Flask
- PostgresSQL
- SQLAlchemy
- Javascript
- JSON
- CSS
- HTML
- Bootstrap
- React
- CollegeAI API
- Google Maps API
###
(Dependencies are listed in requirements.txt)
### How to locally run SchoolBoard
SchoolBoard has not yet been deployed, so here is how to run the app locally on your machine.

1. Obtain API keys. Make sure the repository has access to keys. 
    - [College AI API](https://api-manager.collegeai.com/)
    - [Google Maps API](https://developers.google.com/maps/documentation)
2. Run in virtual environment (optional)
    - download a virtual environment like [Vagrant](https://www.vagrantup.com/downloads)
    ```bash
    vagrant up #activate vagrant
    vagrant ssh #login to vagrant
    cd src/projects/school_board # go to directory where school_board is located 
    virtualenv env # set up directory to have virtual env 
    source env/bin/activate #activate virtual environment
    pip3 install -r requirements #download requirements into virtual environment
    python3 server.py # launch server
    ```
3. If not using a virtual environment, make sure you install requirements in local environment

    ```bash
    pip3 install -r requirements # download requirements into local environment 
    python3 server.py # launch server
    ```
4. go to localhost and start using SchoolBoards

### Using SchoolBoards
1. Register on Hompage
![](/static/screenshots/register-example.png?raw=true)
2. Login
![](/static/screenshots/first-login.png?raw=true)
3. Add Schools you are interested in 
![](/static/screenshots/addschool.gif?raw=true)
4. Add Prerequisite courses
![](/static/screenshots/add-prereq.png?raw=true)
5. View Schools in Map
![](/static/screenshots/map-example.png?raw=true)

### Version 2.0
###### Filter Feature
- Alphabetically
- By Label
###### Be able to add more program information such as 
- letter of recommendations
- important dates 
- cost
- standardized test 

> quote



Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.
### About the Author 
Julie Hu is a previous pre-health student turned Software Engineer in the Bay Area. You can find more information in the links below

[Gitbub](https://github.com/juliemyhu "Julies Github")
[LinkedIn](https://www.linkedin.com/in/julie-hu/ "Julies linkedin")




