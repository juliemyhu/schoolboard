// import GoogleMap from "./Map";

class Login extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: "",
        loginErrors: ""
      };
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit(event) {
        event.preventDefault();
        // alert("login button clicked");
        // console.log(this.state);
        fetch('/api/login', {
            method:"POST",
            body: JSON.stringify(this.state),
            headers: {'Content-type': 'application/json'}
        })
        .then(r => r.json())
        .then(response => {
            console.log("Res from login", response);
            alert(response.status)
            if (response.success) {
              this.props.handleSuccessfulAuth(response);
            }
    
        })
    }
  
  
    render() {
      return (
        <div className="col-4 offset-4" >
            <h3>Login</h3>
          <form onSubmit={this.handleSubmit}>
            <input
        
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
  
            <input
            
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
  
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }
  }

class Registration extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        registrationErrors: ""
      };
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit(event) {
        event.preventDefault();
        alert("register button clicked");
        console.log(this.state);
        fetch('/api/register', {
            method:"POST",
            body: JSON.stringify(this.state),
            headers: {'Content-type': 'application/json'}
        })
        .then(r => r.json())
        .then(response => {
          console.log("registration res", response)
          if (response.success) {
            this.props.handleSuccessfulAuth(response);
          }
          else {alert("Sorry, could not Register with this email")}
        })
        
    
    }
  
    render() {
      return (
        <div className="col-4 offset-4" >
            <h3>Register:</h3>
          <form onSubmit={this.handleSubmit}>
            <input
                type="first_name"
                name="first_name"
                placeholder="First Name"
                value={this.state.first_name}
                onChange={this.handleChange}
                required
                />
            <input
                type="last_name"
                name="last_name"
                placeholder="Last Name"
                value={this.state.last_name}
              onChange={this.handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
  
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
  
            <button type="submit">Register</button>
          </form>
        </div>
      );
    }
  }

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    console.log("success", data);
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  render() {
    return (
    <div> 
      {/* <h1>Home</h1> */}
      {/* <h1>Status: {this.props.loggedInStatus}</h1> */}

      <Login handleSuccessfulAuth={this.handleSuccessfulAuth}>
      </Login>
      <div></div>
      <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}>
      </Registration>

    </div>
    );
  }
}

  class Dashboard extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);

      this.state = {
        user_name: ''
      }

      this.handleLogoutClick = this.handleLogoutClick.bind(this);

      const stored_user_id = JSON.parse(localStorage.getItem("user_id"))
      if(stored_user_id != null) {
        this.state = {
          loggedInStatus: "LOGGED_IN",
          user_id: stored_user_id
        }
      } else {
        this.state = {
          loggedInStatus: this.props.loggedInStatus,
          user_id: this.props.user_id
        };
      }
    }

    handleLogoutClick() {
      localStorage.removeItem("user_id")
      this.props.handleLogout();
      this.props.history.push("/");
    }

    // componentDidMount() {
    //   const user_id = JSON.parse(localStorage.getItem("user_id"));
    //     if (user_id != null) {
    //         this.setState({ 
    //             loggedInStatus:"LOGGED_IN",
    //             user_id: user_id});
    //     }
    //     console.log("dashboard state:", this.state, "user_id", user_id)
    // }
    componentDidMount() {
      this._isMounted = true;
      fetch('/greetuser', {
        method:"POST",
        body: JSON.stringify(this.state),
        headers: {'Content-type': 'application/json'}
      } )
      .then(r => r.json())
        .then(response => {
           if (this._isMounted) {
             console.log("greet",response);
           this.setState({user_name:response.user_name.user_fname})
          }
        });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }


    render() {
      return (
      <div>
        <h1>{this.state.user_name}'s Dashboard</h1>
        <h1>Status: {this.state.loggedInStatus}</h1>
        <button className="btn btn-primary" onClick = {() => this.handleLogoutClick()}>Logout</button>
        <ProgramContainer 
          user_id={this.state.user_id} 
        ></ProgramContainer>

        <GoogleMap user_id={this.state.user_id}/>


      </div>
      );
    }
  }
