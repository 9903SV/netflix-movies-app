import {makeAutoObservable} from 'mobx'

class MoviePopularStore {
  state = {
    popularMovies: [],
    isLoading: true,
    pageNumber: 1,
  }

  constructor() {
    makeAutoObservable(this)
  }

  getPopularMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US&page=${this.state.pageNumber}`,
    )
    const data = await response.json()

    this.state = {
      ...this.state,
      popularMovies: data.results,
      isLoading: false,
    }
  }
}

export default new MoviePopularStore()
