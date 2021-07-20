import {useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react'
import MovieStore from '../Store/movieStore'
import Navbar from '../Navbar'
import './index.css'

export interface movieDataType {
  backdropPath?: string; /* eslint-disable-line */
  originalTitle?: string; /* eslint-disable-line */
  runtime?: string; /* eslint-disable-line */
  adult?: boolean; /* eslint-disable-line */
  releaseYear?: number; /* eslint-disable-line */
  overview?: string; /* eslint-disable-line */
  genres?: {id: number; name: string}[]; /* eslint-disable-line */
  spokenLanguages?: {english_name: string; iso_639_1: string; name: string}[]; /* eslint-disable-line */
  voteCount?: number; /* eslint-disable-line */
  voteAverage?: number; /* eslint-disable-line */
  budget?: number; /* eslint-disable-line */
  releaseDate?: string; /* eslint-disable-line */
  moreMovies?: any /* eslint-disable-line */
}

const MoviePage = observer((props: {match: {params: {id: number}}}) => {
  const {match} = props
  const {params} = match
  const {id} = params

  useEffect(() => {
    MovieStore.getMovieData(id)
    /* eslint-disable-next-line */
  }, [id])

  const renderMovieContentContainer = (movieData: movieDataType) => (
    <div className="movie-content-container">
      <h1 className="movie-heading">{movieData.originalTitle}</h1>
      <span>{movieData.runtime}</span>
      <span className="movie-adult-rating">{movieData.adult ? 'A' : 'UA'}</span>
      <span>{movieData.releaseYear}</span>
      <p className="movie-description">{movieData.overview}</p>
      <button className="movie-button" type="button">
        Play
      </button>
    </div>
  )

  const renderMovieDetailsContainer = (
    movieData: movieDataType,
    apiStatus: string,
  ) => (
    <div className="movie-details-container">
      <div>
        <p className="movie-detail-heading">Genres</p>
        {apiStatus === 'SUCCESS' &&
          movieData.genres !== undefined &&
          movieData.genres.map(eachGenre => (
            <p key={eachGenre.id}>{eachGenre.name}</p>
          ))}
      </div>
      <div>
        <p className="movie-detail-heading">Audio Available</p>
        {apiStatus === 'SUCCESS' &&
          movieData.spokenLanguages !== undefined &&
          movieData.spokenLanguages.map(eachAudio => (
            <p key={eachAudio.name}>{eachAudio.name}</p>
          ))}
      </div>
      <div>
        <p className="movie-detail-heading">Rating Count</p>
        <p>{movieData.voteCount}</p>
        <p className="movie-detail-heading">Rating Average</p>
        <p>{movieData.voteAverage}</p>
      </div>
      <div>
        <p className="movie-detail-heading">Budget</p>
        <p>{movieData.budget}</p>
        <p className="movie-detail-heading">Release Date</p>
        <p>{movieData.releaseDate}</p>
      </div>
    </div>
  )

  const renderMoreMoviesContainer = (
    movieData: movieDataType,
    apiStatus: string,
  ) => (
    <div>
      <h1 className="movies-more-heading">More like this</h1>
      <div>
        {apiStatus === 'SUCCESS' &&
          movieData.moreMovies !== undefined &&
          movieData.moreMovies.map(
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
      </div>
    </div>
  )

  const renderMovieBottomContainer = (
    movieData: movieDataType,
    apiStatus: string,
  ) => (
    <div className="movie-bottom-container">
      {renderMovieDetailsContainer(movieData, apiStatus)}
      {renderMoreMoviesContainer(movieData, apiStatus)}
    </div>
  )

  const hideNavbarLinkElement = false
  const movieData: movieDataType = MovieStore.state.movieData /* eslint-disable-line */
  const apiStatus: string = MovieStore.state.apiStatus /* eslint-disable-line */

  return (
    <div>
      <div
        style={{
          backgroundImage: `${
            apiStatus !== 'SUCCESS'
              ? ''
              : `url(https://image.tmdb.org/t/p/original/${movieData.backdropPath}`
          }`,
          minHeight: '100vh',
          padding: '16px',
          backgroundSize: 'cover',
        }}
      >
        <Navbar
          linkText="Popular"
          hideLinkSearchProfile={hideNavbarLinkElement}
          backgroundColor="transparent"
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
          renderMovieContentContainer(movieData)
        )}
      </div>
      {apiStatus !== 'SUCCESS' ? (
        <Loader type="TailSpin" color="red" height={50} width={50} />
      ) : (
        renderMovieBottomContainer(movieData, apiStatus)
      )}
    </div>
  )
})

export default MoviePage
