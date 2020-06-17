"use strict";

class App extends React.Component {
    constructor() {
        super(); 
        this.state = {
            user_id: "Julie's"
        };
    }

    render() {
        return (
        <div>
            <Login></Login>
            <Registration></Registration>
            {this.state.user_id}'s Board
            <ProgramContainer user_id='1'/>
            <ProgramFormContainer/>

        </div>  
        )
    };
}


ReactDOM.render(<App/>, document.getElementById('app'));


