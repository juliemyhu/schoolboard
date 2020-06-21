"""Models for school board app."""
from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()




class User(db.Model):
	"""A User."""

	__tablename__ = 'users'

	user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	first_name= db.Column(db.String, nullable=False)
	last_name= db.Column(db.String, nullable=False)
	email = db.Column(db.String, unique=True)
	password = db.Column(db.String)
	location = db.Column(db.String)

	# usercolleges = db.relationship("UserColleges")
	userprograms = db.relationship("UserProgram")

	def __repr__(self):
		return f'<User user_id={self.user_id} email={self.email}>'



class College(db.Model):
	"""A College."""

	__tablename__ = 'colleges'

	college_id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String)
	state = db.Column(db.String)
	city = db.Column(db.String)
	longitude = db.Column (db.Float)
	latitude = db.Column (db.Float)


	# usercolleges = db.relationship("UserColleges")
	# userprograms = db.relationship("UserProgram")
	# programs=db.relationship("program") dont need this because we have backref


	def __repr__(self):
		return f'<College college_id={self.college_id} college_id={self.college_id}>'

class UserProgram(db.Model):
	"""College of a specific user"""

	__tablename__ = 'user_programs'

	user_program_id= db.Column(db.Integer, autoincrement= True, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	program_id = db.Column(db.Integer, db.ForeignKey('programs.program_id'), nullable=False)


	programs = db.relationship("Program", cascade="all,delete", backref='UserProgram')
	users = db.relationship("User")

	def __repr__(self):
		return f'<UserProgram user_id={self.user_id} program_id={self.program_id}>'

class Program(db.Model):
	"""A program."""

	__tablename__= 'programs'

	program_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	college_id = db.Column(db.Integer, db.ForeignKey('colleges.college_id'), nullable=False)
	name = db.Column(db.String)
	cohort = db.Column(db.String)
	label = db.Column(db.String)
	link = db.Column(db.String)

	# programrequirements = db.relationship("program_requirements", backref="programs")
	college = db.relationship("College", backref="Program")
	requirement = db.relationship('Prerequisite', cascade="all,delete", backref='Program')

	def as_dict(self):
		return {c.name: getattr(self, c.name) for c in self.__table__.columns}

	def __repr__(self):
		return f'<Program program_id={self.program_id} college_id={self.college_id}>'

class Requirement(db.Model):
	"""A requirement."""

	__tablename='requirements'

	requirement_type = db.Column(db.String, primary_key = True)

	# programrequirements = db.relationship("ProgramRequirement")


	def __repr__(self):
		return f'<Requirements requirement_type={self.requirement_type}>'

class ProgramRequirement(db.Model):
	"""A requirement for a particular program."""

	__tablename__='program_requirements'

	program_requirements_id= db.Column(db.Integer, autoincrement= True, primary_key=True)
	program_id = db.Column(db.Integer, db.ForeignKey('programs.program_id'), nullable=False)
	requirement_type = db.Column(db.String, db.ForeignKey('requirement.requirement_type'), nullable=False)
	status= db.Column(db.String)
	date = db.Column(db.String)

	programs = db.relationship("Program")
	requirements = db.relationship("Requirement")

	def __repr__(self):
		return f'<ProgramRequirement program_requirements_id={self.program_requirements_id} >'

class Prerequisite(db.Model):
	"""A prerequisite course of a program. """

	__tablename__= 'prerequisites'

	prerequisites_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	program_id = db.Column(db.Integer, db.ForeignKey('programs.program_id'), nullable = False)
	name = db.Column(db.String)
	units = db.Column(db.Integer)
	grade = db.Column(db.String)
	status = db.Column(db.String)

	

	def __repr__(self):
		return f'<Prerequisites prerequisites_id={self.prerequisites_id} program_id={self.program_id} name={self.name} >'



def connect_to_db(flask_app, db_uri='postgresql:///schoolboards', echo=True):
	flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
	flask_app.config['SQLALCHEMY_ECHO'] = echo
	flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

	db.app = flask_app
	db.init_app(flask_app)

	print('Connected to the db!')


if __name__ == '__main__':

	from server import app

	connect_to_db(app)






