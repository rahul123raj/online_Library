import { useRef, useState } from "react"
import '../../assets/style/createaccount.css'
import logo from '../../assets/image/logo_library.png'
import Loading from "../Loading"
import { useNavigate } from "react-router-dom"

const CreateAccount = () => {

  let [loading,setloading] = useState(false)

  let navigate = useNavigate()

  let userFormdata = useRef()

  let handleAddusers = async (e) =>{
    e.preventDefault()
    // console.log(userFormdata)
    
    let newUser = {
      fullname: userFormdata.current[0].value,
      email: userFormdata.current[1].value,
      password: userFormdata.current[2].value,
      mobno: userFormdata.current[3].value,
      dob: userFormdata.current[4].value,
      address: userFormdata.current[5].value,
  };

  setloading(true)
  
  // console.log(userFormdata.current[3].value)
  // console.log(newUser)
  

try {
  const response = await fetch("http://localhost:5000/bookdata/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  const result = await response.json();
  if (response.ok) {
    alert("Registration successful!");
    // Navigate to the next page here
    // window.location.href = "/welcome";
      navigate('/')
  } else {
    alert("Error: " + result.message);
  }
} catch (error) {
  alert("An error occurred: " + error.message);
} finally {
  setloading(false); // Hide loading indicator
}
};
  

  

  return (
    <>
    {/* <div className="adduser-main"></div> */}
    <div className="adduser">
      <img src={logo} alt="" />
      <div className="create">
  <h1>Create Account</h1>
  <form action="" ref={userFormdata} onSubmit={handleAddusers}>
    <div className="form-group">
      <label htmlFor="fullName">Full Name</label>
      <input type="text" id="fullName" placeholder="Full Name" required />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" placeholder="Email" required />
    </div>

    <div className="form-group">
      <label htmlFor="password">Create Password</label>
      <input type="password" id="password" placeholder="Create Password" required />
    </div>

    <div className="form-group">
      <label htmlFor="mobileNumber">Mobile Number</label>
      <input type="text" id="mobileNumber" placeholder="Mobile Number" required />
    </div>

    <div className="form-group">
      <label htmlFor="dob">Date of Birth</label>
      <input type="date" id="dob" required />
    </div>

    <div className="form-group">
      <label htmlFor="address">Address</label>
      <input type="text" id="address" placeholder="Address" required />
    </div>
    
    <button type="submit">{loading ? <Loading /> : "Submit"}</button>
  </form>
  </div>
</div>

    </>
  )
}

export default CreateAccount;