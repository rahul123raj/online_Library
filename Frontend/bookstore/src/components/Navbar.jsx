
import '../assets/style/navbar.css'
import { NavLink, useLocation } from 'react-router-dom'
import logo_library from '../assets/image/logo_library.png'
import Logout from './Logout'
import { useState } from 'react'

const Navbar = () => {
  let location = useLocation()
  let path = location.pathname
  let bool = path.startsWith('/adminportal')

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
    <div className="navbar">
        <div className="logo"><img src={logo_library} alt="" /></div>
        <div className="links">
          {
                      bool 
                      ? 
                      <ul>
                        <li><NavLink to="/adminportal/">home</NavLink></li>
                        <li><NavLink to="/adminportal/books">books</NavLink></li>
                        <li><NavLink to="/adminportal/addbooks">add books</NavLink></li>
                        <li><NavLink to="/adminportal/users">users</NavLink></li>
                        <li><NavLink to="/adminportal/contacts">contact</NavLink></li>
                        
                        <li id='logout' onMouseEnter={() => setShowDropdown(true)} 
                            onMouseLeave={() => setShowDropdown(false)}
                          >logout
                          {
                            showDropdown && (
                              <div className="dropdown">
                                <Logout />
                              </div>
                            )
                          }
                          </li>
                    </ul>
                    
                      :
            
                      <ul>
                      <li><NavLink to="/usersportal/">home</NavLink></li>
                      <li><NavLink to="/usersportal/books">books</NavLink></li>
                      <li><NavLink to="/usersportal/users">users</NavLink></li>
                      <li><NavLink to="/usersportal/contacts">contact</NavLink></li>
                      <li id='logout' onMouseEnter={() => setShowDropdown(true)} 
                            onMouseLeave={() => setShowDropdown(false)}
                          >logout
                          {
                            showDropdown && (
                              <div className="dropdown">
                                <Logout />
                              </div>
                            )
                          }
                          </li>
                      </ul>
          }
        
        </div>
    </div>
    </>
  )
}

export default Navbar