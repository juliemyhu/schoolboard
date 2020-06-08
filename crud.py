from model import db, User, College, UserProgram, Program, Requirement,ProgramRequirement, Prerequsites, connect_to_db

def create_user(email, password, location="default"):
	"""Create and return a new user"""
	user = User(email = email, password = password, location =location)
	
	db.session.add(user)
	db.session.commit()

	return user

def get_user_by_id(id):
	"""return a user by id"""

	return User.query.get(id)


def create_college(college_id, name, city, state, longitude, latitude):
	"""Create and return a new college"""
	college = College(college_id=college_id, name=name, city=city, state=state, longitude=longitude, latitude=latitude)

	db.session.add(college)
	db.session.commit()

	return college

def get_college_by_id(id):
	"""returns college by id"""

	return College.query.filter(College.college_id == id).first()


def create_program(college_id, program, cohort, cost=0, link="no_link"):
	"""Create and return program"""
	program = Program(college_id=college_id, program=program, cohort=cohort, cost=cost, link=link) 

	db.session.add(Program)
	db.session.commit()
	return program 


def get_myprograms():
	"""return all of a users colleges"""

	return UserProgram.query.all()


