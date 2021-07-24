import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import SigninPage from './index'

export default {
  title: 'SigninPage',
  component: SigninPage,
} as ComponentMeta<typeof SigninPage>

const Template: ComponentStory<typeof SigninPage> = args => (
  <BrowserRouter>
    <SigninPage {...args} />
  </BrowserRouter>
)

export const MoviePageRoute = Template.bind({})
