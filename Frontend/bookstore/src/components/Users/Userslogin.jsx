import { useRef } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { USER_API } from "../../utils/constant";

const Userslogin = () => {
  let emailField = useRef();
  let passField = useRef();

  let navigate = useNavigate();

  let handlesubmit = async (e) => {
    e.preventDefault();

    let email = emailField.current.value;
    let inputpass = passField.current.value;

    try {
      // Fetch the user data from the server
      let resp = await fetch(`${USER_API}/${email}`);

      // Check if the response is not successful
      if (!resp.ok) {
        alert("Failed to fetch user data. Please check the email or try again later.");
        return;
      }

      let data = await resp.json();

      // Check if payload is empty or undefined
      if (!data.payload || data.payload.length === 0) {
        alert("No user found with this email.");
        return;
      }

      let user = data.payload[0];

      // Check if email matches
      if (email !== user.email) {
        alert("Email not found.");
        return;
      }

      // Check if password matches
      if (inputpass === user.password) {
        navigate("/usersportal");
      } else {
        alert("Incorrect password.");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="form">
        <form action="" onSubmit={handlesubmit}>
          <input ref={emailField} type="email" placeholder="Enter user's email" required />
          <input ref={passField} type="text" placeholder="Enter user's password" required />
          <button type="submit">Users Login</button>
          <NavLink to="/create_account" >Create Account ? </NavLink>
        </form>
      </div>
    </>
  );
};

export default Userslogin;
