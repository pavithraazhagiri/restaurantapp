import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onLogin = event => {
    event.preventDefault()
    this.makeApiCall()
  }

  makeApiCall = async () => {
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const responseData = await response.json()
      console.log(responseData)
      const jwtToken = responseData.jwt_token
      console.log(jwtToken)
      Cookies.set('jwt_token', jwtToken, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      console.log(response)
      const responseData = await response.json()
      console.log(responseData)
      this.setState({errorMsg: responseData.error_msg})
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg} = this.state
    return (
      <form onSubmit={this.onLogin}>
        <div>
          <label htmlFor="usernameId">USERNAME</label>
          <br />
          <input
            type="text"
            value={username}
            id="usernameId"
            onChange={this.onChangeUserName}
          />
        </div>
        <div>
          <label htmlFor="passwordId">PASSWORD</label>
          <br />
          <input
            type="password"
            id="passwordId"
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
        <p>{errorMsg}</p>
        <button type="submit">Login</button>
      </form>
    )
  }
}

export default Login
