import {useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react'
import MovieSearchStore from '../Store/movieSearchStore'
import Navbar from '../Navbar'
import PaginationButton from '../PaginationButton'
import NoMatchSearch from '../NoMatchSearch'
import './index.css'

const MovieSearchPage = observer(
  (props: {match: {params: {input: string}}}) => {
    const hideNavbarLinkElement = false
    const {
      searchMoviesList,
      isLoading,
      inputText,
      pageNumber,
    } = MovieSearchStore.state
    const highlightHomeLink = false
    const highlightPopularLink = true

    const {match} = props
    const {params} = match
    const {input} = params

    useEffect(() => {
      MovieSearchStore.getSearchMovies(input)
      /* eslint-disable-next-line */
  }, [input, pageNumber])

    const moveBackPage = () => {
      if (MovieSearchStore.state.pageNumber !== 1) {
        MovieSearchStore.state = {
          ...MovieSearchStore.state,
          pageNumber: MovieSearchStore.state.pageNumber - 1,
        }
      }
    }

    const moveForwardPage = () => {
      if (MovieSearchStore.state.pageNumber !== 20) {
        MovieSearchStore.state = {
          ...MovieSearchStore.state,
          pageNumber: MovieSearchStore.state.pageNumber + 1,
        }
      }
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
  },
)

export default MovieSearchPage
