import {useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react'
import Navbar from '../Navbar'
import PaginationButton from '../PaginationButton'
import MoviePopularStore from '../Store/moviePopularStore'
import MovieSearchStore from '../Store/movieSearchStore'
import './index.css'

const PopularPage = observer(() => {
  const {state} = MoviePopularStore

  const hideNavbarLinkElement = false
  const {popularMovies, apiStatus, pageNumber} = state
  const highlightHomeLink = false
  const highlightPopularLink = true
  MovieSearchStore.state.inputText = ''
  MovieSearchStore.state.pageNumber = 1
  MovieSearchStore.state.pageNumber = 1

  useEffect(() => {
    MoviePopularStore.getPopularMovies()
    /* eslint-disable-next-line */
  }, [pageNumber])

  const moveBackPage = () => {
    if (MoviePopularStore.state.pageNumber !== 1) {
      MoviePopularStore.state = {
        ...MoviePopularStore.state,
        pageNumber: MoviePopularStore.state.pageNumber - 1,
      }
    }
  }

  const moveForwardPage = () => {
    if (MoviePopularStore.state.pageNumber !== 20) {
      MoviePopularStore.state = {
        ...MoviePopularStore.state,
        pageNumber: MoviePopularStore.state.pageNumber + 1,
      }
    }
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
      {apiStatus !== 'SUCCESS' ? (
        <Loader
          // style={{textAlign: 'center'}}
          type="TailSpin"
          color="red"
          height={50}
          width={50}
        />
      ) : (
        <div className="popular-movies-container">
          {popularMovies.map(
            (eachResult: {id: string; poster_path: string}) => (
              <Link to={`/movie/${eachResult.id}`} key={eachResult.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${eachResult.poster_path}`}
                  alt={eachResult.id}
                  className="movies-more-poster"
                />
              </Link>
            ),
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
})

export default PopularPage
