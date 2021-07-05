import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import PaginationButton from '../PaginationButton'
import './index.css'

class PopularPage extends Component {
  state = {popularMovies: [], isLoading: true, pageNumber: 1}

  componentDidMount() {
    this.getPopularMovies()
  }

  componentDidUpdate() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const {pageNumber} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US&page=${pageNumber}`,
    )
    const data = await response.json()

    this.setState({popularMovies: data.results, isLoading: false})
  }

  moveBackPage = () => {
    this.setState(prevState => {
      if (prevState.pageNumber === 1) {
        return null
      }
      return {pageNumber: prevState.pageNumber - 1}
    })
  }

  moveForwardPage = () => {
    this.setState(prevState => {
      if (prevState.pageNumber === 20) {
        return null
      }
      return {pageNumber: prevState.pageNumber + 1}
    })
  }

  render() {
    const hideNavbarLinkElement = false
    const {popularMovies, isLoading, pageNumber} = this.state
    const highlightHomeLink = false
    const highlightPopularLink = true

    return (
      <div className="popular-bg-container">
        <Navbar
          linkText="Popular"
          hideLinkSearchProfile={hideNavbarLinkElement}
          backgroundColor="transparent"
          highlightHomeLink={highlightHomeLink}
          highlightPopularLink={highlightPopularLink}
        />
        {isLoading ? (
          <Loader
            style={{textAlign: 'center'}}
            type="TailSpin"
            color="red"
            height={50}
            width={50}
          />
        ) : (
          <div className="popular-movies-container">
            {popularMovies.map(eachResult => (
              <Link to={`/movie/${eachResult.id}`} key={eachResult.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${eachResult.poster_path}`}
                  alt={eachResult.id}
                  className="movies-more-poster"
                />
              </Link>
            ))}
            <PaginationButton
              moveBackPage={this.moveBackPage}
              moveForwardPage={this.moveForwardPage}
              pageNumber={pageNumber}
            />
          </div>
        )}
      </div>
    )
  }
}

export default PopularPage
