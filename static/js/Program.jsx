let MY_API_KEY = "";

fetch("/getApiKey")
    .then(r => r.json())
    .then(response => {
        MY_API_KEY = response.apiKey
    }) 

// program form inside every programformcontainer
class ProgramForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            college_id: '',
            programName: '',
            college: '',
            cohort: 'choose',
            link: '',
            user_id: this.props.user_id,
            label: 'choose',
            minimum_gpa: '',
            potential_colleges: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSetCollege = this.handleSetCollege.bind(this);
        this.handleCollegeInputChange = this.handleCollegeInputChange.bind(this);
    }
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        // console.log(this.state);
        // fetch("https://api.collegeai.com/v1/api/autocomplete/colleges?api_key=" + MY_API_KEY + "&query=" + this.state.college)
        // .then(r => r.json())
        // .then(response => {
        //     console.log(response);
        //     this.setState({potential_colleges: response.collegeList});
        // })
    }
    
    handleCollegeInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        // console.log(this.state);
        fetch("https://api.collegeai.com/v1/api/autocomplete/colleges?api_key=" + MY_API_KEY + "&query=" + this.state.college)
        .then(r => r.json())
        .then(response => {
            // console.log(response);
            this.setState({potential_colleges: response.collegeList});
        })
    }

    handleSetCollege(college_name) {
        this.setState({
            college: college_name,
            potential_colleges: []
        })
    }


    handleSubmit(event) {
        // alert('the program submit button was clicked');
        // console.log(this.state)
        // console.log('college:', this.state.college)
        event.preventDefault();
        // console.log(this.state)
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
                    .then (r => r.json())
                    .then ( response => {
                        // console.log("add-program response:", response)
                        this.props.getNewProgram();
                    });
                });
            }
            else {alert("could not find college")}
        }); 
    }

    render() {
        let potential_colleges = this.state.potential_colleges;
        let optionItems = potential_colleges.map((college) =>
        <CollegeDropdown key={college.name} onClick={this.handleSetCollege} collegeName ={college.name}>
        </CollegeDropdown>);
        return (
        <div className="">
            <h3>Add School</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                        <div className="col-sm-10">
                        {/* <label>College:</label> */}
                            <input 
                            className="form-control"
                            id="college"
                            placeholder="College"
                            type="text" 
                            name="college" 
                            value={this.state.college} 
                            onChange={this.handleCollegeInputChange} 
                            required 
                            ></input>
                                <div className="col-sm-10">
                                    {optionItems}
                                </div>
                        </div>
                    </div>
                <div className="form-group row">
                    {/* <label>Program Name:</label> */}
                    <div className="col-sm-10">
                        <input 
                        className="form-control"
                        id="programname"
                        type="text"  
                        name="programName" 
                        placeholder="Program Name"
                        value={this.state.programName} 
                        onChange={this.handleInputChange}></input>
                    </div>
                </div>
                <div className="form-group row"> 
                    <div className="col-sm-10">       
                    {/* <label>Cohort:</label> */}
                            <select className="form-control" id="cohort" name="cohort" value={this.state.cohort} onChange={this.handleInputChange} required>
                            <option value="choose" disabled>Cohort</option>
                                <option value="Fall 2020">Fall 2020</option>
                                <option value="Winter 2020">Winter 2020</option>
                                <option value="Spring 2021">Spring 2021</option>
                                <option value="Summer 2021">Summer 2021</option>
                                <option value="Fall 2021">Fall 2021</option>
                            </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                    {/* <label>Minimum gpa</label> */}
                        <input 
                        className="form-control"
                        id="minimumgpa"
                        placeholder="Minimum GPA"
                        type= "text" 
                        name="minimum_gpa" 
                        value = {this.state.minimum_gpa}
                        onChange={this.handleInputChange} 
                        required></input>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                    {/* <label>Label:</label> */}
                            <select className="form-control" id="label" name="label" value={this.state.label} onChange={this.handleInputChange} required>
                                <option value="choose" disabled>Label</option>
                                <option value="Reach">Reach</option>
                                <option value="Match">Match</option>
                                <option value="Safety">Safety</option>
                            </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                    {/* <label>Link:</label> */}
                        <input 
                        className="form-control"
                        id="link"
                        placeholder="Link"
                        type="text" 
                        name = "link" 
                        value={this.state.link} 
                        onChange={this.handleInputChange} 
                        required></input>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-light">Submit </button>  
            </form>
        {/* <button onClick= {() => this.props.onDelete(this.props.form.id)}>Delete</button> */}
        </div>
        );
    }
}

class CollegeDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeName: this.props.collegeName
        };
    }

    render() {
        return (
            <div>
                <p onClick={()=>{this.props.onClick(this.state.collegeName)}}>
                    {this.state.collegeName}
                </p>
            </div>
        )
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
        // console.log("programFormContainer constructor: ", this.state)
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
                    getNewProgram = {this.props.getNewProgram}
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
            minimum_gpa: this.props.minimum_gpa,
            label: this.props.label,
            link : this.props.link
            

        }
        // console.log("program's p_id", this.state.program_id);
    }


    render() {
        return (
            <div className="" >
                <div>
                    <table>
                        <tbody>
                        <tr><td>{this.state.c_name}</td></tr>
                        <tr><td>{this.state.c_city}, {this.state.c_state} </td></tr>
                        <tr><td>{this.state.name} Program</td></tr>
                        <tr><td>{this.state.cohort}</td></tr>
                        <tr><td>Minimum GPA: {this.state.minimum_gpa}</td></tr>
                        <tr><td>Label: {this.state.label}</td></tr>
                        <tr><td><a href={this.state.link}>Program Link</a></td></tr>
                        </tbody>
                    </table>
                    <button onClick={() => this.props.onDelete(this.props.program_id)} className="btn btn-outline-light ml-4">Delete</button>
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

    constructor(props) {
        super(props);
        this.state = {
            programs:[],
            user_id: this.props.user_id
        };
        // console.log("ProgramContainer constructor: ", this.state)
        this.getNewProgram=this.getNewProgram.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        // console.log(this.state.user_id)
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
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getNewProgram() {
        console.log(" getNewProgram called");
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
        });
    }

    handleDelete = programId => {
        console.log("program delete?", this.state.programs, "programid", programId)
        const program = this.state.programs.filter(p =>p.program_id !== programId);
        console.log("after", program)
        this.setState({programs: program});
        fetch('/api/delete-program', {
            method:"POST",
            body: JSON.stringify(programId),
            headers: {'Content-type': 'application/json'}
        });
    }

    render() {
        return (
        <div className="testimonial-group">
            <div className="row p-4">
             {this.state.programs.map(program => (
                 <div  key = {program.program_id} className="col-xs-6 p-2 border">
                    <Program 
                        // key = {program.program_id}
                        program_id = {program.program_id}
                        name = {program.name}
                        college = {program.college_id}
                        cohort = {program.cohort}
                        minimum_gpa = {program.minimum_gpa}
                        label = {program.label}
                        link = {program.link}
                        c_name = {program.college_name}
                        c_city = {program.college_city}
                        c_state = {program.college_state}
                        c_lat = {program.college_lat}
                        c_lon = {program.college_lon}
                        onDelete={this.handleDelete}
                    ></Program>
                </div>
             ))}
            
                <ProgramFormContainer
                    getNewProgram = {this.getNewProgram}
                    user_id={this.state.user_id}
                ></ProgramFormContainer>
            </div>
            
        </div>
        )
    }
}
