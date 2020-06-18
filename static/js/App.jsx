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

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(data) {
        this.setState({
            loggedInStatus:"LOGGED_IN",
            user_id: data
        })
        console.log(this.state.user_id)
    }

    // render() {
    //     return (
    //     <div>
    //         {this.state.user_id}'s Board
    //         <ProgramContainer user_id='1'/>
    //         <ProgramFormContainer/>

    //     </div>  
    //     )
    // };

    render() {
        return (
        <div className="app"> 
            <BrowserRouter>
                <Switch>
                    <Route 
                    exact path={'/'} 
                    render= {props => (
                        <Homepage { ... props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus }></Homepage>
                    )}
                    ></Route>
                    <Route 
                    exact path={'/dashboard'}
                    render= {props => (
                        <Dashboard { ... props} user_id={this.state.user_id} loggedInStatus={this.state.loggedInStatus }></Dashboard>
                    )}
                    ></Route>
                </Switch>
            </BrowserRouter>

        </div>  
        )
    };
}


ReactDOM.render(<App/>, document.getElementById('app'));


