"use strict";

const BrowserRouter = window.ReactRouterDOM.BrowserRouter;
const UseHistory = window.ReactRouterDOM.UseHistory;
const Route = window.ReactRouterDOM.Route;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;


class App extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user_id: {}
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.checkLoginStatus = this.checkLoginStatus.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
    }

    checkLoginStatus() {
         
        try {
            var user = JSON.parse(localStorage.getItem("user_id"));
            // console.log("login status", user, typeof user)
            if (user != null) {
                // console.log("about to set")
                this.setState({ 
                    loggedInStatus:"LOGGED_IN",
                    user_id: user});
                    // console.log("finished setting", this.state.user_id);
            }
        } catch(err) {
            console.log(err)
        }
      }
    
    componentDidMount() {
        this.checkLoginStatus()
    }


    handleLogin(data) {
        console.log("data recieved", data, typeof(data.success))
        if(data.success) {
            this.setState({
                loggedInStatus:"LOGGED_IN",
                user_id: data.user_id
            })
            localStorage.setItem("user_id", data.user_id)
        }
        console.log(this.state.user_id)
    }

    handleLogout() {
        this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user_id: {}
        })
    }

    render() {
        return (
        <div className="app"> 
            <BrowserRouter>
                <Switch>
                    <Route 
                    exact path={'/'} 
                    render = {props => (
                        <Homepage { ... props} 
                        handleLogin={this.handleLogin} 
                        loggedInStatus={this.state.loggedInStatus}
                        ></Homepage>
                        
                    )}
                    ></Route>
                    <Route 
                    exact path={'/dashboard'}
                    render= {props => (
                        <Dashboard { ... props} 
                        user_id={this.state.user_id} 
                        handleLogout={this.handleLogout}
                        loggedInStatus={this.state.loggedInStatus }
                        >
                        </Dashboard>
                    )}
                    ></Route>
                </Switch>
            </BrowserRouter>

        </div>  
        )
    };
}

ReactDOM.render(<App/>, document.getElementById('app'));



