class PrerequisiteForm extends React.Component {
    constructor(props) {
        super(props); 
            this.state = {
                name: null,
                units: null ,
                grade:null,
                status: null
            };
        }
    
    render() {
        return (
            <div>
                <h3>Add Prerequisite</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>name:</label>
                        <input type="text" value={this.state.name}></input>
                    <label>Units:</label>
                        <input type="text" value={this.state.units}></input>
                    <label>Grade</label>
                        <input type="text" value={this.state.grade}></input>
                    <label>Status:</label>
                            <select value={this.state.value} onChange={this.handleChange}>
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