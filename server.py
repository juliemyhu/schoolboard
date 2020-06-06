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


@app.route('/mycolleges')
def show_mycolleges():
	"""Shows all schools"""
	colleges = crud.get_mycolleges()
	print(colleges)

	return render_template('my_colleges.html', colleges=colleges)
	

@app.route('/add-college', methods=["POST"])
def add_college():
	print("add-college route called")
	print(request.form)
	college_name = request.form.get("collegeName")
	college_city = request.form.get("city")
	college_state = request.form.get("state")
	college_lat = request.form.get("lat")
	college_long = request.form.get("long")
	

	crud.create_college(college_name, college_city, college_state, college_lat, college_long)
	return redirect('/mycolleges')






if __name__ == '__main__':
	connect_to_db(app)
	app.run(host='0.0.0.0', debug=True)

	print('Hi'*100)