import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import PaginationButton from '../PaginationButton'
import './index.css'

const PopularPage = () => {
  const [state, setState] = useState({
    popularMovies: [],
    isLoading: true,
    pageNumber: 1,
  })

  const hideNavbarLinkElement = false
  const {popularMovies, isLoading, pageNumber} = state
  const highlightHomeLink = false
  const highlightPopularLink = true

  const getPopularMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US&page=${pageNumber}`,
    )
    const data = await response.json()

    setState(prevState => ({
      ...prevState,
      popularMovies: data.results,
      isLoading: false,
    }))
  }

  useEffect(() => {
    getPopularMovies()
    /* eslint-disable-next-line */
  }, [pageNumber])

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
            moveBackPage={moveBackPage}
            moveForwardPage={moveForwardPage}
            pageNumber={pageNumber}
          />
        </div>
      )}
    </div>
  )
}

export default PopularPage
