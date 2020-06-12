from model import db, User, College, UserProgram, Program, Requirement,ProgramRequirement, Prerequisite, connect_to_db

def create_user(email, password, location="default"):
	"""Create and return a new user"""
	user = User(email = email, password = password, location =location)
	
	db.session.add(user)
	db.session.commit()

	return user

def get_user_by_id(id):
	"""return a user by id"""

	return User.query.get(id)

def create_user_program(user_id, program_id):

	user_program = UserProgram(user_id=user_id, program_id=program_id)

	db.session.add(user_program)
	db.session.commit()

	return user_program


def create_college(college_id, name, city, state, longitude, latitude):
	"""Create and return a new college"""
	college = College(college_id=college_id, name=name, city=city, state=state, longitude=longitude, latitude=latitude)

	db.session.add(college)
	db.session.commit()

	return college

def get_college_by_id(id):
	"""returns college by id"""

	return College.query.filter(College.college_id == id).first()


def create_program(college_id, name, cohort, link:"no_link"):
	"""Create and return program"""
	print("create programm called")

	program = Program(college_id=college_id, name=name, cohort=cohort, link=link)
	print(program)
	print (program.program_id, program.name) 

	print('program created')
	db.session.add(program)
	db.session.commit()
	print ("after commit",program.program_id)
	user_program = UserProgram(user_id=1, program_id=program.program_id)
	db.session.add(user_program)
	db.session.commit()

	print("after commit 2", user_program)
	print("hello", user_program.programs)
	print("helloss", user_program.users)
	return program, user_program


def get_users_programs(id):
	"""return all programs where user_id=   """

	return UserProgram.query.filter(UserProgram.user_id == id).all()

def create_requirement(type):
	"""Create and return requirement"""
	requirement = Requirement(type=type)
	db.session.add(requirement)
	db.session.commit()

	return requirement 

def create_prerequisite(program_id, name, units, grade, status):
	"""create and returns prerequsite"""

	prerequsite= Prerequisite(program_id=program_id,name=name, units=units, grade=grade, status=status)
	db.session.add(prerequsite)
	db.session.commit()

	return prerequsite

