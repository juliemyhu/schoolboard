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

        It should only have programFormContainer and
        ProgramContainer.
        {/* <ProgramFormContainer/> */}
        <ProgramContainer user_id='1'/>
        {/* <Prerequisite name="hello"/>
        <PrerequisiteContainer/>
        <ProgramContainer user={this.state.user_id}>
        </ProgramContainer> */}
        </div>
        
            
            )
    };
}


ReactDOM.render(<App/>, document.getElementById('app'));


