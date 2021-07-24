import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import HomePage from './index'

export default {
  title: 'HomePage',
  component: HomePage,
} as ComponentMeta<typeof HomePage>

const Template: ComponentStory<typeof HomePage> = () => (
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
)

export const HomePageRoute = Template.bind({})
