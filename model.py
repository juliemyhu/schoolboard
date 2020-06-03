"""Models for school board app."""
from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()




class User(db.Model):
	"""A User."""

	__tablename__ = 'users'

	user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	email = db.Column(db.String, unique=True)
	password = db.Column(db.String)
	location = db.Column(db.String)

	usercolleges = db.relationship("UserColleges")

	def __repr__(self):
		return f'<User user_id={self.user_id} email={self.email}>'



class College(db.Model):
	"""A College."""

	__tablename__ = 'colleges'

	college_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	name = db.Column(db.String)
	location = db.Column (db.String)
	program = db.Column(db.String)

	usercolleges = db.relationship("UserColleges")


	def __repr__(self):
		return f'<College college_id={self.college_id} college_id={self.college_id}>'

class UserCollege(db.Model):
	"""College of a specific user"""

	__tablename__ = 'user_colleges'

	user_colleges_id= db.Column(db.Integer, autoincrement= True, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
	college_id = db.Column(db.Integer, db.ForeignKey('colleges.college_id'), nullable=False)


	colleges = db.relationship("College")
	users = db.relationship("User")

	def __repr__(self):
		return f'<UserColleges user_id={self.user_id} college_id={self.college_id}>'

class Program(db.Model):
	"""A program."""

	__tablename__= 'programs'

	program_id = db.Column(db.Integer,primary_key=True)
	college_id = db.Column(db.Integer, db.ForeignKey('colleges.college_id'), nullable=False)
	cohort=  db.Column(db.String)
	link=db.Column(db.String)
	label=db.column(db.String)

	def __repr__(self):
		return f'<Program program_id={self.program_id} college_id={self.college_id}>'

class Requirement(db.Model):
	"""A requirement."""

	__tablename='requirements'

	requirement_type = db.Column(db.String, primary_key = True)


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


	def __repr__(self):
		return f'<ProgramRequirement program_requirements_id={self.program_requirements_id} >'

class Prerequsites(db.Model):
	"""A prerequsite course of a program. """

	__tablename__= 'prerequsites'

	prerequsites_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
	program_id = db.Column(db.Integer, db.ForeignKey('programs.program_id'), nullable = False)
	name = db.Column(db.String)
	units = db.Column(db.Integer)
	grade = db.Column(db.String)
	status = db.Column(db.String)

	def __repr__(self):
		return f'<Prerequsites prerequsites_id={self.prerequsites_id} program_id={self.program_id} name={self.name} >'






def connect_to_db(flask_app, db_uri='postgresql:///schoolboards', echo=True):
	flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
	flask_app.config['SQLALCHEMY_ECHO'] = echo
	flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

	db.app = flask_app
	db.init_app(flask_app)

	print('Connected to the db!')


if __name__ == '__main__':
	import os 
	from server import app

	os.system('dropdb schoolboards')
	os.system('createdb schoolboards')

	# college to database
	connect_to_db(app)
	db.create_all()



	# Julie = User(email = "julie@test.com", password= "test", location= "San Francisco")
	# UCI = College (name ="UCI", location="Irvine,CA", program="nursing")

	# db.session.add(Julie)
	# db.session.add(UCI)
	# db.session.commit()




