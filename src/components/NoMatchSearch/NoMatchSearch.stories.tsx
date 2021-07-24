import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import NoMatchSearch from './index'

export default {
  title: 'NoMatchSearch',
  component: NoMatchSearch,
} as ComponentMeta<typeof NoMatchSearch>

const Template: ComponentStory<typeof NoMatchSearch> = args => (
  <BrowserRouter>
    <NoMatchSearch {...args} />
  </BrowserRouter>
)

export const NoMatchSearchMain = Template.bind({})
NoMatchSearchMain.args = {
  inputText: 'search text',
}
