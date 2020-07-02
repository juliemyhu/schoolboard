
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
                <button className="btn btn-outline-dark" type="button" data-toggle="collapse" data-target={"#collapseExample" + this.state.program_id} aria-expanded="false" aria-controls="collapseExample">
                     + 
                </button>
                <div className="collapse" id={"collapseExample" + this.state.program_id}>
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
                                        <option value="In-Progress">In-Progress</option>
                                        <option value="Planned">Planned</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-dark">Add</button> 
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
            
                    <tbody>
                        <tr>
                            <td>{this.props.name}</td>
                            <td>{this.props.grade}</td>
                            <td>{this.props.units}</td>
                            <td>{this.props.status}</td>
                            <td>
                                <button onClick= {() => this.props.onDelete(this.props.prerequisite_id)}  className="btn btn-outline-light">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>
                            </td>
                            
                        </tr>
                    </tbody>
            )
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
                {/* <h4 className="p-2">Prerequisites:</h4> */}
                <table>
                    <thead>
                        <tr>
                            <th>Prerequisite</th>
                            <th>Grade</th>
                            <th>Units</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
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
                </table>
                <PrerequisiteForm 
                    getNewPrereq = {this.getNewPrerequisite}
                    program_id= {this.state.program_id}>
                </PrerequisiteForm>
            </div>   
        )}
}