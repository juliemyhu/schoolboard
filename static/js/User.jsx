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
        alert("login button clicked");
        console.log(this.state);
        fetch('/api/login', {
            method:"POST",
            body: JSON.stringify(this.state),
            headers: {'Content-type': 'application/json'}
        })
        .then(r => r.json())
        .then(response => {
            console.log("Res from login", response);
            if (response.success) {
              this.props.handleSuccessfulAuth(response);
            }
    
        })
    }
  
  
    render() {
      return (
        <div>
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
        location: "",
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
          console.log("registration res", response.user)
          if (typeof(response.user) === "number") {
            this.props.handleSuccessfulAuth(response);
          }
        })
        
    
    }
  
    render() {
      return (
        <div>
            <h3>Register:</h3>
          <form onSubmit={this.handleSubmit}>
            <input
                type="first_name"
                name="first_name"
                placeholder="First Name"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                required
                />
            <input
                type="last_name"
                name="last_name"
                placeholder="last Name"
                value={this.state.password_confirmation}
              onChange={this.handleChange}
              required
            />
            <input
                type="location"
                name="location"
                placeholder="City, State"
                value={this.state.password_confirmation}
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
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    // console.log("success", data);
    this.props.handleLogin(data);
    this.props.history.push("/dashboard"); 
  }

  handleLogoutClick() {
    localStorage.removeItem("user_id")
    this.props.handleLogout();
  }

  // handleLogoutClick() {
  //   axios
  //     .delete("http://localhost:3001/logout", { withCredentials: true })
  //     .then(response => {
  //       this.props.handleLogout();
  //     })
  //     .catch(error => {
  //       console.log("logout error", error);
  //     });
  // }

  render() {
    return (
    <div>
      <h1>Home</h1>
      <h1>Status: {this.props.loggedInStatus}</h1>
      <button onClick = {() => this.handleLogoutClick()}>Logout</button>
      <Login handleSuccessfulAuth={this.handleSuccessfulAuth}>
      </Login>
      <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}>
        
      </Registration>

    </div>
    );
  }
}

  class Dashboard extends React.Component {
    constructor(props) {
      super(props);
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

    // componentDidMount() {
    //   const user_id = JSON.parse(localStorage.getItem("user_id"));
    //     if (user_id != null) {
    //         this.setState({ 
    //             loggedInStatus:"LOGGED_IN",
    //             user_id: user_id});
    //     }
    //     console.log("dashboard state:", this.state, "user_id", user_id)
    // }

    render() {
      return (
      <div>
        User_ID: {this.state.user_id}
        <h1>Dashboard</h1>
        <h1>Status: {this.state.loggedInStatus}</h1>
        <ProgramContainer user_id={this.state.user_id} ></ProgramContainer>
          {/* <ProgramFormContainer></ProgramFormContainer> */}

      </div>
      );
    }
  }

// const Dashboard = props => {
//   return (
//     <div>
//       <div>
//         <h1>Dashboard</h1>
//         <h1>Status: {props.loggedInStatus}</h1>
//         <ProgramContainer user_id={props.user_id} ></ProgramContainer>
//         <ProgramFormContainer user_id={props.user_id} ></ProgramFormContainer>
//       </div>
//     </div>
//   )
// }