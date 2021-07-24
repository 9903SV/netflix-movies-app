import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import AccountPage from './index'

export default {
  title: 'AccountPage',
  component: AccountPage,
} as ComponentMeta<typeof AccountPage>

const Template: ComponentStory<typeof AccountPage> = args => (
  <BrowserRouter>
    <AccountPage {...args} />
  </BrowserRouter>
)

export const AccountPageMain = Template.bind({})
