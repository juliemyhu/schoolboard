
// form that takes in new prerequsites
class PrerequisiteForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: '',
            units: '' ,
            grade:'',
            status: 'complete',
            program_id: this.props.program_id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
        handleInputChange(event) {
            this.setState({ 
                [event.target.name]: event.target.value
            });
            console.log(this.state);
        }
    
        handleSubmit(event) {
            event.preventDefault();
            alert('the prerequsite submit button was clicked');
            console.log(this.state);
            this.props.getNewPrereq(this.state);

            fetch('/add-prerequisite', {
                method:"POST",
                body: JSON.stringify(this.state),
                headers: {'Content-type': 'application/json'}
            })
        }
    
    render() {
        return (
            <div>
                <h3>Add Prerequisite</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>name:</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} ></input>
                    <label>Units:</label>
                        <input type="text" name="units" value={this.state.units} onChange={this.handleInputChange}></input>
                    <label>Grade</label>
                        <input type="text" name="grade" value={this.state.grade} onChange={this.handleInputChange}></input>
                    <label>Status:</label>
                            <select name="status" value={this.state.status} onChange={this.handleInputChange}>
                                <option value="complete">Complete</option>
                                <option value="in-progress">In Progress</option>
                                <option value="planned">Planned</option>
                            </select>
                    <input type="submit" value="Add"/>  
                </form>
            </div>
        )
    }
}

// a single prerequsite displaying its information 
class Prerequisite extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            prerequisite_id:this.props.prerequisite_id,
            name: this.props.name,
            units: this.props.units,
            grade: this.props.grade,
            status: this.props.status
        }
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                    <tr><td>Name:  {this.props.name}</td></tr>
                    <tr><td>units: {this.props.units}</td></tr>
                    <tr><td>Grade: {this.props.grade}, {this.state.c_state} </td></tr>
                    <tr><td>status: {this.props.status}</td></tr>
                    </tbody>
                </table>
            </div>)
    }
}

// container that holds all the prerequsites 
class PrerequisiteContainer extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            prereqs:[],
            program_id: this.props.program_id
        };
        this.getNewPrerequisite=this.getNewPrerequisite.bind(this);
    }

    
    componentDidMount() {
        // We need to know what program we're looking for
        fetch('/get-prerequisites', {
            method:"POST",
            body: JSON.stringify(this.state.program_id),
            headers: {'Content-type': 'application/json'}
        })
        .then(r => r.json())
        .then(response => {
            console.log("get-prereq response: ",response)
            this.setState({prereqs:response.prerequisites})
        })
            // It should fetch the existing list of prerequisites
            // For this program.
            // Also, let's pass the program ID to PrerequisiteContainer
            // console.log(response.json())
            // const data = response.json()
            // we would start setting states here.
             
        }

    getNewPrerequisite(new_prereq) {
        console.log("NEW PREREC", new_prereq)
        var current_prereqs=this.state.prereqs
        current_prereqs.push(new_prereq)
        this.setState({
            prereqs: current_prereqs
        })
    }
    

    render() {
        return (
            <div>
                {this.state.prereqs.map(prereq => (
                    <Prerequisite 
                        key={prereq.name}            
                        name = {prereq.name}
                        units = {prereq.units}
                        status = {prereq.status}
                        grade ={prereq.grade}
                    ></Prerequisite>
                ))}
                <PrerequisiteForm 
                    getNewPrereq = {this.getNewPrerequisite}
                    program_id= {this.state.program_id}>
                </PrerequisiteForm>
            </div>   
        )}
}