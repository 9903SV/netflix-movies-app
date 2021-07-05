import {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

class MovieSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {moviesData: []}
  }

  componentDidMount() {
    this.fetchMoviesData()
  }

  fetchMoviesData = () => {
    const {url} = this.props
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({moviesData: response.results})
      })
  }

  renderSlider = () => {
    const {moviesData} = this.state

    return (
      <Slider {...settings}>
        {moviesData.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          return (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="react-slick-item">
                <img
                  className="poster"
                  src={movieImage}
                  width="100%"
                  height="100%"
                  alt={`pic_${movie.id}`}
                />
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {moviesData} = this.state
    const {title} = this.props

    return (
      <div className="slick-app-container">
        <h1 className="slick-app-heading">{title}</h1>
        <div style={{width: '80%'}}>
          {moviesData.length ? (
            this.renderSlider()
          ) : (
            <Loader
              style={{textAlign: 'center'}}
              type="TailSpin"
              color="red"
              height={50}
              width={50}
            />
          )}

          <Slider {...settings} />
        </div>
      </div>
    )
  }
}

export default MovieSlider
