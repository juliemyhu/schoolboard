class PrerequisiteForm extends React.Component {
    render() {
        return (
            <div>
                <h1>Add Prerequisite</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>name:</label>
                        <input type="text"></input>
                    <label>Units:</label>
                        <input type="text"></input>
                    <label>Grade</label>
                        <input type="text"></input>
                    <label>Status:</label>
                        <input type="text"></input>
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