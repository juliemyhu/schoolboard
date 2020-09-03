from model import db, User, College, UserProgram, Program, Requirement,ProgramRequirement, Prerequisite, connect_to_db

def create_user(first_name, last_name, email, password):
	"""Create and return a new user"""
	user = User(first_name=first_name, last_name=last_name, email = email, password = password)
	
	db.session.add(user)
	db.session.commit()

	return user

def get_user_by_id(id):
	"""return a user by id"""

	return User.query.get(id)

def get_user_by_email(email):
	"""return user by email"""

	return User.query.filter(User.email==email).first()

def get_user_fname(id):
	user = User.query.filter(User.user_id==id).first()

	return {
		"user_fname": user.first_name,
		"user_lname": user.last_name
	}




def create_college(college_id, name, city, state, longitude, latitude):
	"""Create and return a new college"""
	college = College(college_id=college_id, name=name, city=city, state=state, longitude=longitude, latitude=latitude)

	db.session.add(college)
	db.session.commit()

	return college

def get_college_by_id(id):
	"""returns college by id"""

	return College.query.filter(College.college_id == id).first()


def create_user_program(user_id, program_id):

	user_program = UserProgram(user_id=user_id, program_id=program_id)

	db.session.add(user_program)
	db.session.commit()

	return user_program

def create_program(user_id, college_id, name, cohort, minimum_gpa, label, link:"no_link"):
	"""Create and return program"""
	print("create program called")

	program = Program(college_id=college_id, name=name, cohort=cohort,minimum_gpa=minimum_gpa, label=label, link=link)
	print(program)
	print (program.program_id, program.name) 

	print('program created')
	db.session.add(program)
	db.session.commit()
	print ("after commit", program.program_id)
	user_program = UserProgram(user_id=user_id, program_id=program.program_id)
	db.session.add(user_program)
	db.session.commit()

	print("after commit 2", user_program)
	print("hello", user_program.programs)
	print("helloss", user_program.users)
	return program, user_program


def get_user_programs(id):
	"""return all programs where user_id=   """

	return UserProgram.query.filter(UserProgram.user_id == id).all()

def delete_program(id):

	program=db.session.query(UserProgram).filter(UserProgram.program_id==id).first()
	db.session.delete(program)
	db.session.commit()

	return 

def get_program_by_id(id):
	"""gets programs by programid"""

	# return Program.query.filter(Program.program_id == id).all()
	print("CRUD CRUD CRUD")
	condition2= (Program.college_id == College.college_id)
	condition1= (Program.program_id==id)
	for p, c in db.session.query(Program, College).filter(condition1, condition2).all():
		print("Program_id: {} College_name: {} college_state: {}".format(p.program_id, c.name, c.state))
		return {
			"program_id":p.program_id,
			"cohort":p.cohort,
			"minimum_gpa":p.minimum_gpa,
			"label":p.label,
			"link":p.link,
			"name":p.name,
			"college_id":c.college_id,
			"college_name":c.name,
			"college_state":c.state,
			"college_city":c.city,
			"college_lat":c.latitude,
			"college_lon":c.longitude
		}


def create_requirement(type):
	"""Create and return requirement"""
	requirement = Requirement(type=type)
	db.session.add(requirement)
	db.session.commit()

	return requirement 

def create_prerequisite(program_id, name, units, grade, status):
	"""create and returns prerequsite"""

	prerequisite= Prerequisite(program_id=program_id,name=name, units=units, grade=grade, status=status)
	db.session.add(prerequisite)
	db.session.commit()

	return prerequisite

def delete_prerequisite(prereq_id):
	"""deletes prerequisite"""

	prereq=db.session.query(Prerequisite).filter(Prerequisite.prerequisites_id==prereq_id).first()
	db.session.delete(prereq)
	db.session.commit()

	return 



def get_prerequisites(program_id):
	print("HI IM CALLED")
	prereq_list = Prerequisite.query.filter(Prerequisite.program_id == program_id).all()

	prereqs = []
	for prereq in prereq_list:
		prereqs.append({
			"name":prereq.name,
			"units":prereq.units,
			"grade":prereq.grade,
			"status":prereq.status,
			"prerequisite_id":prereq.prerequisites_id
		})
		
	return prereqs
	

def get_prerequisite_by_id(id):
	condition1 = (Prerequisite.program_id == Program.program_id)
	condition2 = (Prerequisite.prerequisite_id == id)
	for pre, pro in db.session.query(Prerequisite, Program).filter(condition1, condition2).all():
		return {
			"prerequisite_id":pre.prerequisite_id,
			"name": pre.name,
			"units": pre.units,
			"grade": pre.grade,
			"status": pre.status
		}
	
