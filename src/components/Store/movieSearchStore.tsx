import {makeAutoObservable} from 'mobx'
import {apiStatusConstants} from './moviePopularStore'

class MovieSearchStore {
  state = {
    searchMoviesList: [],
    apiStatus: apiStatusConstants.initial,
    inputText: '',
    pageNumber: 1,
  }

  constructor() {
    makeAutoObservable(this)
  }

  getSearchMovies = async (input: string) => {
    this.state = {
      ...this.state,
      apiStatus: apiStatusConstants.inProgress,
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US&page=${this.state.pageNumber}&query=${input}`,
    )
    const data = await response.json()

    this.state = {
      searchMoviesList: data.results,
      apiStatus: apiStatusConstants.success,
      inputText: input,
      pageNumber: this.state.pageNumber,
    }
  }
}

export default new MovieSearchStore()
