import { NavLink } from 'react-router-dom'
import '../assets/style/logout.css'

const Logout = () => {
  return (
    <>
    <div className="logout">
        <NavLink to='/'>sign-out</NavLink>
    </div>
    </>
  )
}

export default Logout