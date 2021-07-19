import {makeAutoObservable} from 'mobx'

class MovieSliderStore {
  state: {moviesData: []} = {moviesData: []}

  constructor() {
    makeAutoObservable(this)
  }

  fetchMoviesData = (url: string) => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.state.moviesData = response.results
      })
  }
}

export default new MovieSliderStore()
