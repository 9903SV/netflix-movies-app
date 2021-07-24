/* eslint-disable camelcase */
import {useState, useEffect} from 'react'
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MovieSlider = (props: {url: string; title: string}) => {
  const [state, setState] = useState({moviesData: []})
  const {url} = props

  const fetchMoviesData = async () => {
    const response = await fetch(url)
    const data = await response.json()

    setState({moviesData: data.results})
  }

  useEffect(() => {
    fetchMoviesData()
    /* eslint-disable-next-line */
  }, [])

  const renderSlider = () => {
    const {moviesData} = state

    return (
      <Slider {...settings}>
        {moviesData.map((movie: {id: string; poster_path: string}) => {
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

  const {moviesData} = state
  const {title} = props

  return (
    <div className="slick-app-container">
      <h1 className="slick-app-heading">{title}</h1>
      <div style={{width: '80%'}}>
        {moviesData.length ? (
          renderSlider()
        ) : (
          <Loader
            // style={{textAlign: 'center'}}
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

export default MovieSlider
