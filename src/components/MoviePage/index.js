import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'

class MoviePage extends Component {
  state = {movieData: {}, isLoading: true}

  componentDidMount() {
    this.getMovieData()
  }

  componentDidUpdate() {
    this.getMovieData()
  }

  timeInHrs = time => {
    const hrs = parseInt(time / 60, 10)
    const mins = time - hrs * 60
    return `${hrs}h ${mins}m`
  }

  getMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US`,
    )
    const data = await response.json()

    const moreResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US`,
    )
    const moreData = await moreResponse.json()

    const updatedData = {
      backdropPath: data.backdrop_path,
      originalTitle: data.original_title,
      runtime: this.timeInHrs(data.runtime),
      adult: data.adult,
      releaseYear: new Date(data.release_date).getFullYear(),
      overview: data.overview,
      genres: data.genres,
      spokenLanguages: data.spoken_languages,
      voteCount: data.vote_count,
      voteAverage: data.vote_average,
      budget: data.budget,
      releaseDate: data.release_date,
      moreMovies: moreData.results,
    }

    this.setState({movieData: updatedData, isLoading: false})
  }

  render() {
    const hideNavbarLinkElement = false
    const {movieData, isLoading} = this.state

    const backgroundStyle = {
      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieData.backdropPath})`,
      minHeight: '100vh',
      padding: '16px',
      backgroundSize: 'cover',
    }

    return (
      <div>
        <div style={backgroundStyle}>
          <Navbar
            linkText="Popular"
            hideLinkSearchProfile={hideNavbarLinkElement}
            backgroundColor="transparent"
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
            <div className="movie-content-container">
              <h1 className="movie-heading">{movieData.originalTitle}</h1>
              <span>{movieData.runtime}</span>
              <span className="movie-adult-rating">
                {movieData.adult ? 'A' : 'UA'}
              </span>
              <span>{movieData.releaseYear}</span>
              <p className="movie-description">{movieData.overview}</p>
              <button className="movie-button" type="button">
                Play
              </button>
            </div>
          )}
        </div>
        {isLoading ? (
          <Loader type="TailSpin" color="red" height={50} width={50} />
        ) : (
          <div className="movie-bottom-container">
            <div className="movie-details-container">
              <div>
                <p className="movie-detail-heading">Genres</p>
                {!isLoading &&
                  movieData.genres !== undefined &&
                  movieData.genres.map(eachGenre => (
                    <p key={eachGenre.id}>{eachGenre.name}</p>
                  ))}
              </div>
              <div>
                <p className="movie-detail-heading">Audio Available</p>
                {!isLoading &&
                  movieData.spokenLanguages !== undefined &&
                  movieData.spokenLanguages.map(eachAudio => (
                    <p key={eachAudio.id}>{eachAudio.name}</p>
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
            <div>
              <h1 className="movies-more-heading">More like this</h1>
              <div>
                {!isLoading &&
                  movieData.moreMovies !== undefined &&
                  movieData.moreMovies.map(eachResult => (
                    <Link to={`/movie/${eachResult.id}`} key={eachResult.id}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${eachResult.poster_path}`}
                        alt={eachResult.id}
                        className="movies-more-poster"
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MoviePage
