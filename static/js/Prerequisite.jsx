class PrerequisiteForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            name: '',
            units: '' ,
            grade:'',
            status: 'complete'
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




class PrerequisiteContainer extends React.Component {
    
    // constructer(props) {
    //     super():
    //     this.state = {
    //         forms: [
    //             {id: 1}
    //         ]
    //     }
    // }
    
    
    
    render() {
        return (
        <div>
            <PrerequisiteForm>
            </PrerequisiteForm>
        </div>)
    }
}