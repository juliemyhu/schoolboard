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
        <div className="col-6">
          <h3>Login</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label htmlFor="loginEmail" className="col-sm-4 col-form-label">Email</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="loginEmail"
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
              </div>
              <div className="form-group row">
                <label htmlFor="loginPassword" className="col-sm-4 col-form-label">Password</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="loginPassword"
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
              </div>
                <button className="btn btn-light" type="submit">Login</button>
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
        <div className="col-6" >
          <h3>Register</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label htmlFor="registerfname" className="col-sm-4 col-form-label">First Name</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="registerfname"
                      type="first_name"
                      name="first_name"
                      placeholder="First Name"
                      value={this.state.first_name}
                      onChange={this.handleChange}
                      required
                      />
                  </div>
              </div>
              <div className="form-group row">
                <label htmlFor="registerlname" className="col-sm-4 col-form-label">Last Name</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="registerlname"
                      type="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      value={this.state.last_name}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
              </div>
              <div className="form-group row">
                <label htmlFor="registeremail" className="col-sm-4 col-form-label">Email</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="registeremail"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      aria-describedby="emailHelp"
                      required
                    />
                    <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
                  </div>
              </div>
              <div className="form-group row">
                <label htmlFor="registerpassword" className="col-sm-4 col-form-label">Password</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="registerpassword"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                       aria-describedby="passwordHelp"
                      required
                    />
                    <small id="passwordHelp" className="form-text">Make it unique and secure.</small>
                  </div>
              </div>
                <button className="btn btn-light" type="submit">Register</button>
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
    <div className="col-12"> 
      {/* <h1>Home</h1> */}
      {/* <h1>Status: {this.props.loggedInStatus}</h1> */}
      <div className="row login p-5">
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
      <div className="row registration p-5">
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
      
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
          this.setState({user_name:response.user_name.user_fname+" "+response.user_name.user_lname})
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    return (
    <div>
      <div className="row greeting p-4">
        <h2>{this.state.user_name}'s Dashboard</h2>
        {/* <h1>Status: {this.state.loggedInStatus}</h1> */}
        <button className="btn btn-light" onClick = {() => this.handleLogoutClick()}>Logout</button>
      </div>
      <ProgramContainer 
        user_id={this.state.user_id} 
      ></ProgramContainer>

      <GoogleMap user_id={this.state.user_id}/>


    </div>
    );
  }
}
