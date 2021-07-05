import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

const NotFound = () => {
  const hideNavbarLinkElement = true
  return (
    <div>
      <Navbar
        linkText=""
        hideLinkSearchProfile={hideNavbarLinkElement}
        backgroundColor="#000000"
      />
      <div className="notfound-bg-container">
        <h1 className="notfound-heading">Lost Your Way?</h1>
        <p className="notfound-description">
          Sorry, we cannot find that page. You will find lots to explore on the
          home page
        </p>
        <Link to="/">
          <button className="notfound-button" type="button">
            Netflix Home
          </button>
        </Link>
        <p>
          <span className="notfound-errortext">Error code </span>
          <span className="notfound-errorcode">NSES- 404</span>
        </p>
      </div>
    </div>
  )
}

export default NotFound
