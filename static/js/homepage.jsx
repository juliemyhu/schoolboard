const MY_API_KEY ='free_d6e794d268065566fd05b280ee'



class ProgramForm extends React.Component {
    constructor() {
        super();
        this.state={value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('the program submit button was clicked');
        event.preventDefault();
        
    //     const data = new FormData(event.target);
    //     console.log(data);
    //     fetch("https://api.collegeai.com/v1/api/college/info?api_key=free_d6e794d268065566fd05b280ee&college_names=${college}&info_ids=city%2Clocation_lat%2Clocation_long%2C")
    //     .then(r => r.json())
    //     .then(response => {
    //         console.log(response)
    //     })

    //     fetch('/add-program', {
    //         method: 'POST',
    //         body: data,
    //     });
    }



    render() {
        return (
        <form onSubmit={this.handleSubmit}>
        
            <label>Program:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange}></input>
            <label>College:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange}></input>
            <label>Cohort</label>
                <input type="text" value={this.state.value} onChange={this.handleChange}></input>
            <label>Link:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange}></input>
            <input type="submit" value="Submit"/>  
            <button onClick= { () => this.props.onDelete(this.props.program.id)}>Delete</button>
	    </form>
        
        );
    }
}



class ProgramFormContainer extends React.Component {

    constructor(props) {
        super();
        this.state = {
            forms: [
                {id: 1, value: 0},
                {id: 2, value: 0},
                {id: 3, value: 0}
            ]
        };
        this.addProgram = this.addProgram.bind(this);
    }
 
    addProgram() {
        const program = this.state.listOfForms.concat(<ProgramForm />);
        this.setState({listOfForms : program});
    }
    // render(){
    //   return (
    //     <div>
    //         <p>Let's add some programs.</p>
    //         <button id="program" type="button" onClick={this.addProgram}>Add Program</button>

    //         {this.state.listOfForms.map(item => ( 
    //             <div key={item}>{item}</div>)
    //         )}
            
  
    //     </div>
    render() {
        return (
        <div>
            {this.state.forms.map(form => <ProgramForm key={form.id} />)}
        </div>
        );
    }

    }
  
  
ReactDOM.render(<ProgramFormContainer />, document.getElementById('app'));


