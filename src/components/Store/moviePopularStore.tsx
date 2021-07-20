import {makeObservable, observable, action} from 'mobx'

export const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class MoviePopularStore {
  @observable state = {
    popularMovies: [],
    apiStatus: apiStatusConstants.initial,
    pageNumber: 1,
  }

  constructor() {
    makeObservable(this)
  }

  @action getPopularMovies = async () => {
    this.state = {
      ...this.state,
      apiStatus: apiStatusConstants.inProgress,
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US&page=${this.state.pageNumber}`,
    )
    const data = await response.json()

    this.state = {
      ...this.state,
      popularMovies: data.results,
      apiStatus: apiStatusConstants.success,
    }
  }
}

export default new MoviePopularStore()
