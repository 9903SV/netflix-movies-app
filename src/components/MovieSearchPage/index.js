import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import PaginationButton from '../PaginationButton'
import NoMatchSearch from '../NoMatchSearch'
import './index.css'

class MovieSearchPage extends Component {
  state = {searchMoviesList: [], isLoading: true, inputText: '', pageNumber: 1}

  componentDidMount() {
    this.getSearchMovies()
  }

  componentDidUpdate() {
    this.getSearchMovies()
  }

  getSearchMovies = async () => {
    const {pageNumber} = this.state
    const {match} = this.props
    const {params} = match
    const {input} = params

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US&page=${pageNumber}&query=${input}`,
    )
    const data = await response.json()

    this.setState({
      searchMoviesList: data.results,
      isLoading: false,
      inputText: input,
    })
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
    const {searchMoviesList, isLoading, inputText, pageNumber} = this.state
    const highlightHomeLink = false
    const highlightPopularLink = true

    if (searchMoviesList.length === 0 && !isLoading) {
      return <NoMatchSearch inputText={inputText} />
    }
    return (
      <div className="moviesearch-bg-container">
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
          <div className="moviesearch-movies-container">
            {searchMoviesList.map(eachResult => {
              if (eachResult.backdrop_path !== null) {
                return (
                  <Link to={`/movie/${eachResult.id}`} key={eachResult.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${eachResult.backdrop_path}`}
                      alt={eachResult.id}
                      className="movies-more-poster"
                    />
                  </Link>
                )
              }
              return null
            })}
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

export default MovieSearchPage
