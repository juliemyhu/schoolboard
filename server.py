from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "college"
app.jinja_env.undefined = StrictUndefined



@app.route('/')
def show_homepage():
    """Show the application's homepage."""

    return render_template('homepage.html')


@app.route('/allschools')
def show_allschools():
	"""Shows all schools"""
	print ("Hi")
	

# @app.route('/v1/api/college/info' methods="GET")
def get_college():


	return jsonify






if __name__ == '__main__':
	connect_to_db(app)
	app.run(host='0.0.0.0', debug=True)

	print('Hi'*100)