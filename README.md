# SchoolBoard 
SchoolBoard is deployed as of September 2020 
[Live Demo](http://34.216.56.161)

School Board is a personalized school planner app that helps pre-graduate students in their application process. Users can register with the app,  add colleges they are interested in, and keep track of a programs prerequisite requirements.They can also see where the  colleges are located in a little Google Map feature. 

[To see a short video presentation of SchoolBoard on Youtube, click this link](https://www.youtube.com/watch?v=kOM-kQPbAHo)

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
Here is how to run the app locally on your machine.

1. Download this repository 
2. Obtain API keys. Make sure the repository has access to keys. (I put my API in a secrets.sh file and ran it in my virtual env) 
    - [College AI API](https://api-manager.collegeai.com/)
    - [Google Maps API](https://developers.google.com/maps/documentation)
3. Add a virtual environment to the directory (optional)
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
4. If not using a virtual environment, make sure you install requirements in local environment

    ```bash
    pip3 install -r requirements # download requirements into local environment 
    python3 server.py # launch server
    ```
5. After running server.py go to localhost and start using SchoolBoards!

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
- Alphabetically (sorts programs alphabetically)
- By Label (sorts programs by users Label)
###### Be able to add more program information such as 
- letter of recommendations
- important dates 
- cost
- standardized test 

### About the Author 
Julie Hu is a previous pre-health student turned Software Engineer in the Bay Area. You can find more information about her in the links below:

[Github](https://github.com/juliemyhu)

[LinkedIn](https://www.linkedin.com/in/julie-hu/)




