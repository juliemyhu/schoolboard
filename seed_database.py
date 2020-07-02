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

# crud.create_user("Test","User","user@user.com", "123")
# crud.create_program("1","123961","PharmD","Fall 2020","2.8","Reach","https://pharmacyschool.usc.edu/apply/admission/requirements/")
# crud.create_program("1","110653","PharmD","Fall 2020","2.5","Match","https://pharmacyschool.usc.edu/apply/admission/requirements/")
# crud.create_prerequisite(1, "Bio",4, "A", "Complete")
# crud.create_prerequisite(1, "Chem",4, "A", "In Progress")
# crud.create_prerequisite(2, "Anatomy",4, "B", "In Progress")
# crud.create_prerequisite(1, "Physio",4, "A", "Complete")



crud.create_user("Julie","Hu","julie@user.com", "123")
crud.create_program("1","123961","PharmD","Spring 2020","2.5","Match","https://pharmacyschool.usc.edu/apply/admission/requirements/" )
crud.create_program("1","110653","PharmD","Fall 2020","3.0","Match","https://pharmsci.uci.edu/") 

crud.create_prerequisite(1, "Bio",4, "A", "Complete")
crud.create_prerequisite(1, "Chem",4, "B", "In Progress")
crud.create_prerequisite(1, "Anatomy",4, "B", "In Progress")
crud.create_prerequisite(1, "Physio",4, "A", "Complete")
crud.create_prerequisite(1, "Math",4, "B", "Complete")
crud.create_prerequisite(1, "Public Speaking",4, " ", "Planned")



crud.create_prerequisite(2, "Bio",4, "A", "Complete")
crud.create_prerequisite(2, "Micro",4, "B", "In Progress")
crud.create_prerequisite(2, "Anatomy",4, "B", "In Progress")
crud.create_prerequisite(2, "Physio",4, "A", "Complete")
crud.create_prerequisite(2, "Econ",4, " ", "Planned")