import {ComponentStory, ComponentMeta} from '@storybook/react'
import InputComponent from './index'

export default {
  title: 'InputComponent',
  component: InputComponent,
} as ComponentMeta<typeof InputComponent>

const Template: ComponentStory<typeof InputComponent> = args => (
  <InputComponent {...args} />
)

export const InputComponentUsername = Template.bind({})
InputComponentUsername.args = {
  labelText: 'USERNAME',
  showErrorMsg: false,
}

export const InputComponentPassword = Template.bind({})
InputComponentPassword.args = {
  labelText: 'PASSWORD',
  showErrorMsg: false,
}

export const InputComponentUsernameWithErrorMsg = Template.bind({})
InputComponentUsernameWithErrorMsg.args = {
  labelText: 'USERNAME',
  showErrorMsg: true,
}

export const InputComponentPasswordWithErrorMsg = Template.bind({})
InputComponentPasswordWithErrorMsg.args = {
  labelText: 'PASSWORD',
  showErrorMsg: true,
}
