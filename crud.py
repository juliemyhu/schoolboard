


def create_user(email, password, location):
	"""Create and return a new user"""
	user = User(email = email, password = password, location =location)
	
	db.session.add(user)
	db.session.commit()

	return user




def create_college(name, location, program):
	"""Create and return a new college"""
	college = College(name=name, location=location, program=program)

	db.session.add(college)
	db.session.commit()

	return college