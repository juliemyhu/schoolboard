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
            if (typeof(response) === "number") {
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
  }

  handleSuccessfulAuth(data) {
    console.log("sucess", data);
    this.props.handleLogin(data);
    this.props.history.push("/dashboard"); 
  }

  render() {
    return (
    <div>
      <h1>Home</h1>
      <h1>Status: {this.props.loggedInStatus}</h1>
      <Login handleSuccessfulAuth={this.handleSuccessfulAuth}>
      </Login>
      <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}>
        
      </Registration>

    </div>
    );
  }
}

// const Homepage = props => {
//   constructor(props) {
//     super(props);
//   }
//   return (
//     <div>
//       <div>
//         <h1>Homepage</h1>
//         <h1>Status: {props.loggedInStatus}</h1>
//         <Login>
//         </Login>  
//         <Registration>    

//         </Registration>
//       </div>
//     </div>
//   )
// }

const Dashboard = props => {
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h1>Status: {props.loggedInStatus}</h1>
        <ProgramContainer user_id={props.user_id} ></ProgramContainer>
      </div>
    </div>
  )
}