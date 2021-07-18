import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import PaginationButton from '../PaginationButton'
import NoMatchSearch from '../NoMatchSearch'
import './index.css'

const MovieSearchPage = (props: {match: {params: {input: string}}}) => {
  const [state, setState] = useState({
    searchMoviesList: [],
    isLoading: true,
    inputText: '',
    pageNumber: 1,
  })

  const hideNavbarLinkElement = false
  const {searchMoviesList, isLoading, inputText, pageNumber} = state
  const highlightHomeLink = false
  const highlightPopularLink = true

  const getSearchMovies = async () => {
    const {match} = props
    const {params} = match
    const {input} = params

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US&page=${pageNumber}&query=${input}`,
    )
    const data = await response.json()

    setState(prevState => ({
      ...prevState,
      searchMoviesList: data.results,
      isLoading: false,
      inputText: input,
    }))
  }

  useEffect(() => {
    getSearchMovies()
    console.log('ok')
    /* eslint-disable-next-line */
  }, [inputText, pageNumber])

  const moveBackPage = () => {
    setState(prevState => {
      if (prevState.pageNumber === 1) {
        return {...prevState}
      }
      return {...prevState, pageNumber: prevState.pageNumber - 1}
    })
  }

  const moveForwardPage = () => {
    setState(prevState => {
      if (prevState.pageNumber === 20) {
        return {...prevState}
      }
      return {...prevState, pageNumber: prevState.pageNumber + 1}
    })
  }

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
          // style={{textAlign: 'center'}}
          type="TailSpin"
          color="red"
          height={50}
          width={50}
        />
      ) : (
        <div className="moviesearch-movies-container">
          {searchMoviesList.map(
            (eachResult: {id: string; backdrop_path: string}) => {
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
            },
          )}
          <PaginationButton
            moveBackPage={moveBackPage}
            moveForwardPage={moveForwardPage}
            pageNumber={pageNumber}
          />
        </div>
      )}
    </div>
  )
}

export default MovieSearchPage
