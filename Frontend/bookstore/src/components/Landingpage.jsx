import { useState } from 'react'
import Adminlogin from './Admin/Adminlogin'
import Userslogin from './Users/Userslogin'
import logo from '../assets/image/logo_library.png'

const Landingpage = () => {
    let [bool,setBool] = useState(true)
    
    let togglebtn = () =>{
        setBool(!bool)

    }



  return (
    <>
    <div className="main">
        <div className="logo"><img src={logo} alt="" /></div>
    <div className="container">
        
    <div className="btns-container" onClick={togglebtn}>
      <p className="p">Admin</p>
      <p className="p">Users</p>
      <button
        className={ bool ? "admin-login btn" : "users-login btn"}
        
      >
        {bool ? "Admin" : "Users"}
      </button>
    </div>
        
        {bool ? <p className='pp'>admin login</p> : <p className='pp'>users login</p>}
        <div className="form-container">
            
            {bool ? <Adminlogin /> : <Userslogin />}

        </div>
    </div>
    </div>

    </>
  )
}

export default Landingpage