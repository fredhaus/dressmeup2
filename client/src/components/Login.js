import React from 'react';
import axios from 'axios'
import { withRouter } from "react-router-dom"


class Login extends React.Component {

  state = {
    username: '',
    password: '',
  }

  submitHandler = (event) => {
    event.preventDefault()
    axios.post('/api/auth/login', this.state).then((response) => {
      this.props.updateUser(response.data)
      this.props.history.push('/')
    }).catch(() => { })
  }

  

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        LOGIN:
        <form onSubmit={this.submitHandler}>
          <input name="username" onChange={this.changeHandler} value={this.state.username} type="text" placeholder="username"></input>
          <br></br>
          <input name="password" onChange={this.changeHandler} value={this.state.password} type="text" placeholder="password"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

}

export default withRouter(Login);
