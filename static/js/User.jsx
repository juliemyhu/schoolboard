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
      const { email, password } = this.state;
      console.log("state of user", this.state)
  
      axios
        .post(
          "http://localhost:5000/sessions",
          {
            user: {
              email: email,
              password: password
            }
          },
          { withCredentials: true }
        )
        .then(response => {
          if (response.data.logged_in) {
            this.props.handleSuccessfulAuth(response.data);
          }
        })
        .catch(error => {
          console.log("login error", error);
        });
      event.preventDefault();
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
        alert("register button clicked")
    }
  
    // handleSubmit(event) {
    //   const { email, password, password_confirmation } = this.state;
  
    //   axios
    //     .post(
    //       "http://localhost:5000/registrations",
    //       {
    //         user: {
    //           email: email,
    //           password: password,
    //         }
    //       },
    //       { withCredentials: true }
    //     )
    //     .then(response => {
    //       if (response.data.status === "created") {
    //         this.props.handleSuccessfulAuth(response.data);
    //       }
    //     })
    //     .catch(error => {
    //       console.log("registration error", error);
    //     });
    //   event.preventDefault();
    // }
  
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