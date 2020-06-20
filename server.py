from flask import (Flask, render_template, request, flash, session, jsonify, redirect)
from model import connect_to_db
from jinja2 import StrictUndefined
import crud

app = Flask(__name__)
app.secret_key = "c3so-l2o8-4bld-59o7-c1ra-le60-hoge"
app.jinja_env.undefined = StrictUndefined



@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('homepage.html')

@app.route('/dashboard')
def show_dashboard():
    """Show the application's homepage."""

    return render_template('homepage.html')



@app.route('/api/register', methods=["POST"])
def register_user():
	data = request.get_json()

	print("register",data)
	first_name = data["first_name"]
	last_name = data["last_name"]
	location = data["location"]
	email = data['email']
	password = data['password']

	try:
		user = crud.create_user(first_name, last_name, email, password, location)
		return jsonify({'success':True, 'user': user.user_id})
	except Exception as err:
		return jsonify({'success': False,
					'error':str(err)})


@app.route('/api/login', methods=["POST"])
def check_user_info():

	data = request.get_json()
	print("login data", data)
	email = data['email']
	password = data['password']

	user = crud.get_user_by_email(email)
	print(user)
	success = False 
	user_id = -1

	if not user:
		status = 'That email address is not associated with a user in our system'
	elif user.password == password:
		session['logged_in_user_id'] = user.user_id
		success = True
		status = 'logged in'
		user_id = user.user_id
	else:
		status = 'Incorrect password. Please try again. '
	return jsonify({'success': success, 'user_id':user_id, 'status':status})

@app.route('/add-college', methods=["POST"])
def add_college():
	"""creates new college"""
	print("add-college route called")
	print(request)
	print(request.get_json())
	data = request.get_json()
	
	college_id = data.get("college_id")
	college_name = data.get("collegeName")
	college_city = data.get("city")
	college_state = data.get("state")
	college_lat = data.get("lat")
	college_long = data.get("long")
	
	try:
		crud.create_college(college_id, college_name, college_city, college_state, college_long, college_lat)
		return jsonify({'success': True})
	except Exception as err:
		return jsonify({'success': False,
						'error': str(err)})


@app.route('/add-program', methods = ['POST'])
def add_program():
	"""Create new program."""
	print("add-program in server called")
	print("program info in add_program route:", request.get_json())
	data = request.get_json()

	print("program data: ", data)

	
	college_id = data.get('college_id')
	name = data.get('programName')
	cohort = data.get('cohort')
	link = data.get('link')
	user_id = data.get('user_id')

	try:
		crud.create_program(user_id, college_id, name, cohort, link)
		
		
		return jsonify({'success':True})
	except Exception as err:
		return jsonify({'success': False,
						'error':str(err)})

@app.route('/add-prerequisite', methods = ['POST'])
def add_prereqiuiste():
	"""adds prerequsite to program"""
	
	data = request.get_json()

	grade = data.get('grade')
	name = data.get('name')
	status = data.get('status')
	units= data.get('units')
	program_id = data.get('program_id')

	try:
		crud.create_prerequisite(program_id,name,units,grade,status)
		
		return jsonify({'success':True})
	except Exception as err:
		return jsonify({'success': False,
						'error':str(err)})

@app.route('/api/get_user_programs', methods= ["POST"])
def get_user_programs():
	"""gets all of a users programs"""

	programs = []

	data = request.get_json()
	print("data:", data)

	# user_programs is a list of user-program OBJECTS 
	try:
		user_programs= crud.get_user_programs(data)
		print ("the programs", user_programs)

		for program in user_programs:
			print("test program",program.program_id)

			program_by_ids = crud.get_program_by_id(program.program_id)

			print("test program id", program_by_ids)
			programs.append(program_by_ids)
			print("the program list", programs)
			
		return jsonify({'success':True, 'programs':programs })

	except Exception as err:
		return jsonify({'success': False,
						'error':str(err)})

@app.route('/get-prerequisites', methods= ["POST"])
def get_prerequisites():

	data = request.get_json()
	print("hello", data)

	try: 
		program_prerequisites= crud.get_prerequisites(data)
		print("HELLO I'm Empty", program_prerequisites)
		return jsonify({'success': True, 'prerequisites':program_prerequisites })
	
	except Exception as err:
		return jsonify({'success': False,
						'error':str(err)})

if __name__ == '__main__':
	connect_to_db(app)
	app.run(host='0.0.0.0', debug=True)

