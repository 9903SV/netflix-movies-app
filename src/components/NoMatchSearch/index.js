import Navbar from '../Navbar'
import './index.css'

const NoMatchSearch = props => {
  const {inputText} = props
  const hideNavbarLinkElement = false
  const highlightHomeLink = false
  const highlightPopularLink = true

  return (
    <div>
      <Navbar
        linkText="Popular"
        hideNavbarLinkElement={hideNavbarLinkElement}
        backgroundColor="#000000"
        highlightHomeLink={highlightHomeLink}
        highlightPopularLink={highlightPopularLink}
      />
      <div className="nomatch-container">
        <img
          src="https://res.cloudinary.com/dfheomufg/image/upload/v1625139326/Movies%20App/Group_7394_zavyom.png"
          alt="not found"
        />
        <h1>Your search for {inputText} did not find any matches.</h1>
      </div>
    </div>
  )
}

export default NoMatchSearch
