import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ProtectedRoute = (props: any) => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/signin" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
