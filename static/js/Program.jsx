

const MY_API_KEY ='free_d6e794d268065566fd05b280ee'

// program form inside every programformcontainer
class ProgramForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            college_id: '',
            programName: '',
            college: '',
            cohort: 'Fall 2020',
            link: '',
            user_id: this.props.user_id
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    handleSubmit(event) {
        // alert('the program submit button was clicked');
        // console.log(this.state)
        // console.log('college:', this.state.college)
        event.preventDefault();
        // this.props.getNewProgram(this.state);

        const college = this.state.college
        const URL = 'https://api.collegeai.com/v1/api/college/info?api_key=' + MY_API_KEY + '&college_names=' + college + '&info_ids=city%2Clocation_lat%2Clocation_long%2Cstate_abbr'
        
        fetch(URL)
        .then(r => r.json())
        .then(response => { 
            // console.log(response);
            // console.log(response.colleges);
            
            if (response.success == true) {
                // console.log(response.colleges[0]);
                // console.log(response.colleges[0].name);
                const college = response.colleges[0];
                var formData = {
                    college_id : college.collegeUnitId,
                    collegeName : college.name,
                    lat : college.locationLat,
                    long : college.locationLong,
                    state : college.stateAbbr,
                    city : college.city
                }
                // console.log("formData", formData);
                // console.log("jsonify", JSON.stringify(formData));
                fetch('/add-college', {
                    method:"POST",
                    body: JSON.stringify(formData),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .then( () => {
                    this.setState({college_id: formData.college_id})
                    fetch('/add-program', {
                        method:"POST",
                        body: JSON.stringify(this.state),
                        headers: {'Content-type': 'application/json'}
                    })
                    .then ((res) => {
                        const response = res.json();
                        console.log("add-program response:", response)
                    });
                })
            }
            else {alert("could not find college")}
        });  
    }


    render() {
        return (
        <div>
            <h3>Add School</h3>
            <form onSubmit={this.handleSubmit}>
                <label>Program Type:</label>
                    <input type="text"  name="programName" value={this.state.programName} onChange={this.handleInputChange}></input>
                <label>College:</label>
                    <input type="text" name="college" value={this.state.college} onChange={this.handleInputChange} required ></input>
                <label>Cohort:</label>
                        <select name="cohort" value={this.state.cohort} onChange={this.handleInputChange} required>
                            <option value="Fall 2020">Fall 2020</option>
                            <option value="Winter 2020">Winter 2020</option>
                            <option value="Spring 2021">Spring 2021</option>
                            <option value="Summer 2021">Summer 2021</option>
                            <option value="Fall 2021">Fall 2021</option>
                        </select>
                <label>Link:</label>
                    <input type="text" name = "link" value={this.state.link} onChange={this.handleInputChange} required></input>
                <button type="submit" >Submit </button>  
            </form>
        {/* <button onClick= {() => this.props.onDelete(this.props.form.id)}>Delete</button> */}
        </div>
        );
    }
}


// just the container for programform
class ProgramFormContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forms: [
                {id: 1, value: 0},
            ],
            user_id: this.props.user_id
        };
        console.log("programFormContainer constructor: ", this.state)
    }

    // handleDelete = formId => {
    //     const forms = this.state.forms.filter(f => f.id !== formId);
    //     this.setState({ forms }); 
    // }; 

    render() {
        return ( 
        <div>
            {this.state.forms.map(form => (
                <ProgramForm 
                    key={form.id} 
                    onDelete={this.handleDelete} 
                    form={form}
                    user_id ={this.state.user_id}
                     >
                         {/* <h4>Program#{form.id}</h4> */}
                </ProgramForm>
             ))}
        </div>
        );
    }

    }



// ********** end ********************


// a single program displaying program information 
class Program extends React.Component {
    // We know that we are created with information
    // We know the Program_id
    // We know the college_id or we can fetch college_id 
    constructor(props) {
        super(props);
        this.state = {
            program_id:this.props.program_id,
            name : this.props.name,
            c_name : this.props.c_name,
            c_state : this.props.c_state,
            c_city : this.props.c_city,
            c_lat : this.props.c_lat,
            c_lon : this.props.c_lon,
            cohort : this.props.cohort,
            link : this.props.link

        }
        // console.log("program's p_id", this.state.program_id);
    }

    

    render() {
        return (
            <div>
                <div>
                    <table>
                        <tbody>
                        <tr><td>Program: {this.state.name}</td></tr>
                        <tr><td>College: {this.state.c_name}</td></tr>
                        <tr><td>Location: {this.state.c_city}, {this.state.c_state} </td></tr>
                        <tr><td>Cohort: {this.state.cohort}</td></tr>
                        <tr><td>Link : <a href={this.state.link}>program link</a></td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <PrerequisiteContainer 
                        program_id={this.state.program_id}>
                    </PrerequisiteContainer>
                </div>
            </div>
        )
    }
}

// container tha holds all of a users programs
class ProgramContainer extends React.Component {
    _isMounted = false;

    // ProgramContainer receives a userId. Its going guestId. 
    constructor(props) {
        super(props);
        this.state = {
            programs:[],
            user_id: this.props.user_id
        };
        console.log("ProgramContainer constructor: ", this.state)
        this.getNewProgram=this.getNewProgram.bind(this);

    }

   

    // Start off by finding all the programs this user has added.

    componentDidMount() {
        this._isMounted = true;
        // Fetch the programs that this user has added.
        console.log(this.state.user_id)
        fetch("/api/get_user_programs", {
            method:"POST",
            body: JSON.stringify(this.state.user_id),
            headers: {"Content-type": "application/json"}
        })
        .then(r => r.json())
        .then(response => {
            // console.log(response)
            if (this._isMounted) {
                this.setState({programs:response.programs})
            }
            
            // console.log(this.state)
        })
    
            // At this point we should a list of programs from server
            // Then we need to setState and update programs to have
            // this.setState(programs)
            // the programs we received.
            // res.json() = {[{program1}, {program2}, {program3}]}
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getNewProgram(new_program) {
        var current_programs = this.state.programs
        current_programs.push(new_program)
        this.setState({
            programs: current_programs
        })
    }


    render() {
        return (
        <div>
             {this.state.programs.map(program => (
                <Program 
                    key = {program.program_id}
                    program_id = {program.program_id}
                    name = {program.name}
                    college = {program.college_id}
                    cohort = {program.cohort}
                    link = {program.link}
                    c_name = {program.college_name}
                    c_city = {program.college_city}
                    c_state = {program.college_state}
                    c_lat = {program.college_lat}
                    c_lon = {program.college_lon}
                ></Program>
             ))}
                <ProgramFormContainer
                getNewProgram = {this.getNewProgram}
                user_id={this.state.user_id}
                ></ProgramFormContainer>
        </div>
        )}
}
