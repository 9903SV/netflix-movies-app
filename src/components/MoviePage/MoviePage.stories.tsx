import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import MoviePage from './index'

export default {
  title: 'MoviePage',
  component: MoviePage,
} as ComponentMeta<typeof MoviePage>

const Template: ComponentStory<typeof MoviePage> = args => (
  <BrowserRouter>
    <MoviePage {...args} />
  </BrowserRouter>
)

export const MoviePageRoute = Template.bind({})
MoviePageRoute.args = {
  match: {params: {id: 768}},
}
