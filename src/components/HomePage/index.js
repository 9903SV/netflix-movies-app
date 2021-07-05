import {Component} from 'react'
import Navbar from '../Navbar'
import MovieSlider from '../MovieSlider'
import Footer from '../Footer'
import './index.css'

const sliderData = [
  {
    id: 0,
    title: 'Trending',
    url:
      'https://api.themoviedb.org/3/trending/all/week?api_key=1b2d30ef98a7d05a52a075002d77b253',
  },
  {
    id: 1,
    title: 'Top Rated',
    url:
      'https://api.themoviedb.org/3/movie/top_rated?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US',
  },
  {
    id: 2,
    title: 'Originals',
    url:
      'https://api.themoviedb.org/3/discover/tv?api_key=1b2d30ef98a7d05a52a075002d77b253',
  },
]

class HomePage extends Component {
  render() {
    const hideNavbarLinkElement = false
    const highlightHomeLink = true
    const highlightPopularLink = false
    return (
      <div>
        <div className="home-top-container">
          <Navbar
            linkText="Popular"
            hideLinkSearchProfile={hideNavbarLinkElement}
            backgroundColor="transparent"
            highlightHomeLink={highlightHomeLink}
            highlightPopularLink={highlightPopularLink}
          />
          <div className="home-top-container-content">
            <h1 className="home-top-container-heading">Super Man</h1>
            <p className="home-top-container-description">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics
            </p>
            <button className="home-top-container-button" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="home-bottom-container">
          <div>
            {sliderData.map(eachSlider => (
              <MovieSlider
                url={eachSlider.url}
                title={eachSlider.title}
                key={eachSlider.id}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default HomePage
