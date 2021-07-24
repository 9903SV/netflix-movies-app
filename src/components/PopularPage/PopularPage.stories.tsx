import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import PopularPage from './index'

export default {
  title: 'PopularPage',
  component: PopularPage,
} as ComponentMeta<typeof PopularPage>

const Template: ComponentStory<typeof PopularPage> = () => (
  <BrowserRouter>
    <PopularPage />
  </BrowserRouter>
)

export const PopularPageRoute = Template.bind({})
