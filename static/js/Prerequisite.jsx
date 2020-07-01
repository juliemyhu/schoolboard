
// form that takes in new prerequsites
class PrerequisiteForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: '',
            units: '' ,
            grade:'',
            status: 'choose',
            program_id: this.props.program_id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value
        });
        // console.log(this.state);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        // alert('the prerequsite submit button was clicked');
        // console.log(this.state);
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
                <button class="btn btn-outline-light" type="button" data-toggle="collapse" data-target={"#collapseExample" + this.state.program_id} aria-expanded="false" aria-controls="collapseExample">
                     + 
                </button>
                <div class="collapse" id={"collapseExample" + this.state.program_id}>
                    <div>
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-group row">
                            {/* <label for="prereqname" className="col-sm-4 col-form-label">Name:</label> */}
                                <div className="col-sm-8">
                                    <input 
                                    className="form-control" 
                                    id="prereqname"
                                    type="text" 
                                    name="name" 
                                    placeholder="Name" 
                                    value={this.state.name} 
                                    onChange={this.handleInputChange} 
                                    ></input>
                                </div>
                            </div>
                            <div className="form-group row">
                            {/* <label for="prerequnits" className="col-sm-4 col-form-label">Units:</label> */}
                                <div className="col-sm-8">
                                    <input 
                                    className="form-control" 
                                    id="prerequnits"
                                    type="text" 
                                    name="units" 
                                    placeholder="Units"
                                    value={this.state.units} 
                                    onChange={this.handleInputChange}></input>
                                </div>
                            </div>
                            <div className="form-group row">
                            {/* <label for="prereqgrade" className="col-sm-4 col-form-label">Grade</label> */}
                                <div className="col-sm-8">
                                    <input 
                                    className="form-control"
                                    id="prereqgrade"
                                    type="text" 
                                    name="grade" 
                                    placeholder="Grade" 
                                    value={this.state.grade} 
                                    onChange={this.handleInputChange}></input>
                                </div>
                            </div>
                            <div className="form-group row">
                            {/* <label for="prereqstatus" className="col-sm-4 col-form-label">Status:</label> */}
                                <div className="col-sm-8">
                                    <select className="form-control" id="prereqstatus" name="status" value={this.state.status} onChange={this.handleInputChange}>
                                        <option value="choose" disabled>Status</option>
                                        <option value="Complete">Complete</option>
                                        <option value="In-progress">In Progress</option>
                                        <option value="Planned">Planned</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-light">Add</button> 
                        </form>
                </div>
                </div>
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
                    <tr><td>Name: {this.props.name}</td></tr>
                    <tr><td>Units: {this.props.units}</td></tr>
                    <tr><td>Grade: {this.props.grade}</td></tr>
                    <tr><td>Status: {this.props.status}</td></tr>
                    </tbody>
                </table>
                <button onClick= {() => this.props.onDelete(this.props.prerequisite_id)}  className="btn btn-outline-light ml-4">Delete</button>
                {/* <button onClick= {() => this.props.onEdit(this.props.prerequisite_id)} className="btn btn-outline-primary">Edit</button> */}
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
        this.handleDelete=this.handleDelete.bind(this);
        this.getNewPrerequisite=this.getNewPrerequisite.bind(this);
    }

    
    componentDidMount() {
        fetch('/get-prerequisites', {
            method:"POST",
            body: JSON.stringify(this.state.program_id),
            headers: {'Content-type': 'application/json'}
        })
        .then(r => r.json())
        .then(response => {
            // console.log("get-prereq response: ",response)
            this.setState({prereqs:response.prerequisites})
        })    
        }

    getNewPrerequisite(new_prereq) {
        // console.log("NEW PREREC", new_prereq)
        var current_prereqs=this.state.prereqs
        current_prereqs.push(new_prereq)
        this.setState({
            prereqs: current_prereqs
        })
    }
    
    handleDelete = prereqId => {
        console.log("handledelete?", this.state.prereqs, "prereq_id", prereqId)
        const prereqs = this.state.prereqs.filter(p =>p.prerequisite_id !== prereqId);
        // console.log("after", prereqs );
        this.setState({prereqs: prereqs});
        fetch('/api/delete-prerequisite', {
            method:"POST",
            body: JSON.stringify(prereqId),
            headers: {'Content-type': 'application/json'}
        });
    }

    // handleEdit = prereqId => {
    //     alert("edit button clicked");
    //     console.log("edit?", this.state.prereqs, "prereq_id", prereqId);
    // }

    render() {
        return (
            <div>
                <h3>Prerequisites:</h3>
                {this.state.prereqs.map(prereq => (
                    <Prerequisite 
                        key={prereq.name}
                        prerequisite_id={prereq.prerequisite_id}            
                        name = {prereq.name}
                        units = {prereq.units}
                        status = {prereq.status}
                        grade ={prereq.grade}
                        onDelete={this.handleDelete}
                        // onEdit={this.handleEdit}
                    ></Prerequisite>
                ))}
                <PrerequisiteForm 
                    getNewPrereq = {this.getNewPrerequisite}
                    program_id= {this.state.program_id}>
                </PrerequisiteForm>
            </div>   
        )}
}