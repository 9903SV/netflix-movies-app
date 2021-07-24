import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BrowserRouter} from 'react-router-dom'
import Navbar from './index'

export default {
  title: 'Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = args => (
  <BrowserRouter>
    <Navbar {...args} />
  </BrowserRouter>
)

export const NavbarHomeRoute = Template.bind({})
NavbarHomeRoute.args = {
  linkText: 'Popular',
  hideLinkSearchProfile: false,
  backgroundColor: 'transparent',
  highlightHomeLink: true,
  highlightPopularLink: false,
}

export const NavbarAccountRoute = Template.bind({})
NavbarAccountRoute.args = {
  linkText: 'My List',
  hideLinkSearchProfile: false,
  backgroundColor: '#000000',
}

export const NavbarMovieRoute = Template.bind({})
NavbarMovieRoute.args = {
  linkText: 'Popular',
  hideLinkSearchProfile: false,
  backgroundColor: 'transparent',
}

export const NavbarMovieSearchRoute = Template.bind({})
NavbarMovieSearchRoute.args = {
  linkText: 'Popular',
  hideLinkSearchProfile: false,
  backgroundColor: 'transparent',
  highlightHomeLink: false,
  highlightPopularLink: true,
}

export const NavbarNoSearchRoute = Template.bind({})
NavbarNoSearchRoute.args = {
  linkText: 'Popular',
  hideLinkSearchProfile: false,
  backgroundColor: 'transparent',
  highlightHomeLink: false,
  highlightPopularLink: true,
}

export const NavbarNotFoundRoute = Template.bind({})
NavbarNotFoundRoute.args = {
  linkText: '',
  hideLinkSearchProfile: true,
  backgroundColor: '#000000',
}
