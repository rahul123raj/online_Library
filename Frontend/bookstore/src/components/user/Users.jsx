import axios from "axios";
import { useEffect, useState } from "react";
import '../../assets/style/users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newuser, setNewUser] = useState([])
  const path = location.pathname;
  const bool = path.startsWith('/adminportal');

  useEffect(() => {
    axios.get('http://localhost:5000/bookdata/user')
      .then((resp) => {
        setUsers(resp.data.payload); // Assuming payload is an array
        console.log(resp.data.payload);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [newuser]);

  const handleDelete = (id) => {
    

    fetch(`http://localhost:5000/bookdata/user/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          alert("Item deleted successfully");
          // Update the state to remove the deleted item from the UI
          setNewUser(users.filter((id) => id !== id));
        } else {
          alert("Failed to delete the item");
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <>
    <div className="user-table"></div>
    <div className="users-data">
      <table>
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Mobile No.</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th>DOB</th>
            <th>Age</th>
            <th>Address</th>
            {bool && <th>Action</th>}
            
          </tr>
        </thead>
        <tbody>
          {users.map((elem, index) => {
            const { _id,fullname, mobno, email, dob, address } = elem;

            const calculateAge = () => {
              const dateobj = new Date();
              return dateobj.getFullYear() - Number(dob.slice(0, 4));
            };

            const age = calculateAge();

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{fullname}</td>
                <td>{mobno}</td>
                <td>{email}</td>
                {/* <td>{password}</td> */}
                <td>{dob}</td>
                <td>{age}</td>
                <td>{address}</td>
                {bool && <td>
                  <button onClick={() => handleDelete(_id)}>Delete</button>
                </td>}
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>

  );
};

export default Users;
