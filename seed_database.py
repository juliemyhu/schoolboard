import os
import json
from random import choice, randint
from datetime import datetime
import crud, model, server

os.system('dropdb schoolboards')
os.system('createdb schoolboards')

model.connect_to_db(server.app)
model.db.create_all()

with open('data/colleges.json') as f:
    college_data = json.loads(f.read())

colleges_in_db = []

for college in college_data:
    college_id, name, city, state, longitude, latitude = (college['college_id'],
                                                            college['name'],
                                                            college['city'],
                                                            college['state'],
                                                            college['longitude'],
                                                            college['latitude'])

    db_college = crud.create_college(college_id, name, city, state, longitude, latitude)

    colleges_in_db.append(db_college)

crud.create_user("test","user","user@user.com", "123")
crud.create_program("1","123961","PharmD","Fall 2020","2.8","Reach","https://pharmacyschool.usc.edu/apply/admission/requirements/")
crud.create_program("1","110653","PharmD","Fall 2020","2.5","Match","https://pharmacyschool.usc.edu/apply/admission/requirements/")
crud.create_program("1","123961","PharmD","Fall 2020","3.0","Reach","https://pharmacyschool.usc.edu/apply/admission/requirements/")
crud.create_prerequisite(1, "bio",4, "A", "Complete")
crud.create_prerequisite(1, "chem",4, "A", "In Progress")



crud.create_user("julie","hu","julie@user.com", "123")
crud.create_program("2","123961","DDS","Spring 2020","2.5","Match","https://dentistry.usc.edu/admission/doctor-of-dental-surgery-dds/" )
crud.create_program("2","110653","DDS","Spring 2020","3.0","Match","https://dentistry.ucsf.edu/programs/dds/admissions/prerequisites" ) 
crud.create_prerequisite(4, "bio",4, "A", "Complete")
crud.create_prerequisite(4, "chem",4, "B", "In Progress")