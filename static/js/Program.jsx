

const MY_API_KEY ='free_d6e794d268065566fd05b280ee'


class ProgramForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id: '',
            programName: '',
            college: '',
            cohort: '',
            link: ''
    };

        this.handleChangeProgramName = this.handleChangeProgramName.bind(this);
        this.handleChangeCollege= this.handleChangeCollege.bind(this);
        this.handleChangeCohort= this.handleChangeCohort.bind(this);
        this.handleChangeLink= this.handleChangeLink.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeProgramName(event) {
        this.setState({programName: event.target.value});
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
                    id : college.collegeUnitId,
                    collegeName : college.name,
                    lat : college.locationLat,
                    long : college.locationLong,
                    state : college.stateAbbr,
                    city : college.city
                }
                console.log("formData", formData);
                console.log("jsonify", JSON.stringify(formData));
                fetch('/add-college', {
                    method:"POST",
                    body: JSON.stringify(formData),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then( () => {
                    this.setState({id:formData.id})
                    fetch('/add-program', {
                        method:"POST",
                        body: JSON.stringify(this.state),
                        headers: {'Content-type': 'application/json'}
                    }).then (console.log('add program fetch completed')) 
                    console.log('add college fetch completed');
                })
                    

            }
            else {alert("could not find college")}
        });
        
    }





    render() {
        return (
        <div>
            {this.props.children}
            <h3>Add School</h3>
        <form onSubmit={this.handleSubmit}>
            <label>Program:</label>
                <input type="text" value={this.state.programName} onChange={this.handleChangeProgramName}></input>
            <label>College:</label>
                <input type="text" value={this.state.college} onChange={this.handleChangeCollege}></input>
            <label>Cohort</label>
                <input type="text" value={this.state.cohort} onChange={this.handleChangeCohort}></input>
            <label>Link:</label>
                <input type="text" value={this.state.link} onChange={this.handleChangeLink}></input>
            <input type="submit" value="Add"/>  
	    </form>
        {/* <button onClick= {() => this.props.onDelete(this.props.form.id)}>Delete</button> */}
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
            
            ]
        };
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
                     >
                         {/* <h4>Program#{form.id}</h4> */}
                </ProgramForm>
             ))}
        </div>
        );
    }

    }

class ProgramContainer extends React.Component {
    // ProgramContainer receives a userId. Its going guestId. 
    constructor(props) {
        super(props);
        this.state = {
            programs:[
                // {Program1},
                // {Program2}
            ],
            user_id: this.props.user_id
        }
    }

    // Start off by finding all the programs this user has added.

    componentDidMount() {
        // Fetch the programs that this user has added.
        fetch("/api/get_user_programs", {
            method:"POST",
            body: JSON.stringify(this.state.user_id),
            headers: {"Content-type": "application/json"}
        }).then(res => {
            const response = res.json();
            // At this point we should a list of programs from server
            // Then we need to setState and update programs to have
            // the programs we received.
        })
    }



    render() {
        <div>
            Render programs here from this.state.programs
            map thing goes here 
            {this.state.programs.map(program => (
                <Program set the props here></Program>
            ))}
        </div>
    }
}
  
class Program extends React.Component {

    componentDidMount() {
        // We need to know what program we're looking for
        const program_id = this.props.program_id;
        fetch('/get-prerequisites', {
            method:"POST",
            body: JSON.stringify(program_id),
            headers: {'Content-type': 'applicatin/json'}
        })
        .then(response => {
            // It should fetch the existing list of prerequisites
            // For this program.
            // Also, let's pass the program ID to PrerequisiteContainer
            console.log(response.json())
            const data = response.json()
            // we would start setting states here. 
        });
    }

    render() {
        return (
            <div>
                <PrerequisiteContainer program_id={this.props.program_id}>

                </PrerequisiteContainer>
            </div>
        )
    }
}