"use strict";

const BrowserRouter = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const Switch = window.ReactRouterDOM.Switch;

class App extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user_id: {}
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.checkLoginStatus = this.checkLoginStatus.bind(this);
    }

    checkLoginStatus() {
        var user = JSON.parse(localStorage.getItem("user_id"));
        console.log("login status", user, typeof user)
        if (user != null) {
            console.log("about to set")
            this.setState({ 
                loggedInStatus:"LOGGED_IN",
                user_id: user});
                console.log("finished setting", this.state.user_id);
        }
        console.log("??", this.state)
        //   fetch("/api/login", { 
        //       method:"POST",
        //       body: JSON.stringify(this.state),
        //       headers: {'Content-type':'application/json'},
        //       withCredentials: true })
        //   .then(r => r.json())
        //   .then(response => {
        //       console.log("logged in?", response);
            // if (
            //   response.data.logged_in &&
            //   this.state.loggedInStatus === "NOT_LOGGED_IN"
            // ) {
            //   this.setState({
            //     loggedInStatus: "LOGGED_IN",
            //     user_id: response.data.user_id
            //   });
            // } else if (
            //   !response.data.logged_in &
            //   (this.state.loggedInStatus === "LOGGED_IN")
            // ) {
            //   this.setState({
            //     loggedInStatus: "NOT_LOGGED_IN",
            //     user_id: {}
            //   });
            // }
        //   })
        //   .catch(error => {
        //     console.log("check login error", error);
        //   });
      }
    
    componentDidMount() {
        this.checkLoginStatus()
    }

    handleLogin(data) {
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
        user: {}
        });
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
                        <Homepage { ... props} 
                        handleLogin={this.handleLogin} 
                        handleLogout={this.handleLogout}
                        loggedInStatus={this.state.loggedInStatus}
                        ></Homepage>
                        
                    )}
                    ></Route>
                    <Route 
                    exact path={'/dashboard'}
                    render= {props => (
                        <Dashboard { ... props} 
                        user_id={this.state.user_id} 
                        loggedInStatus={this.state.loggedInStatus }>
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


