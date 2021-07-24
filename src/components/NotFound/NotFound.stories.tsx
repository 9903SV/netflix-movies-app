import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import NotFound from './index'

export default {
  title: 'NotFound',
  component: NotFound,
} as ComponentMeta<typeof NotFound>

const Template: ComponentStory<typeof NotFound> = () => (
  <BrowserRouter>
    <NotFound />
  </BrowserRouter>
)

export const NotFoundMain = Template.bind({})
