"use strict";

class App extends React.Component {
    constructor() {
        super(); 
        this.state = {
            user_id:1
        };
    }

    render() {
        return (<div>

        I should only have programFormContainer and
        ProgramContainer.
        {/* <ProgramFormContainer/> */}
        <ProgramContainer user_id='1'/>
        {/* <Prerequisite name="hello"/> */}
        <PrerequisiteContainer program_id='1'/>
        {/* <ProgramContainer user={this.state.user_id}>
        </ProgramContainer> */}
        </div>
        
            
            )
    };
}


ReactDOM.render(<App/>, document.getElementById('app'));


