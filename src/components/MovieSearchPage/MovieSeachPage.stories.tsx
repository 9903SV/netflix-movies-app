import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import MovieSearchPage from './index'

export default {
  title: 'MovieSearchPage',
  component: MovieSearchPage,
} as ComponentMeta<typeof MovieSearchPage>

const Template: ComponentStory<typeof MovieSearchPage> = args => (
  <BrowserRouter>
    <MovieSearchPage {...args} />
  </BrowserRouter>
)

export const MoviePageRoute = Template.bind({})
MoviePageRoute.args = {
  match: {params: {input: 'the'}},
}
