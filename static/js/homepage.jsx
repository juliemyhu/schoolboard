const MY_API_KEY ='free_d6e794d268065566fd05b280ee'

class ProgramForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            value: '',
            program: '',
            college: '',
            cohort: '',
            link: ''
    };

        this.handleChangeProgram = this.handleChangeProgram.bind(this);
        this.handleChangeCollege= this.handleChangeCollege.bind(this);
        this.handleChangeCohort= this.handleChangeCohort.bind(this);
        this.handleChangeLink= this.handleChangeLink.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeProgram(event) {
        this.setState({program: event.target.value});
    }
    handleChangeCollege(event) {
        this.setState({college: event.target.value});
    }
    handleChangeCohort(event) {
        this.setState({cohort: event.target.value});
    }
    handleChangeLink(event) {
        this.setState({link: event.target.value});
    }

    handleSubmit(event) {
        alert('the program submit button was clicked');
        console.log(this.state)
        console.log('college:', this.state.college)
        event.preventDefault();

        const college = this.state.college
        const URL = 'https://api.collegeai.com/v1/api/college/info?api_key=' + MY_API_KEY + '&college_names=' + college + '&info_ids=city%2Clocation_lat%2Clocation_long%2Cstate_abbr'
        
        fetch(URL)
        .then(r => r.json())
        .then(response => { 
            console.log(response);
            console.log(response.colleges);
            
            if (response.success == true) {
                console.log(response.colleges[0]);
                console.log(response.colleges[0].name);
                const college = response.colleges[0];
                var formData = {
                    id:college.collegeUnitId,
                    collegeName :college.name,
                    lat : college.locationLat,
                    long: college.locationLong,
                    state: college.stateAbbr,
                    city: college.city
                }
                console.log("formData", formData);
                console.log("jsonify", JSON.stringify(formData));
                fetch('/add-college', {
                    method:"POST",
                    body: JSON.stringify(formData),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(console.log('fetch completed'))

            }
            else {alert("could not find college")}
        });

    

    }





    render() {
        return (
        <div>
            {this.props.children}
        <form onSubmit={this.handleSubmit}>
            <label>Program:</label>
                <input type="text" value={this.state.program} onChange={this.handleChangeProgram}></input>
            <label>College:</label>
                <input type="text" value={this.state.college} onChange={this.handleChangeCollege}></input>
            <label>Cohort</label>
                <input type="text" value={this.state.cohort} onChange={this.handleChangeCohort}></input>
            <label>Link:</label>
                <input type="text" value={this.state.link} onChange={this.handleChangeLink}></input>
            <input type="submit" value="Submit"/>  
	    </form>
        <button onClick= {() => this.props.onDelete(this.props.form.id)}>Delete</button>
        </div>
        );
    }
}



class ProgramFormContainer extends React.Component {

    constructor(props) {
        super();
        this.state = {
            forms: [
                {id: 1, value: 0},
                {id: 2, value: 0},
                {id: 3, value: 0}
            ]
        };
        this.addProgram = this.addProgram.bind(this);
    }
 
    addProgram() {
        const program = this.state.listOfForms.concat(<ProgramForm />);
        this.setState({listOfForms : program});
    }

    handleDelete = formId => {
        const forms = this.state.forms.filter(f => f.id !== formId);
        this.setState({ forms }); 
    }; 

    render() {
        return ( 
        <div>
            {this.state.forms.map(form => (
                <ProgramForm 
                    key={form.id} 
                    onDelete={this.handleDelete} 
                    form={form}
                    ><h4>Program#{form.id}</h4>
                </ProgramForm>
             ))}
        </div>
        );
    }

    }
  
  
ReactDOM.render(<ProgramFormContainer />, document.getElementById('app'));


