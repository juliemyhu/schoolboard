class ProgramForm extends React.Component {
    render() {
        return (
        <form id="new-program">
		<div>
		<label>Program:</label>
			<input type="text" name="program"></input>
		</div>
		<div>
		<label>College:</label>
			<input type="text" name= "college"></input>
		</div>
		<div>
		<label>Cohort</label>
			<input type="text" name="cohort"></input>
		</div>
		<div>
		<label>Link:</label>
			<input type="text" name="link"></input>
		</div>
		<div>
		<button id="submit-program" type="button">Save</button>
		</div>
	</form>

        )
    }
}



class ProgramFormContainer extends React.Component {

    constructor(props) {
        super();
        this.state = {listOfForms: []};
        this.addProgram = this.addProgram.bind(this);
    }

    addProgram() {
        const program = this.state.listOfForms.concat(<ProgramForm/>);
        this.setState({listOfForms : program });
    }


    render(){
      return (
        <div>
            <p>Let's add some programs.</p>
            <button id="program" type="button" onClick={this.addProgram}>Add Program</button>

            {this.state.listOfForms.map(program => (
                <div>{program}</div>)
            )}
  
        </div>
  
      );
    }
  }
  
ReactDOM.render(<ProgramFormContainer />, document.getElementById('app'));


