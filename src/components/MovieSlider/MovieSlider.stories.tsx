import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import MovieSlider from './index'

export default {
  title: 'MovieSlider',
  component: MovieSlider,
} as ComponentMeta<typeof MovieSlider>

const Template: ComponentStory<typeof MovieSlider> = args => (
  <BrowserRouter>
    <MovieSlider {...args} />
  </BrowserRouter>
)

export const MovieSliderTrending = Template.bind({})
MovieSliderTrending.args = {
  title: 'Trending',
  url:
    'https://api.themoviedb.org/3/trending/all/week?api_key=1b2d30ef98a7d05a52a075002d77b253',
}

export const MovieSliderTopRated = Template.bind({})
MovieSliderTopRated.args = {
  title: 'Top Rated',
  url:
    'https://api.themoviedb.org/3/movie/top_rated?api_key=1b2d30ef98a7d05a52a075002d77b253&language=en-US',
}

export const MovieSliderOriginals = Template.bind({})
MovieSliderOriginals.args = {
  title: 'Originals',
  url:
    'https://api.themoviedb.org/3/discover/tv?api_key=1b2d30ef98a7d05a52a075002d77b253',
}
