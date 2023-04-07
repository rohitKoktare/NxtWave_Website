import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const a = null
  const jwtToken = Cookies.get('jwtToken')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />
}

export default ProtectedRoute
