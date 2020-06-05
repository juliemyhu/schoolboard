from model import db, User, College, UserCollege, Program, Requirement,ProgramRequirement, Prerequsites, connect_to_db

def create_user(email, password, location):
	"""Create and return a new user"""
	user = User(email = email, password = password, location =location)
	
	db.session.add(user)
	db.session.commit()

	return user




def create_college(name, city, state, longitude, latitude):
	"""Create and return a new college"""
	college = College(name=name, city=city, state=state, longitude=longitude, latitude=latitude)

	db.session.add(college)
	db.session.commit()

	return college



