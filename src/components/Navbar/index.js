import {useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Navbar = props => {
  const [state, setState] = useState({input: ''})

  const inputChanged = event => {
    setState({input: event.target.value})
  }

  const {
    backgroundColor,
    hideLinkSearchProfile,
    linkText,
    highlightHomeLink,
    highlightPopularLink,
  } = props
  const {input} = state

  return (
    <div style={{background: backgroundColor}} className="navbar-bg-container">
      <div className="navbar-logo-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/degjdup40/image/upload/v1624546015/Group_73991px_irgijd.png"
            alt="movies logo"
            className="navbar-logo"
          />
        </Link>
        <div style={{display: hideLinkSearchProfile ? 'none' : ''}}>
          <Link
            to="/"
            className={`navbar-link ${
              highlightHomeLink ? 'navbar-highlight-link' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to={`/${linkText.toLowerCase()}`}
            className={`navbar-link ${
              highlightPopularLink ? 'navbar-highlight-link' : ''
            }`}
          >
            {linkText}
          </Link>
        </div>
      </div>
      <div
        style={{display: hideLinkSearchProfile ? 'none' : ''}}
        className="navbar-profile-container"
      >
        <div className="navbar-search-container">
          <input
            onChange={inputChanged}
            className="navbar-input"
            type="search"
            value={input}
          />
          <Link to={`/search/${input}`}>
            <BsSearch className="navbar-search-icon" />
          </Link>
        </div>
        <Link to="/account">
          <img
            src="https://res.cloudinary.com/degjdup40/image/upload/v1624546765/Avatar_1_e4m0j7.png"
            alt="profile-avatar"
            className="navbar-profile-avatar"
          />
        </Link>
      </div>
    </div>
  )
}

export default withRouter(Navbar)
