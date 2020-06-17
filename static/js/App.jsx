"use strict";

const BrowserRouter = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const Switch = window.ReactRouterDOM.Switch;

class App extends React.Component {
    constructor() {
        super(); 
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user_id: {}
        };
    }

    render() {
        return (
        <div className="app"> 
            <BrowserRouter>
                <Switch>
                    <Route 
                    exact path={'/'} 
                    render= {props => (
                        <Homepage { ... props} loggedInStatus={this.state.loggedInStatus }></Homepage>
                    )}
                    ></Route>
                    <Route 
                    exact path={'/dashboard'}
                    render= {props => (
                        <Dashboard { ... props} loggedInStatus={this.state.loggedInStatus }></Dashboard>
                    )}
                    ></Route>
                </Switch>
            </BrowserRouter>
            {/* <Login></Login>
            <Registration></Registration>
            {this.state.user_id}'s Board
            <ProgramContainer user_id='1'/>
            <ProgramFormContainer/> */}

        </div>  
        )
    };
}


ReactDOM.render(<App/>, document.getElementById('app'));


