"use strict";

class App extends React.Component {
    constructor() {
        super(); 
        this.state = {
            user_id:1
        };
    }

    render() {
        return (
        <div>
        <ProgramFormContainer/>
        <ProgramContainer user_id='1'/>
        </div>
        
            
            )
    };
}


ReactDOM.render(<App/>, document.getElementById('app'));


