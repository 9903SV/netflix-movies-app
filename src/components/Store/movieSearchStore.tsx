import {makeAutoObservable} from 'mobx'

class MovieSearchStore {
  state = {
    searchMoviesList: [],
    isLoading: true,
    inputText: '',
    pageNumber: 1,
  }

  constructor() {
    makeAutoObservable(this)
  }

  getSearchMovies = async (input: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US&page=${this.state.pageNumber}&query=${input}`,
    )
    const data = await response.json()

    this.state = {
      searchMoviesList: data.results,
      isLoading: false,
      inputText: input,
      pageNumber: this.state.pageNumber,
    }
  }
}

export default new MovieSearchStore()
