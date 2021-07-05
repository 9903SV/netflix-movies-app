import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class SignInPage extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    showUsernameErrorMsg: '',
    showPasswordErrorMsg: '',
  }

  usernameChanged = event => {
    this.setState({username: event.target.value})
  }

  passwordChanged = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = (jwtToken, username, password) => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    Cookies.set('movies_username', username, {expires: 30})
    Cookies.set('movies_password', password, {expires: 30})
    history.replace('/')
  }

  showErrorMsg = () => {
    this.setState({showErrorMsg: true})
  }

  usernameBlurred = event => {
    if (event.target.value === '') {
      this.setState({showUsernameErrorMsg: true})
    } else {
      this.setState({showUsernameErrorMsg: false})
    }
  }

  passwordBlurred = event => {
    if (event.target.value === '') {
      this.setState({showPasswordErrorMsg: true})
    } else {
      this.setState({showPasswordErrorMsg: false})
    }
  }

  getAccessToken = async () => {
    const API_KEY = '1b2d30ef98a7d05a52a075002d77b253'
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const body = await response.json()
    return body.request_token
  }

  signinClicked = async () => {
    const {username, password} = this.state
    const requestToken = await this.getAccessToken()

    const userDetails = {
      username,
      password,
      request_token: requestToken,
    }

    const API_KEY = '1b2d30ef98a7d05a52a075002d77b253'
    const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.loginSuccess(data.jwtToken, username, password)
    } else {
      this.showErrorMsg()
    }
  }

  render() {
    const {
      showErrorMsg,
      showUsernameErrorMsg,
      showPasswordErrorMsg,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="signin-bg-container">
        <img
          src="https://res.cloudinary.com/degjdup40/image/upload/v1624546015/Group_73991px_irgijd.png"
          alt="movies-logo"
          className="signin-movies-logo"
        />
        <div className="signin-main-container">
          <div className="signin-form-container">
            <h1 className="signin-form-heading">Sign In</h1>
            <form className="signin-form">
              <div className="signin-labelinput-container">
                <label className="signin-label" htmlFor="signin-username">
                  USERNAME
                </label>
                <input
                  onChange={this.usernameChanged}
                  className="signin-input"
                  type="text"
                  id="signin-username"
                  onBlur={this.usernameBlurred}
                />
                {showUsernameErrorMsg && (
                  <p className="signin-error-msg">*Required</p>
                )}
              </div>
              <div className="signin-labelinput-container">
                <label className="signin-label" htmlFor="signin-password">
                  PASSWORD
                </label>
                <input
                  onChange={this.passwordChanged}
                  className="signin-input"
                  type="password"
                  id="signin-password"
                  onBlur={this.passwordBlurred}
                />
                {showPasswordErrorMsg && (
                  <p className="signin-error-msg">*Required</p>
                )}
              </div>
              {showErrorMsg && (
                <p className="signin-error-msg">
                  Please enter a valid Email & Password
                </p>
              )}
              <div className="signin-button-container">
                <button
                  onClick={this.signinClicked}
                  className="signin-button"
                  type="button"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignInPage
