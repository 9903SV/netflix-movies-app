import './App.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import SignInPage from './components/SignInPage'
import HomePage from './components/HomePage'
import MoviePage from './components/MoviePage'
import MovieSearchPage from './components/MovieSearchPage'
import PopularPage from './components/PopularPage'
import AccountPage from './components/AccountPage'
import NoMatchSearch from './components/NoMatchSearch'
import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin" component={SignInPage} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute path="/popular" component={PopularPage} />
      <ProtectedRoute path="/account" component={AccountPage} />
      <ProtectedRoute path="/movie/:id" component={MoviePage} />
      <ProtectedRoute path="/search/:input" component={MovieSearchPage} />
      <ProtectedRoute path="/nomatchsearch" component={NoMatchSearch} />
      <NotFound />
    </Switch>
  </BrowserRouter>
)

export default App
