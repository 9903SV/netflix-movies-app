import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import InputComponent from '../InputComponent'
import './index.css'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SignInPage = (props: {history: any}) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    showErrorMsg: false,
    showUsernameErrorMsg: false,
    showPasswordErrorMsg: false,
  })

  const usernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({...prevState, username: event.target.value}))
  }

  const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({...prevState, password: event.target.value}))
  }

  const loginSuccess = (
    jwtToken: string,
    username: string,
    password: string,
  ) => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    Cookies.set('movies_username', username, {expires: 30})
    Cookies.set('movies_password', password, {expires: 30})
    history.replace('/')
  }

  const showErrorMsgFunction = () => {
    setState(prevState => ({...prevState, showErrorMsg: true}))
  }

  const usernameBlurred = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setState(prevState => ({...prevState, showUsernameErrorMsg: true}))
    } else {
      setState(prevState => ({...prevState, showUsernameErrorMsg: false}))
    }
  }

  const passwordBlurred = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setState(prevState => ({...prevState, showPasswordErrorMsg: true}))
    } else {
      setState(prevState => ({...prevState, showPasswordErrorMsg: false}))
    }
  }

  const getAccessToken = async () => {
    const API_KEY = '1b2d30ef98a7d05a52a075002d77b253'
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const body = await response.json()
    return body.request_token
  }

  const formSubmitted = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const {username, password} = state
    const requestToken = await getAccessToken()

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
      loginSuccess(data.jwtToken, username, password)
    } else {
      showErrorMsgFunction()
    }
  }

  const {showUsernameErrorMsg, showPasswordErrorMsg, showErrorMsg} = state
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
        <div className="signin-form-container" onSubmit={formSubmitted}>
          <h1 className="signin-form-heading">Sign In</h1>
          <form className="signin-form">
            <InputComponent
              labelText="USERNAME"
              showErrorMsg={showUsernameErrorMsg}
              inputChanged={usernameChanged}
              inputBlurred={usernameBlurred}
              inputType="text"
            />
            <InputComponent
              labelText="PASSWORD"
              showErrorMsg={showPasswordErrorMsg}
              inputChanged={passwordChanged}
              inputBlurred={passwordBlurred}
              inputType="password"
            />
            {showErrorMsg && (
              <p className="signin-error-msg">
                Please enter a valid Email & Password
              </p>
            )}
            <div className="signin-button-container">
              <button className="signin-button" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
