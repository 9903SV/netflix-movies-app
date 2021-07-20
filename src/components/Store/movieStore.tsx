import {makeObservable, observable, action} from 'mobx'
import {apiStatusConstants} from './moviePopularStore'

interface movieDataType {
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

class MovieStore {
  @observable state = {movieData: {}, apiStatus: apiStatusConstants.initial}

  constructor() {
    makeObservable(this)
  }

  @action timeInHrs = (time: number) => {
    const hrs = Math.floor(time / 60)
    const mins = time - hrs * 60
    return `${hrs}h ${mins}m`
  }

  @action getMovieData = async (id: number) => {
    this.state = {...this.state, apiStatus: apiStatusConstants.inProgress}

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US`,
    )
    const data = await response.json()

    const moreResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US`,
    )
    const moreData = await moreResponse.json()

    const updatedData: movieDataType = {
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

    this.state = {movieData: updatedData, apiStatus: apiStatusConstants.success}
  }
}

export default new MovieStore()
