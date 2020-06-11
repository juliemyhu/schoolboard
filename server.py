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


# @app.route('/mycolleges')
# def show_mycolleges():
# 	"""Shows all of a users schools"""
# 	colleges = crud.get_myprograms()
# 	print(colleges)

# 	return render_template('my_colleges.html', colleges=colleges)
	

@app.route('/add-college', methods=["POST"])
def add_college():
	"""creates new college"""
	print("add-college route called")
	print(request)
	print(request.get_json())
	data = request.get_json()
	
	college_id = data.get("id")
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

	
	college = data.get('id')
	name = data.get('programName')
	cohort = data.get('cohort')
	link= data.get('link')

	try:
		crud.create_program(college, name, cohort, link)
		
		
		return jsonify({'success':True})
	except Exception as err:
		return jsonify({'success': False,
						'error':str(err)})

@app.route('/add-program', methods = ['POST'])
def add_requirement():
	pass

if __name__ == '__main__':
	connect_to_db(app)
	app.run(host='0.0.0.0', debug=True)

