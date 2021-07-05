import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import './index.css'

const AccountPage = props => {
  const hideNavbarLinkElement = false
  const {history} = props

  const accountLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/signin')
  }

  const username = Cookies.get('movies_username')
  const passwordLength = Cookies.get('movies_password').length

  let password = ''
  for (let count = 0; count < passwordLength; count += 1) {
    password = password.concat('*')
  }

  return (
    <div>
      <Navbar
        linkText="My List"
        hideLinkSearchProfile={hideNavbarLinkElement}
        backgroundColor="#000000"
      />
      <div className="account-bg-container">
        <div>
          <h1 className="account-heading">Account</h1>
          <hr className="account-horizontal-line" />
          <div className="account-details-container">
            <p className="account-text">Membership</p>
            <div>
              <p className="account-details">{username}</p>
              <p className="account-text">Password: {password}</p>
            </div>
          </div>
          <hr className="account-horizontal-line" />
          <div className="account-details-container">
            <p className="account-text">Plan Details</p>
            <p className="account-details">
              <span>Premium</span>
              <span className="account-resolution">Ultra HD</span>
            </p>
          </div>
          <hr className="account-horizontal-line" />
          <div className="account-button-container">
            <button
              onClick={accountLogout}
              className="account-button"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
