
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

            this.props.program_id
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


class Prerequisite extends React.Component { 
    render() {
        return (
        <div>
            {this.props.name}
            {this.props.units}
            {this.props.status}
            {this.props.grade}
        </div>)
    }
}

class PrerequisiteContainer extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            forms: [
                {id: 1}
            ],
            prereqs:[]
        };
}

    render() {
        return (
            <div>
            {this.state.forms.map(form => (
                <PrerequisiteForm key={form.id} />
            ))}
            {this.state.prereqs.map(prereq => (
                <Prerequisite 
                key={prereq.id}            
                name = {prereq.name}
                units = {prereq.units}
                status = {prereq.status}
                grade ={prereq.grade} />
            ))}
            </div>
            
        )
    }
}