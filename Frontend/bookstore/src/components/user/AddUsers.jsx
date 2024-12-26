import { useRef } from "react"


const AddUsers = () => {

  let userFormdata = useRef()

  let handleAddusers = (e) =>{
    e.preventDefault()
    // console.log(userFormdata)
    
    let newUser = {
      // id: userFormdata.current[0].value,
      fname: userFormdata.current[1].value,
      lname: userFormdata.current[2].value,
      contact: userFormdata.current[3].value,
      email: userFormdata.current[4].value,
      password: userFormdata.current[5].value,
      dob: userFormdata.current[6].value,
      place: userFormdata.current[7].value,
  };
  
  
    
  
  fetch(`https://rahul123raj.github.io/library-management-Json-data/data.json/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser)
})
  }

  

  return (
    <>
    <div className="adduser">
      <form action="" ref={userFormdata} onSubmit={handleAddusers}>
        <input type="text" placeholder="id" />
        <input type="text" placeholder="fname" />
        <input type="text" placeholder="lname" />
        <input type="number" placeholder="contact" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="date" name="" id="dob" />
        <input type="text" placeholder="place" />
        <button type="submit">submit</button>
      </form>
    </div>
    </>
  )
}

export default AddUsers