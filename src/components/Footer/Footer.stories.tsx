import {ComponentStory, ComponentMeta} from '@storybook/react'
import Footer from './index'

export default {
  title: 'Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = () => <Footer />

export const FooterMain = Template.bind({})
