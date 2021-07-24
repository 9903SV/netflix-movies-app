import {ComponentStory, ComponentMeta} from '@storybook/react'
import PaginationButton from './index'

export default {
  title: 'PaginationButton',
  component: PaginationButton,
} as ComponentMeta<typeof PaginationButton>

const Template: ComponentStory<typeof PaginationButton> = args => (
  <PaginationButton {...args} />
)

export const PaginationButtonMain = Template.bind({})
PaginationButtonMain.args = {
  pageNumber: 1,
}
