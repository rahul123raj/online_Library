import  { useRef } from 'react'
import { useNavigate } from 'react-router'

const Adminlogin = () => {
  let navigate = useNavigate()
  let mail = useRef()
  let pass = useRef()

  let validation = (e) =>{

    let credentials = {
      email : "admin123@gmail.com",
      password : "admin123"
    }

    let {email,password} = credentials
    let err = `2px solid red`
    if(mail.current.value === email && pass.current.value === password){
     navigate('/adminportal')
    }else{
      e.preventDefault()
      mail.current.style.border = err
      pass.current.style.border = err
    }
  }
  
  return (
    <>
    <div className="form">
                <form action="" onSubmit={validation}>
                    <input type="text" placeholder='enter admin email' ref={mail}/>
                    <input type="text" placeholder='enter  admin password' ref={pass}/>
                    <button>admin login</button>
                </form>
            </div>
    </>
  )
}

export default Adminlogin