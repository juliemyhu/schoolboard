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
            <ProgramContainer user_id='1'/>
            <ProgramFormContainer/>
        </div>  
        )
    };
}


ReactDOM.render(<App/>, document.getElementById('app'));


